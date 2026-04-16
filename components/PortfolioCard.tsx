import Image from 'next/image';
import Link from 'next/link';
import { Portfolio, generatePortfolioTitle } from '@/data/portfolio';

interface Props {
  portfolio: Portfolio;
}

export default function PortfolioCard({ portfolio }: Props) {
  const mainImage = portfolio.images.find((img) => !img.before) ?? portfolio.images[0];
  const title = generatePortfolioTitle(portfolio);

  return (
    <Link href={`/portfolio/${portfolio.id}`} className="card group block">
      <div className="relative aspect-[4/3] overflow-hidden">
        <Image
          src={mainImage.src}
          alt={mainImage.alt}
          fill
          unoptimized
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        <div className="absolute bottom-3 left-3 flex gap-1 flex-wrap">
          {portfolio.tags.slice(0, 2).map((tag) => (
            <span
              key={tag}
              className="bg-brand-600/90 text-white text-xs px-2 py-0.5 rounded-full font-medium"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
      <div className="p-4">
        <h3 className="font-bold text-gray-900 text-base mb-1 group-hover:text-brand-700 transition-colors">
          {title}
        </h3>
        <p className="text-sm text-gray-500 mb-2">
          {portfolio.roomType} · {portfolio.wallpaperType}
        </p>
        <p className="text-xs text-gray-400 line-clamp-2">{portfolio.description}</p>
        <div className="mt-3 flex items-center justify-between">
          <span className="text-xs text-gray-400">{portfolio.date}</span>
          <span className="text-xs text-brand-600 font-medium group-hover:underline">자세히 보기 →</span>
        </div>
      </div>
    </Link>
  );
}
