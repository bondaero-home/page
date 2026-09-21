// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import rehypeFigure from './src/lib/rehype-figure.mjs';

// 사이트맵 URL 정규화.
// 확장자는 붙이지 않는다. Workers Static Assets가 /서비스.html → /서비스 로 리다이렉트하므로
// 정식 주소는 확장자 없는 형태이고, 사이트맵은 리다이렉트가 아닌 최종 주소를 실어야 한다.
//
// 남는 문제는 한글 경로의 유니코드 정규화다. 사이트맵은 페이지 목록을 pages 배열과 _routes 배열
// 두 곳에서 모으는데, macOS에서 빌드하면 둘의 정규화 형태가 달라(NFD/NFC) 내부 Set 중복 제거가
// 실패하고 같은 페이지가 두 번 등재된다. NFD 주소는 실제로 404이므로 반드시 NFC로 맞춰야 한다.
// (Cloudflare의 Linux 빌드에서는 재현되지 않지만, 로컬 빌드본을 직접 올릴 때를 대비한 보험)
// 빌드는 매번 새 프로세스라 아래 seen 집합은 빌드 1회분만 살아 있다.
const seen = new Set();

// 배포 도메인 (canonical·sitemap·OG·JSON-LD 절대 URL의 단일 출처)
export default defineConfig({
  site: 'https://bondaerohome.com',
  // 기존 .html 요청은 정식 확장자 없는 URL로 리다이렉트된다 (예: /서비스.html → /서비스).
  build: { format: 'file' },
  trailingSlash: 'never',
  integrations: [
    sitemap({
      serialize(item) {
        const url = new URL(item.url);
        url.pathname = decodeURIComponent(url.pathname).normalize('NFC').replace(/\.html$/, '');

        if (seen.has(url.href)) return undefined; // NFD/NFC 중복 제거
        seen.add(url.href);
        return { ...item, url: url.href };
      },
    }),
  ],
  image: {
    // astro:assets 기본 서비스(sharp). 마크다운/컴포넌트 이미지 빌드 시 WebP 변환·리사이즈.
    responsiveStyles: true,
  },
  markdown: {
    // 본문 단독 이미지 → <figure><figcaption> (title = 캡션)
    rehypePlugins: [rehypeFigure],
  },
});
