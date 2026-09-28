// Animate images only: captions, links and surrounding layout stay stationary.
const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
const mobile = window.matchMedia('(max-width: 560px)');
let observer: IntersectionObserver | undefined;
const animations = new Set<Animation>();

function setupImageReveals() {
  observer?.disconnect();
  animations.forEach((animation) => animation.cancel());
  animations.clear();
  document.querySelectorAll('.image-reveal-pending').forEach((image) => {
    image.classList.remove('image-reveal-pending');
  });
  if (motion.matches || !('IntersectionObserver' in window)) return;

  observer = new IntersectionObserver((entries) => {
    const visible = entries.filter((entry) => entry.isIntersecting)
      .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top || a.boundingClientRect.left - b.boundingClientRect.left);
    let rowTop = -Infinity;
    let column = 0;
    visible.forEach((entry) => {
      const image = entry.target as HTMLImageElement;
      observer?.unobserve(image);
      if (Math.abs(entry.boundingClientRect.top - rowTop) > 48) {
        rowTop = entry.boundingClientRect.top;
        column = 0;
      }
      const delay = Math.min(column++, 3) * 90;
      image.classList.remove('image-reveal-pending');
      const animation = image.animate([
        { opacity: 0, transform: `translateY(${mobile.matches ? 24 : 48}px)`, clipPath: 'inset(18% 0 0 0)' },
        { opacity: 1, transform: 'translateY(0)', clipPath: 'inset(0 0 0 0)' },
      ], { duration: mobile.matches ? 650 : 850, delay, easing: 'cubic-bezier(0.22, 1, 0.36, 1)', fill: 'backwards' });
      animations.add(animation);
      animation.onfinish = () => animations.delete(animation);
    });
  }, { threshold: 0, rootMargin: '0px 0px -40px 0px' });

  document.querySelectorAll<HTMLImageElement>('main img').forEach((image) => {
    // Preserve above-the-fold images and already passed content on restored scroll positions.
    if (image.closest('.hero, [data-no-image-reveal]') || image.getBoundingClientRect().top < window.innerHeight - 40) return;
    image.classList.add('image-reveal-pending');
    observer!.observe(image);
  });
}

setupImageReveals();
motion.addEventListener('change', setupImageReveals);
window.addEventListener('pageshow', (event) => {
  if (event.persisted) setupImageReveals();
});
