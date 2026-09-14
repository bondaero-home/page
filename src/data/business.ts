// 본대로홈 사업자 정보 — 단일 출처(Single Source of Truth).
// LocalBusiness JSON-LD, 헤더/푸터, CTA, 연락처가 모두 여기서 값을 읽는다.
export const business = {
  name: '본대로홈',
  legalName: '본대로홈',
  owner: '정현숙',
  bizRegistration: '317-02-89232',
  tagline: '청주 오창 맞춤 커튼·블라인드 전문점',
  description:
    '커튼 전문 12년, 방문 실측부터 맞춤 제작·설치까지. 청주 오창·오송 지역 맞춤 커튼·블라인드 전문점.',
  careerYears: 12,

  phone: '050-6686-4878', // 휴대폰(상담)
  storePhone: '043-218-2554', // 매장 유선

  address: {
    full: '충북 청주시 청원구 오창읍 오청대로 315번지 올리브 상가 138호',
    street: '오청대로 315번지 올리브 상가 138호',
    locality: '청주시 청원구 오창읍',
    region: '충청북도',
    postalCode: '', // TODO: 우편번호 확인 시 입력
    country: 'KR',
  },

  hours: {
    display: '평일 10:30 – 19:00',
    holiday: '일요일 · 공휴일 휴무',
    open: '10:30',
    close: '19:00',
    // 일요일 휴무 → 월~토 영업
    days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
  },

  areaServed: ['청주시', '오창', '오송', '청원구'],
  mapUrl: 'https://map.naver.com/p/entry/place/1928365165',
  naverPlaceId: '1928365165',

  // 홈페이지 대표 이미지(OG 기본)
  ogImage: '/images/hero-curtain-v2.webp',

  // 검색엔진 소유 확인 코드. 각 도구에서 "HTML 태그" 방식을 고르면 주는
  // content="..." 안쪽 값만 넣는다(태그 전체가 아니라 값만).
  // 빈 문자열이면 <meta>를 아예 출력하지 않는다.
  siteVerification: {
    naver: '', // 네이버 서치어드바이저 → 사이트 소유확인 → HTML 태그
    google: '', // 구글 서치콘솔 → 소유권 확인 → HTML 태그
  },
} as const;

// 페이지 상단 내비게이션.
// 확장자 없는 절대경로가 이 사이트의 정식 주소다. Cloudflare Pages는 /서비스.html 요청을
// /서비스 로 308 리다이렉트하므로, .html을 달면 링크를 누를 때마다 왕복이 한 번 더 생긴다.
export const navLinks = [
  { href: '/서비스', label: '서비스' },
  { href: '/서비스과정', label: '서비스 과정' },
  { href: '/FAQ', label: 'FAQ' },
  { href: '/블로그', label: '블로그' },
  { href: '/문의', label: '문의' },
] as const;
