import type { Metadata } from 'next';
import { Portfolio, generatePortfolioTitle, generatePortfolioDescription } from '@/data/portfolio';

const BASE_URL = 'https://dobae-seriously.com';

export function generatePortfolioMetadata(portfolio: Portfolio): Metadata {
  const title = generatePortfolioTitle(portfolio);
  const description = generatePortfolioDescription(portfolio);
  const mainImage = portfolio.images.find((img) => !img.before) ?? portfolio.images[0];

  return {
    title,
    description,
    alternates: { canonical: `${BASE_URL}/portfolio/${portfolio.id}` },
    openGraph: {
      title: `${title} | 이반장 도배`,
      description,
      url: `${BASE_URL}/portfolio/${portfolio.id}`,
      images: mainImage
        ? [{ url: mainImage.src, width: 1200, height: 800, alt: mainImage.alt }]
        : [],
    },
  };
}
