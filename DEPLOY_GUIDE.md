# 새 프로젝트 GitHub 연결 + 자동 배포 설정 가이드

## 전제 조건
- DigitalOcean 서버: `165.245.183.9` (root)
- Node.js, PM2, Nginx 이미 설치됨
- 서버 비밀번호: GitHub Secrets에 `VPS_PASSWORD`로 등록

---

## 1단계: 로컬 프로젝트를 GitHub에 올리기

```powershell
cd C:\your-project-folder

git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/imtinakim79/[저장소명].git
git push -u origin main
```

> GitHub에서 먼저 빈 저장소를 만들어야 합니다.
> https://github.com/new

---

## 2단계: GitHub Actions 자동 배포 파일 추가

프로젝트 루트에 `.github/workflows/deploy.yml` 파일 생성:

```yaml
name: Deploy to DigitalOcean

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - name: 서버에 SSH 접속 후 배포
        uses: appleboy/ssh-action@v1.0.3
        with:
          host: 165.245.183.9
          username: root
          password: ${{ secrets.VPS_PASSWORD }}
          script: |
            cd /var/www/[프로젝트폴더명]
            git pull origin main
            npm install
            npm run build
            pm2 restart [pm2앱이름]
            echo "✅ 배포 완료: $(date)"
```

`[프로젝트폴더명]`과 `[pm2앱이름]`은 프로젝트에 맞게 변경하세요.

---

## 3단계: GitHub Secret 등록

1. `https://github.com/imtinakim79/[저장소명]/settings/secrets/actions` 접속
2. **New repository secret** 클릭
3. Name: `VPS_PASSWORD`
4. Value: 서버 root 비밀번호
5. **Add secret** 클릭

---

## 4단계: 서버에 프로젝트 세팅

DigitalOcean 콘솔 또는 SSH로 서버 접속 후:

```bash
# 코드 클론
cd /var/www
git clone https://github.com/imtinakim79/[저장소명].git [프로젝트폴더명]
cd [프로젝트폴더명]

# 의존성 설치 및 빌드
npm install
npm run build

# PM2로 실행
pm2 start "npm start" --name [pm2앱이름]
pm2 save
```

---

## 5단계: Nginx 설정 (새 도메인/포트)

새 프로젝트는 다른 포트를 사용해야 합니다 (예: 3001, 3002...).

`package.json`의 start 스크립트에 포트 지정:
```json
"start": "next start -p 3001"
```

Nginx 설정 파일 추가:
```bash
cat > /etc/nginx/sites-available/[사이트명] << 'NGINX'
server {
    listen 80;
    server_name [도메인명 또는 서브도메인];

    client_max_body_size 20M;

    location / {
        proxy_pass http://localhost:3001;
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

ln -sf /etc/nginx/sites-available/[사이트명] /etc/nginx/sites-enabled/[사이트명]
nginx -t && systemctl reload nginx
```

---

## 현재 운영 중인 프로젝트

| 프로젝트 | 폴더 | PM2 이름 | 포트 | URL |
|---------|------|---------|------|-----|
| 이반장 도배 | `/var/www/dobae-seriously` | `dobae` | 3000 | http://165.245.183.9 |

---

## 로컬 수정 → GitHub → 서버 자동 배포 흐름

로컬에서 파일을 수정해도 자동으로 GitHub에 반영되지 않습니다. 직접 push해야 합니다.

### VS Code에서 push하기
1. 왼쪽 **Source Control** 아이콘 클릭
2. 변경된 파일 목록 확인
3. 커밋 메시지 입력 후 **Commit** 클릭
4. **Sync** (또는 Push) 클릭

### 터미널(PowerShell)에서 push하기
```powershell
git add .
git commit -m "수정 내용 설명"
git push
```

> push하면 GitHub Actions가 자동으로 서버에 배포합니다. (약 1~2분 소요)
> 배포 현황: https://github.com/imtinakim79/dobae-seriously/actions

---

## 자주 쓰는 서버 명령어

```bash
pm2 status              # 실행 중인 앱 목록
pm2 logs [앱이름]        # 로그 확인
pm2 restart [앱이름]     # 재시작
pm2 stop [앱이름]        # 중지
nginx -t                # Nginx 설정 문법 확인
systemctl reload nginx  # Nginx 재시작
```
