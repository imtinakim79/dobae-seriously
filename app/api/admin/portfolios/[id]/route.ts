import { NextRequest, NextResponse } from 'next/server';
import { getPortfolios, savePortfolios } from '@/lib/portfolio-store';
import type { Portfolio } from '@/data/portfolio';

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD ?? 'dobae1234';

function checkAuth(req: NextRequest): boolean {
  return req.headers.get('x-admin-password') === ADMIN_PASSWORD;
}

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  if (!checkAuth(req)) {
    return NextResponse.json({ error: '인증 실패' }, { status: 401 });
  }

  const body = (await req.json()) as Portfolio;
  const portfolios = getPortfolios();
  const idx = portfolios.findIndex((p) => p.id === params.id);
  if (idx === -1) {
    return NextResponse.json({ error: '없는 포트폴리오' }, { status: 404 });
  }

  portfolios[idx] = { ...body, id: params.id };
  savePortfolios(portfolios);
  return NextResponse.json(portfolios[idx]);
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  if (!checkAuth(req)) {
    return NextResponse.json({ error: '인증 실패' }, { status: 401 });
  }

  const portfolios = getPortfolios();
  const filtered = portfolios.filter((p) => p.id !== params.id);
  if (filtered.length === portfolios.length) {
    return NextResponse.json({ error: '없는 포트폴리오' }, { status: 404 });
  }

  savePortfolios(filtered);
  return NextResponse.json({ ok: true });
}
