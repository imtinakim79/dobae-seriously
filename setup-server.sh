#!/bin/bash
# ============================================================
#  이반장 도배 서버 세팅 스크립트
#  DigitalOcean Ubuntu 서버용
# ============================================================
set -e

echo "======================================"
echo "  1/6 시스템 업데이트"
echo "======================================"
apt update -y && apt upgrade -y

echo "======================================"
echo "  2/6 Node.js 20 설치"
echo "======================================"
curl -fsSL https://deb.nodesource.com/setup_20.x | bash -
apt install -y nodejs
node -v && npm -v

echo "======================================"
echo "  3/6 PM2 + Nginx 설치"
echo "======================================"
npm install -g pm2
apt install -y nginx
systemctl enable nginx
systemctl start nginx

echo "======================================"
echo "  4/6 GitHub에서 코드 클론"
echo "======================================"
mkdir -p /var/www
cd /var/www
rm -rf dobae-seriously
git clone https://github.com/imtinakim79/dobae-seriously.git dobae-seriously
cd dobae-seriously

echo "--- npm install ---"
npm install

echo "--- npm build ---"
npm run build

echo "======================================"
echo "  5/6 PM2로 앱 실행 (포트 3000)"
echo "======================================"
pm2 delete dobae 2>/dev/null || true
pm2 start "npm start" --name dobae
pm2 save
pm2 startup systemd -u root --hp /root | tail -1 | bash

echo "======================================"
echo "  6/6 Nginx 설정"
echo "======================================"
cat > /etc/nginx/sites-available/dobae << 'NGINX'
server {
    listen 80 default_server;
    listen [::]:80 default_server;
    server_name _;

    # 업로드 이미지 최대 크기
    client_max_body_size 20M;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_cache_bypass $http_upgrade;
    }
}
NGINX

# 기존 default 제거하고 새 설정 활성화
rm -f /etc/nginx/sites-enabled/default
ln -sf /etc/nginx/sites-available/dobae /etc/nginx/sites-enabled/dobae
nginx -t && systemctl reload nginx

echo ""
echo "======================================"
echo "  배포 키 생성 (GitHub Actions용)"
echo "======================================"
ssh-keygen -t ed25519 -C "github-deploy" -f /root/.ssh/github_deploy -N ""
echo ""
echo ">>> 아래 공개키를 GitHub 저장소 Deploy Keys에 등록하세요:"
echo ">>> https://github.com/imtinakim79/dobae-seriously/settings/keys"
echo ""
cat /root/.ssh/github_deploy.pub
echo ""
echo ">>> 아래 개인키를 GitHub Secrets(VPS_SSH_KEY)에 등록하세요:"
echo ">>> https://github.com/imtinakim79/dobae-seriously/settings/secrets/actions"
echo ""
cat /root/.ssh/github_deploy

echo ""
echo "======================================"
echo "  완료! 접속 주소: http://165.245.183.9"
echo "======================================"
pm2 status
