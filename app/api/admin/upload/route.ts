import { NextRequest, NextResponse } from 'next/server';
import { writeFile, mkdir } from 'fs/promises';
import path from 'path';

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD ?? '';

export async function POST(req: NextRequest) {
  if (req.headers.get('x-admin-password') !== ADMIN_PASSWORD) {
    return NextResponse.json({ error: '인증 실패' }, { status: 401 });
  }

  const formData = await req.formData();
  const file = formData.get('file') as File | null;
  const folder = ((formData.get('folder') as string) || '')
    .replace(/[^a-z0-9-]/g, '')
    .replace(/-+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 60) || 'misc';

  if (!file || file.size === 0) {
    return NextResponse.json({ error: '파일 없음' }, { status: 400 });
  }

  if (file.size > 10 * 1024 * 1024) {
    return NextResponse.json({ error: '파일 크기는 10MB 이하만 가능합니다' }, { status: 400 });
  }

  const ext = path.extname(file.name).toLowerCase() || '.jpg';
  const allowed = ['.jpg', '.jpeg', '.png', '.webp', '.gif'];
  if (!allowed.includes(ext)) {
    return NextResponse.json({ error: '지원하지 않는 형식 (jpg, png, webp, gif)' }, { status: 400 });
  }

  const filename = `${Date.now()}${ext}`;
  const dir = path.join(process.cwd(), 'public', 'portfolio', folder);
  await mkdir(dir, { recursive: true });
  await writeFile(path.join(dir, filename), Buffer.from(await file.arrayBuffer()));

  return NextResponse.json({ path: `/portfolio/${folder}/${filename}` });
}
