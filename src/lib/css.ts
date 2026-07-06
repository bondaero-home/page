// React식 스타일 객체({ fontSize: 16, gap: 12 })를 CSS 문자열로 변환.
// Astro의 style 객체는 숫자에 px를 자동으로 붙이지 않으므로, 원본 JSX의
// 인라인 스타일을 "그대로 복사"해서 style={css({...})}로 감싸기만 하면
// 렌더 결과가 기존 사이트와 동일해진다.
//
// 사용: <div style={css({ fontSize: 16, padding: "8px 14px", fontWeight: 700 })} />

// 숫자를 px 없이 그대로 두는 속성(React의 unitless 목록과 동일).
const UNITLESS = new Set([
  'animationIterationCount', 'aspectRatio', 'borderImageOutset', 'borderImageSlice',
  'borderImageWidth', 'boxFlex', 'boxFlexGroup', 'boxOrdinalGroup', 'columnCount',
  'columns', 'flex', 'flexGrow', 'flexPositive', 'flexShrink', 'flexNegative',
  'flexOrder', 'gridArea', 'gridRow', 'gridRowEnd', 'gridRowSpan', 'gridRowStart',
  'gridColumn', 'gridColumnEnd', 'gridColumnSpan', 'gridColumnStart', 'fontWeight',
  'lineClamp', 'lineHeight', 'opacity', 'order', 'orphans', 'tabSize', 'widows',
  'zIndex', 'zoom', 'fillOpacity', 'floodOpacity', 'stopOpacity', 'strokeDasharray',
  'strokeDashoffset', 'strokeMiterlimit', 'strokeOpacity', 'strokeWidth',
]);

function hyphenate(key: string): string {
  const h = key.replace(/([A-Z])/g, '-$1').toLowerCase();
  // 벤더 프리픽스(Webkit/Moz/ms/O)는 앞에 대시를 하나 더 붙인다.
  return /^(webkit|moz|ms|o)-/.test(h) ? `-${h}` : h;
}

export function css(style: Record<string, string | number | null | undefined | false>): string {
  return Object.entries(style)
    .filter(([, v]) => v !== null && v !== undefined && v !== false)
    .map(([k, v]) => {
      const val = typeof v === 'number' && !UNITLESS.has(k) ? `${v}px` : String(v);
      return `${hyphenate(k)}:${val}`;
    })
    .join(';');
}
