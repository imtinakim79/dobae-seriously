export interface Service {
  id: string;
  title: string;
  description: string;
  features: string[];
  price: string;
  icon: string;
}

export const services: Service[] = [
  {
    id: 'full-wallpaper',
    title: '전체 도배',
    description: '아파트·빌라 전체 벽지를 새 것으로 교체하는 가장 인기 있는 시공입니다.',
    features: ['전체 벽지 제거 포함', '실크·합지 선택 가능', '천장 포함 시공', '당일 완공 가능'],
    price: '평당 4만원~',
    icon: '🏠',
  },
  {
    id: 'partial-wallpaper',
    title: '부분 도배',
    description: '특정 공간(거실, 안방, 주방 등)만 선택적으로 시공합니다.',
    features: ['원하는 공간만 선택', '기존 벽지 위 덧바름 가능', '포인트 벽지 적용', '빠른 시공'],
    price: '공간별 별도 문의',
    icon: '🎯',
  },
  {
    id: 'move-in',
    title: '입주 도배',
    description: '새 집 이사 전 깔끔하게 마무리하는 입주 도배 전문 시공입니다.',
    features: ['새 아파트 맞춤 시공', '분양권 도배 경험 다수', '일정 맞춤 조율 가능', '사후 AS 보장'],
    price: '평당 3.5만원~',
    icon: '🔑',
  },
  {
    id: 'eco-wallpaper',
    title: '친환경 도배',
    description: '영·유아 가정을 위한 VOC 저방출 친환경 벽지 시공입니다.',
    features: ['친환경 LB 마크 인증 제품', '새집증후군 예방', '어린이·임산부 안심', '냄새 최소화'],
    price: '평당 4.5만원~',
    icon: '🌿',
  },
  {
    id: 'commercial',
    title: '상업공간 도배',
    description: '카페, 사무실, 병원 등 상업공간 도배 시공을 전문으로 합니다.',
    features: ['야간·주말 시공 가능', '내구성 강한 상업용 벽지', '대면적 시공 경험 풍부', '빠른 납기'],
    price: '현장 방문 견적',
    icon: '🏢',
  },
  {
    id: 'repair',
    title: '하자 보수',
    description: '벽지 들뜸, 찢어짐, 곰팡이 제거 후 부분 보수 시공입니다.',
    features: ['곰팡이 방지 처리 포함', '기존 벽지 색상 매칭', '빠른 출동 가능', '합리적인 보수 비용'],
    price: '현장 확인 후 견적',
    icon: '🔧',
  },
];
