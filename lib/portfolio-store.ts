import fs from 'fs';
import path from 'path';
import type { Portfolio } from '@/data/portfolio';

const DATA_PATH = path.join(process.cwd(), 'data', 'portfolio.json');

export function getPortfolios(): Portfolio[] {
  try {
    if (!fs.existsSync(DATA_PATH)) {
      fs.writeFileSync(DATA_PATH, '[]', 'utf-8');
      return [];
    }
    const raw = fs.readFileSync(DATA_PATH, 'utf-8');
    return JSON.parse(raw) as Portfolio[];
  } catch {
    return [];
  }
}

export function savePortfolios(portfolios: Portfolio[]): void {
  fs.writeFileSync(DATA_PATH, JSON.stringify(portfolios, null, 2), 'utf-8');
}
