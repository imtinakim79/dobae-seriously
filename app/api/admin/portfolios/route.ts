import { NextRequest, NextResponse } from 'next/server';
import { getPortfolios, savePortfolios } from '@/lib/portfolio-store';
import type { Portfolio } from '@/data/portfolio';

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD ?? '';

function checkAuth(req: NextRequest): boolean {
  return req.headers.get('x-admin-password') === ADMIN_PASSWORD;
}

export async function GET(req: NextRequest) {
  if (!checkAuth(req)) {
    return NextResponse.json({ error: '인증 실패' }, { status: 401 });
  }
  return NextResponse.json(getPortfolios());
}

export async function POST(req: NextRequest) {
  if (!checkAuth(req)) {
    return NextResponse.json({ error: '인증 실패' }, { status: 401 });
  }

  const body = (await req.json()) as Portfolio;
  if (!body.id || !body.region || !body.apartment) {
    return NextResponse.json({ error: '필수 항목 누락' }, { status: 400 });
  }

  const portfolios = getPortfolios();
  if (portfolios.some((p) => p.id === body.id)) {
    return NextResponse.json({ error: '이미 존재하는 ID입니다' }, { status: 409 });
  }

  portfolios.unshift(body);
  savePortfolios(portfolios);
  return NextResponse.json(body, { status: 201 });
}
