import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

// 골든 샘플 글의 frontmatter를 기준으로 정의한 블로그 스키마.
// 필수 필드 누락 시 빌드가 실패하며, 아래 한국어 메시지가 함께 출력된다.
// (Astro는 "어느 글(entry id)의 어떤 필드"인지까지 함께 표시)
const blog = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/blog' }),
  schema: ({ image }) =>
    z.object({
      title: z.string({ required_error: '필수 항목: title(글 제목)이 없습니다.' }).min(1, 'title(글 제목)을 입력하세요.'),
      description: z
        .string({ required_error: '필수 항목: description(요약/메타설명)이 없습니다.' })
        .min(1, 'description(요약/메타설명)을 입력하세요.'),
      pubDate: z.coerce.date({ required_error: '필수 항목: pubDate(발행일)가 없습니다.', invalid_type_error: 'pubDate(발행일) 형식이 올바르지 않습니다. 예: 2026-07-06' }),
      category: z.enum(['시공사례', '가이드'], {
        required_error: '필수 항목: category(카테고리)가 없습니다.',
        invalid_type_error: 'category는 "시공사례" 또는 "가이드"만 가능합니다.',
      }),
      location: z.string({ required_error: '필수 항목: location(지역)이 없습니다.' }).min(1, 'location(지역)을 입력하세요.'),
      buildingType: z.string({ required_error: '필수 항목: buildingType(건물 유형)이 없습니다.' }).min(1),
      area: z.string({ required_error: '필수 항목: area(면적)가 없습니다.' }).min(1),
      product: z.string({ required_error: '필수 항목: product(제품)가 없습니다.' }).min(1),
      cost: z.string({ required_error: '필수 항목: cost(시공 비용)가 없습니다.' }).min(1),
      installTime: z.string({ required_error: '필수 항목: installTime(설치 시간)이 없습니다.' }).min(1),
      leadTime: z.string({ required_error: '필수 항목: leadTime(제작 기간)이 없습니다.' }).min(1),
      tags: z.array(z.string()).default([]),
      heroImage: image({ required_error: '필수 항목: heroImage(대표 이미지)가 없습니다.' }),
      heroImageAlt: z
        .string({ required_error: '필수 항목: heroImageAlt(대표 이미지 대체텍스트)가 없습니다.' })
        .min(1, 'heroImageAlt(대표 이미지 대체텍스트)를 입력하세요. 형식: 지역+공간+제품+장면'),
      // FAQPage JSON-LD + 화면 FAQ 섹션을 자동 생성하는 소스. 3개 권장.
      faq: z
        .array(z.object({ q: z.string().min(1), a: z.string().min(1) }))
        .default([]),
      draft: z.boolean().default(false),
    }),
});

export const collections = { blog };
