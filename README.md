# 본대로홈 홈페이지 (Astro)

청주 오창 맞춤 커튼·블라인드 전문점 **본대로홈** 웹사이트.
정적 사이트 생성기 **Astro 5**로 빌드하며, 블로그 글은 빌드 시 **정적 HTML**로 생성되어
네이버·구글·AI 검색봇이 본문을 읽을 수 있습니다.

## 개발 / 빌드

```bash
npm install       # 최초 1회
npm run dev       # 개발 서버 (http://localhost:4321)
npm run build     # 정적 빌드 → dist/
npm run preview   # 빌드 결과 미리보기
```

## 폴더 구조

```
src/
├─ pages/          각 페이지 (한글 .html URL 유지: 서비스.html 등)
│  ├─ index.astro  서비스.astro  서비스과정.astro  FAQ.astro  문의.astro
│  ├─ 블로그.astro              블로그 목록(카테고리 탭 필터)
│  ├─ 블로그/[...slug].astro    블로그 글 상세
│  ├─ 블로그/category/[category].astro · 블로그/tag/[tag].astro   필터 페이지
│  ├─ rss.xml.ts  ·  404.astro
├─ content/blog/   ★ 블로그 글 — 글 1편 = 폴더 1개
│  └─ <영문-slug>/
│     ├─ index.md  글 본문(frontmatter 포함)
│     └─ images/   이 글의 사진 (01.jpg, 02.jpg … 번호 이름)
├─ content.config.ts   블로그 frontmatter 스키마(zod) — 필수 필드 검증
├─ layouts/        BaseLayout · BlogPost · BlogListShell
├─ components/     Header/Footer/공용 + home/ service/ process/ contact/ blog/ seo/
├─ data/business.ts  ★ 상호·주소·전화·영업시간 (단일 출처) — 여기만 고치면 전 페이지 반영
├─ lib/            css.ts(스타일 헬퍼) · related.ts · rehype-figure.mjs
└─ styles/global.css  디자인 시스템

public/
├─ images/         마케팅 페이지 이미지 · mark.png
├─ admin/          Sveltia CMS (config.yml — 배포 시 backend 입력)
├─ robots.txt · llms.txt
```

## 블로그 글 추가하는 법

### 방법 A — 마크다운 파일 직접 (개발자)
`src/content/blog/<영문-slug>/index.md` 생성 (글 1편 = 폴더 1개, 사진은 같은 폴더의 `images/`에 `01.jpg` 번호 이름으로). frontmatter 필수 필드:

| 필드 | 예시 | 설명 |
|---|---|---|
| slug | "ochang-vertical-blind-privacy" | URL 주소(영문 소문자-하이픈). 폴더 이름과 동일하게 |
| title | "청주 오창 …" | 글 제목 |
| description | "…" | 검색 노출용 요약(메타) |
| pubDate | 2026-07-06 | 발행일 |
| category | "시공사례" | 시공사례 / 가이드 |
| location | "청주 오창 양청리" | 지역 |
| buildingType / area / product | "빌라 원룸" / "10평" / "화이트 버티컬블라인드" | |
| cost / installTime / leadTime | "20만 원대" / "약 1시간" / "주문 후 제작 3일" | |
| tags | ["오창블라인드", …] | 검색 키워드 |
| heroImage | "./images/xxx.webp" | 대표 이미지 |
| heroImageAlt | "지역+공간+제품+장면" | 대표 이미지 설명 |
| faq | q/a 3개 | 자동으로 화면 FAQ + FAQPage 구조화데이터 생성 |

필수 필드가 빠지면 `npm run build`가 **실패하며 어떤 글의 어떤 필드가 빠졌는지 한국어로** 알려줍니다.

- 본문 이미지: `![검색용 alt](./images/01.jpg "독자용 캡션")` → `figure`+`figcaption`으로 렌더, WebP 자동 변환·리사이즈.
- 이미지 파일명: **번호만** (`01.jpg`, `02.jpg` …, 본문 등장 순서). 글 폴더 안에 격리되므로 다른 글과 충돌하지 않는다. 한글·공백 금지.
- **HEIC(아이폰 기본 포맷)은 빌드 불가.** JPG/PNG/WebP만 사용 — 아이폰은 설정→카메라→포맷→"높은 호환성"으로 JPG 촬영, 또는 전송 시 JPG 변환.
- 골든 샘플: [`src/content/blog/ochang-vertical-blind-privacy/index.md`](src/content/blog/ochang-vertical-blind-privacy/index.md) 참고.

### 방법 B — 관리자 CMS (사장님)
`bondaerohome.com/admin` 에서 브라우저로 글 작성 → GitHub 자동 커밋 → 자동 재배포.
**이미 연동돼 있어 바로 쓸 수 있습니다.** 설정은 [`public/admin/config.yml`](public/admin/config.yml) 참고.

## SEO / GEO

- 글 상세: **BlogPosting · FAQPage · BreadcrumbList** JSON-LD 자동 생성 + 화면 빵부스러기.
- 전역: **LocalBusiness** JSON-LD, `sitemap-index.xml`, `robots.txt`, RSS(`/rss.xml`), canonical, OG/Twitter, `llms.txt`.
- 기준 도메인은 [`astro.config.mjs`](astro.config.mjs)의 `site: 'https://bondaerohome.com'`.

## 배포

**이미 라이브입니다.** 현재 경로 (2026-09-07 확인):

```
로컬 → git push origin main → GitHub bondaero-home/page → Cloudflare Pages 프로젝트 bondearo → bondaerohome.com
```

- `main`에 푸시하면 자동 재배포. 빌드 명령 `npm run build`, 출력 디렉터리 `dist`.
- CMS 연동 완료 — `backend.repo: bondaero-home/page`, GitHub OAuth 중개는 `sveltia-cms-auth` 워커.
- **주의:** `seon-biz/bondearo`는 예전 배포 소스였으나 지금은 끊겨 있습니다. 거기 푸시해도 배포되지 않습니다.
- 연결 저장소를 확인할 때는 `git ls-remote <저장소> main` 해시와 `npx wrangler pages deployment list --project-name=bondearo`의 커밋 해시를 대조하세요. wrangler는 연결 저장소 이름을 보여주지 않습니다.

## 남은 개선

- (선택) 마케팅 페이지 이미지도 `astro:assets`로 최적화 + 파일명 규칙 리네이밍 — 현재 `public/images/`(약 10MB)에서 원본 그대로 서빙 중.

## 참고

- 기존 무빌드 프로토타입 원본은 `_legacy/`에 보관(git 미포함).
- 상호/연락처/영업시간 변경은 `src/data/business.ts` 한 곳만 고치면 전 페이지·구조화데이터에 반영됩니다.
