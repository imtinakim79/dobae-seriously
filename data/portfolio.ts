export interface PortfolioImage {
  src: string;
  /** 형식: [지역] [아파트명] [공간] 도배 [전/후] — [벽지 종류 및 특징] */
  alt: string;
  before: boolean;
}

export interface Portfolio {
  id: string;
  region: string;       // 시공 지역 (예: "강남구")
  apartment: string;    // 아파트·건물명
  roomType: string;     // 공간 유형 (예: "전체", "거실·주방", "안방")
  wallpaperType: string;// 벽지 종류
  date: string;         // YYYY-MM
  tags: string[];
  description: string;
  images: PortfolioImage[];
}

export function generatePortfolioTitle(p: Portfolio): string {
  return `${p.region} ${p.apartment} 도배`;
}

export function generatePortfolioDescription(p: Portfolio): string {
  return `${p.region} ${p.apartment} ${p.roomType} 도배 시공 전문. ${p.wallpaperType} 사용, 합리적인 가격과 깔끔한 마무리로 만족을 드립니다.`;
}
