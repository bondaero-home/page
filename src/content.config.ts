import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

// 골든 샘플 글의 frontmatter를 기준으로 정의한 블로그 스키마.
// 필수 필드 누락 시 빌드가 실패하며, 아래 한국어 메시지가 함께 출력된다.
// (Astro는 "어느 글(entry id)의 어떤 필드"인지까지 함께 표시)
//
// ※ z.string({ required_error })를 쓰지 않는 이유: Astro가 빌드 오류를 만들 때
//   자체 errorMap을 주입하는데, 필드 누락(invalid_type)이면 스키마의 커스텀 메시지를
//   무시하고 영어 "Required"만 출력한다. custom 검사(z.custom)의 메시지는 그대로
//   살려주므로, 필수 검사를 custom으로 수행해야 한국어가 나온다.

// 필수 문자열: 누락·빈 값 모두 같은 한국어 메시지로 실패
const 필수문자열 = (message: string) =>
  z.custom<string>((v) => typeof v === 'string' && v.trim().length > 0, { message });

// 필수 값 존재 검사 후 다음 스키마로 넘기는 헬퍼 (누락 시 한국어, 형식 오류는 뒤 스키마가 처리)
const 필수 = (message: string) => z.custom<unknown>((v) => v !== undefined && v !== null && v !== '', { message });

const blog = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/blog' }),
  schema: ({ image }) =>
    z.object({
      // URL 주소. 있으면 파일 위치와 무관하게 이 값이 곧 글 URL이 된다(글로브 로더 기본 동작).
      // 폴더 글(slug/index.md)은 반드시 넣어야 URL에 "/index"가 붙지 않는다.
      slug: z
        .string()
        .regex(/^[a-z0-9]+(-[a-z0-9]+)*$/, 'slug(URL 주소)는 영문 소문자·숫자·하이픈만 가능합니다. 예: ochang-vertical-blind-privacy')
        .optional(),
      title: 필수문자열('필수 항목: title(글 제목)이 없습니다.'),
      description: 필수문자열('필수 항목: description(요약/메타설명)이 없습니다.'),
      pubDate: 필수('필수 항목: pubDate(발행일)가 없습니다.').pipe(
        z.coerce.date({ errorMap: () => ({ message: 'pubDate(발행일) 형식이 올바르지 않습니다. 예: 2026-07-06' }) }),
      ),
      category: z.custom<'시공사례' | '가이드'>((v) => v === '시공사례' || v === '가이드', {
        message: '필수 항목: category(카테고리)는 "시공사례" 또는 "가이드"만 가능합니다.',
      }),
      location: 필수문자열('필수 항목: location(지역)이 없습니다.'),
      buildingType: 필수문자열('필수 항목: buildingType(건물 유형)이 없습니다.'),
      area: 필수문자열('필수 항목: area(면적)가 없습니다.'),
      product: 필수문자열('필수 항목: product(제품)가 없습니다.'),
      cost: 필수문자열('필수 항목: cost(시공 비용)가 없습니다.'),
      installTime: 필수문자열('필수 항목: installTime(설치 시간)이 없습니다.'),
      leadTime: 필수문자열('필수 항목: leadTime(제작 기간)이 없습니다.'),
      tags: z.array(z.string()).default([]),
      heroImage: 필수('필수 항목: heroImage(대표 이미지)가 없습니다.').pipe(image()),
      heroImageAlt: 필수문자열('필수 항목: heroImageAlt(대표 이미지 대체텍스트)가 없습니다. 형식: 지역+공간+제품+장면'),
      // FAQPage JSON-LD + 화면 FAQ 섹션을 자동 생성하는 소스. 3개 권장.
      faq: z
        .array(z.object({ q: z.string().min(1), a: z.string().min(1) }))
        .default([]),
      draft: z.boolean().default(false),
    }),
});

export const collections = { blog };
