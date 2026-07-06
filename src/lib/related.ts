import type { CollectionEntry } from 'astro:content';

type Post = CollectionEntry<'blog'>;

// 같은 지역/같은 제품/공통 태그 기준으로 관련 글 점수화 → 상위 N개.
export function relatedPosts(all: Post[], current: Post, limit = 3): Post[] {
  const scored = all
    .filter((p) => p.id !== current.id && !p.data.draft)
    .map((p) => {
      let score = 0;
      if (p.data.location === current.data.location) score += 3;
      if (p.data.product === current.data.product) score += 3;
      const sharedTags = p.data.tags.filter((t) => current.data.tags.includes(t)).length;
      score += sharedTags;
      if (p.data.category === current.data.category) score += 1;
      return { p, score };
    });
  scored.sort(
    (a, b) => b.score - a.score || b.p.data.pubDate.getTime() - a.p.data.pubDate.getTime(),
  );
  return scored.slice(0, limit).map((s) => s.p);
}

export function formatDate(d: Date): string {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${y}. ${m}. ${day}`;
}
