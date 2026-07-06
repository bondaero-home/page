// 마크다운 본문의 독립 이미지(단독 문단의 <img>)를 <figure>로 감싸고,
// 이미지의 title(= ![alt](src "캡션")의 "캡션")을 <figcaption>으로 렌더한다.
// alt = 검색엔진/접근성용 설명, figcaption = 독자용 한 줄.
// 외부 의존성 없이 hast 트리를 직접 순회한다. (astro:assets 최적화 이후 단계에서 동작)
export default function rehypeFigure() {
  return (tree) => walk(tree);
}

function isBlank(node) {
  return node.type === 'text' && node.value.trim() === '';
}

function walk(node) {
  if (!node || !Array.isArray(node.children)) return;
  for (let i = 0; i < node.children.length; i++) {
    const child = node.children[i];
    if (child.type === 'element' && child.tagName === 'p') {
      const kids = child.children.filter((c) => !isBlank(c));
      if (kids.length === 1 && kids[0].type === 'element' && kids[0].tagName === 'img') {
        const img = kids[0];
        const props = img.properties || {};
        const title = props.title;
        if (title) delete props.title;
        const figcaption = title
          ? [{ type: 'element', tagName: 'figcaption', properties: {}, children: [{ type: 'text', value: String(title) }] }]
          : [];
        node.children[i] = {
          type: 'element',
          tagName: 'figure',
          properties: { className: ['post-figure'] },
          children: [img, ...figcaption],
        };
        continue;
      }
    }
    walk(child);
  }
}
