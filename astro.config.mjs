// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import rehypeFigure from './src/lib/rehype-figure.mjs';

// 배포 도메인 (canonical·sitemap·OG·JSON-LD 절대 URL의 단일 출처)
export default defineConfig({
  site: 'https://bondaerohome.com',
  // 기존 사이트의 한글 .html URL을 그대로 보존 (예: /서비스.html)
  build: { format: 'file' },
  trailingSlash: 'never',
  integrations: [sitemap()],
  image: {
    // astro:assets 기본 서비스(sharp). 마크다운/컴포넌트 이미지 빌드 시 WebP 변환·리사이즈.
    responsiveStyles: true,
  },
  markdown: {
    // 본문 단독 이미지 → <figure><figcaption> (title = 캡션)
    rehypePlugins: [rehypeFigure],
  },
});
