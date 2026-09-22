import { business } from '../../data/business';
const { phone, mapUrl } = business;

export const STEPS_SUMMARY = [
  { n: "01", name: "문의", desc: "전화 한 통 또는 매장 방문으로 시작해요" },
  { n: "02", name: "원단 확인", desc: "매장에서 실제 원단과 샘플을 직접 보고 골라요" },
  { n: "03", name: "방문 실측", desc: "댁에 찾아가 창 크기·방향·색감을 함께 봐요 (청주·오창·오송 무료)" },
  { n: "04", name: "발주", desc: "결정한 사양 그대로 공장에 주문을 넣어요" },
  { n: "05", name: "제작", desc: "고객님 창에 맞춰 맞춤 제작해요" },
  { n: "06", name: "설치", desc: "발주 후 약 일주일 안에 설치까지 마무리해요" },
];

export interface StepDetailData {
  n: string;
  name: string;
  body: string[];
  highlight?: string;
  img?: string;
  imgLabel?: string;
  imgAlt?: string;
  imgPlaceholder?: string;
  cta?: { text: string; href: string; primary: boolean; external?: boolean } | null;
}

export const STEPS_DETAIL: StepDetailData[] = [
  {
    n: "1단계",
    name: "매장 방문 또는 전화 문의",
    body: [
      "편한 방법으로 시작하세요. 전화로 \"거실 커튼 얼마예요?\" 하고 물어보셔도 되고, 매장에 들러 원단을 먼저 보셔도 돼요.",
      "전화로 대략적인 가격대와 진행 방법을 먼저 안내해 드려요.",
    ],
    img: "/images/process-store-interior.webp",
    imgAlt: "본대로홈 매장 내부 — 레이스 커튼과 원단 전시",
    cta: { text: "지금 전화 상담하기", href: `tel:${phone}`, primary: true },
  },
  {
    n: "2단계",
    name: "원단 샘플 확인 · 상품 결정",
    body: [
      "온라인 사진과 실물은 다를 수 있어요. 그래서 매장에서 실제 원단의 두께·질감·색을 직접 만져보고 고르시는 걸 권해드려요.",
      "암막·쉬폰·이중커튼, 콤비·우드·롤스크린·알루미늄블라인드 중 공간에 맞는 제품을 함께 정해요.",
    ],
    img: "/images/process-fabric-sample.webp",
    imgAlt: "매장에서 원단 샘플북과 색상표를 직접 확인",
    cta: { text: "매장에서 원단 보기", href: mapUrl, primary: false, external: true },
  },
  {
    n: "3단계",
    name: "방문 실측",
    body: [
      "댁으로 직접 찾아가 창의 정확한 크기를 재요. 동시에 창이 어느 방향을 보는지, 기존 인테리어 색감은 어떤지까지 보고 어울리는 제품과 색을 함께 정해요.",
      "기장이 잘못 나오면 다시 방문해야 하니까, 처음 실측에서 꼼꼼히 봐서 재방문을 줄여요.",
    ],
    highlight: "청주·오창·오송 지역은 방문 실측이 무료예요. 그 외 지역은 전화로 문의해 주세요.",
    img: "/images/process-measure.webp",
    imgAlt: "창 크기를 줄자로 정확히 실측하는 모습",
    cta: { text: "지금 전화로 일정 잡기", href: `tel:${phone}`, primary: true },
  },
  {
    n: "4단계",
    name: "공장 발주",
    body: [
      "실측한 사이즈와 결정한 사양 그대로 공장에 주문을 넣어요.",
      "본대로홈은 중간 유통 단계를 거치지 않고 공장과 직접 거래해요. 그래서 같은 원단·사양이라도 가격 거품을 덜어낼 수 있어요.",
    ],
    img: "/images/process-order-fabric.webp",
    imgAlt: "원단 카탈로그에서 결정한 사양 그대로 공장 발주",
    cta: null,
  },
  {
    n: "5단계",
    name: "맞춤 제작",
    body: [
      "공장에서 고객님 창 사이즈에 맞게 재단·봉제해요.",
      "본대로홈은 미싱을 직접 보유하고 있어서, 기장이 안 맞거나 손볼 곳이 생기면 공장에 다시 보내지 않고 현장에서 바로 처리해요.",
    ],
    img: "/images/process-sewing-factory.webp",
    imgAlt: "공장에 보관된 다양한 원단 — 창 크기에 맞춰 맞춤 제작",
    cta: null,
  },
  {
    n: "6단계",
    name: "설치",
    body: [
      "약속한 날에 방문해 설치까지 마무리해요. 발주부터 설치까지 보통 일주일 안이에요.",
    ],
    img: "/images/process-install-curtain-v3.webp",
    imgPlaceholder: "data:image/webp;base64,UklGRqgAAABXRUJQVlA4IJwAAADQBACdASoYABIAPwFyr1KrJqQiqAqpYCAJYwCsAywAlL+IwN5y0g8vVfnUOZJNUAD8pCsUIH7oPqDOIHbPQu4bWgST0PsA5It1aYb7OLpK9ICyOqoBWsyBoFdXc9p739YX2H+5fXUcMxVmdudy8vqhX00WhKwEMkvUmK+ebQ/x6M2UK2ZU9n0wfg9O2dKiO5o4YNLcQwkgMiACCAA=",
    imgAlt: "발코니 창에서 드릴을 들어 커튼·블라인드를 설치하는 작업자",
    cta: null,
  },
];
