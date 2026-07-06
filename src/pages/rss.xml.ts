import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import type { APIContext } from 'astro';

export async function GET(context: APIContext) {
  const posts = (await getCollection('blog'))
    .filter((p) => !p.data.draft)
    .sort((a, b) => b.data.pubDate.getTime() - a.data.pubDate.getTime());

  return rss({
    title: '본대로홈 블로그',
    description: '청주 오창·오송 커튼·블라인드 시공 사례와 제품 선택 가이드',
    site: context.site ?? 'https://bondaerohome.com',
    items: posts.map((p) => ({
      title: p.data.title,
      description: p.data.description,
      pubDate: p.data.pubDate,
      link: `/블로그/${p.id}.html`,
      categories: [p.data.category, ...p.data.tags],
    })),
    customData: `<language>ko-kr</language>`,
  });
}
