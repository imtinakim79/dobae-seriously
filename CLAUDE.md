# 이반장 도배 홈페이지 — Claude 개발 규칙

## 프로젝트 개요
- **업체명**: 이반장 도배
- **블로그**: https://blog.naver.com/dobae_seriously
- **업종**: 도배 시공 전문
- **기술 스택**: Next.js 14 (App Router) + TypeScript + Tailwind CSS

---

## SEO 자동화 규칙

### 1. 포트폴리오 페이지 제목 태그
- **모든 시공 포트폴리오 페이지**는 반드시 아래 형식으로 `title` 메타태그를 생성할 것.
  ```
  [시공 지역] [아파트명] 도배 | 이반장 도배
  예) 강남구 래미안대치팰리스 도배 | 이반장 도배
  ```
- `generateMetadata()` 함수를 사용하여 서버 사이드에서 동적 생성.
- `description`은 `[지역] [아파트명] 도배 시공 전문. 합리적인 가격과 깔끔한 마무리로 만족을 드립니다.` 형식으로.

### 2. 이미지 alt 태그
- 이미지를 추가할 때 `alt` 속성에 반드시 시공 현장 상세 설명을 기술적으로 요약하여 넣을 것.
  ```
  형식: [지역] [아파트명] [방/공간 유형] 도배 시공 [전/후] — [벽지 종류 및 특징]
  예) 강남구 래미안대치팰리스 안방 도배 시공 후 — 실크벽지 아이보리 컬러 적용
  ```
- `next/image` 컴포넌트를 사용하고 `alt`를 절대 생략하지 말 것.

---

## 기술 스택 최적화 규칙

### Next.js App Router + Metadata API
- 모든 페이지는 `app/` 디렉토리 기반 App Router를 사용할 것.
- 정적 페이지는 `export const metadata: Metadata` 사용.
- 동적 페이지(포트폴리오 상세)는 `generateMetadata()` 함수 사용.
- `<head>` 태그를 직접 조작하지 말고 반드시 Metadata API를 통해서만 메타태그를 설정할 것.
- OG(Open Graph) 태그와 Twitter Card도 함께 설정할 것.

### next/image 최적화
- 모든 이미지는 `next/image`를 사용하여 WebP 자동 변환 적용.
- `quality={85}` 이상 유지하여 Lighthouse 성능 점수 90점 이상 확보.
- `sizes` prop을 반드시 지정하여 반응형 이미지 최적화.
- 외부 이미지 도메인은 `next.config.js`의 `images.domains`에 등록할 것.
- LCP(Largest Contentful Paint) 대상 이미지에는 `priority` prop 추가.

### 성능 목표
- Lighthouse Performance: 90+
- Lighthouse SEO: 100
- Lighthouse Accessibility: 90+
- Core Web Vitals 모두 "Good" 등급 유지

---

## 데이터 구조화 (Schema.org)

### LocalBusiness JSON-LD
- **모든 페이지** `layout.tsx`에 `LocalBusiness` 스키마를 JSON-LD 형식으로 삽입할 것.
- 포트폴리오 상세 페이지에는 추가로 `Service` 스키마도 삽입할 것.

```json
{
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "이반장 도배",
  "description": "서울·경기 도배 전문. 아파트, 빌라, 상업공간 도배 시공",
  "url": "https://dobae-seriously.com",
  "telephone": "010-5388-4628"
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "서울특별시",
    "addressCountry": "KR"
  },
  "areaServed": ["서울특별시", "경기도"],
  "priceRange": "$$",
  "openingHours": "Mo-Sa 08:00-19:00",
  "sameAs": ["https://blog.naver.com/dobae_seriously"]
}
```

---

## 콘텐츠 구조 규칙

### 포트폴리오 데이터 형식
```typescript
interface Portfolio {
  id: string;
  region: string;       // 시공 지역 (예: "강남구")
  apartment: string;    // 아파트명 (예: "래미안대치팰리스")
  roomType: string;     // 공간 유형 (예: "안방", "거실", "전체")
  wallpaperType: string;// 벽지 종류 (예: "실크벽지", "합지")
  date: string;         // 시공 일자 (예: "2024-03")
  images: {
    src: string;
    alt: string;        // [지역] [아파트명] [공간] 도배 [전/후] — [벽지 설명] 형식 준수
    before: boolean;
  }[];
  description: string;
}
```

### URL 구조
- 포트폴리오 목록: `/portfolio`
- 포트폴리오 상세: `/portfolio/[id]`
- 서비스 안내: `/services`
- 견적 문의: `/contact`
- 회사 소개: `/about`

---

## 파일 구조
```
app/
  layout.tsx          # Root layout — JSON-LD, 전역 메타
  page.tsx            # 홈 (히어로, 서비스, 포트폴리오 미리보기, CTA)
  portfolio/
    page.tsx          # 포트폴리오 목록
    [id]/
      page.tsx        # 포트폴리오 상세 (generateMetadata 동적 SEO)
  services/page.tsx
  contact/page.tsx
  about/page.tsx
components/
  Header.tsx
  Footer.tsx
  LocalBusinessSchema.tsx
  PortfolioCard.tsx
  ImageGallery.tsx
data/
  portfolio.ts        # 포트폴리오 데이터 (실제 시공 내용으로 교체)
  services.ts
lib/
  metadata.ts         # SEO 메타태그 생성 헬퍼
```

---

## 절대 하지 말 것
- `<img>` 태그 직접 사용 금지 → `next/image` 사용
- `alt=""` 빈 값 사용 금지 (데코레이션 이미지 제외)
- 클라이언트 컴포넌트에서 메타태그 직접 조작 금지
- `pages/` 디렉토리 혼용 금지 (App Router 전용)
- 포트폴리오 페이지에서 지역+아파트명 없는 제목 금지
