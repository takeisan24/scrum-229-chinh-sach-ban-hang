import DOMPurify from 'dompurify';

/** Class cua khung boc moi <table> — de table rong cuon ngang ma van giu width (vd 100%) cua CMS. */
export const TABLE_WRAPPER_CLASS = 'cms-table-wrap';

// Instance rieng: hook ben duoi chi ap cho noi dung CMS, khong anh huong cho khac dung DOMPurify.
const purify = DOMPurify(window);

// Noi dung chinh sach chi la van ban + anh + bang: bo the co the pha trang
// (<style> ap len toan app, form/input gia mao, ...).
const FORBID_TAGS = ['style', 'form', 'input', 'button', 'textarea', 'select', 'option'];
// Thuoc tinh style co the dua noi dung ra khoi luong trang (phu kin man hinh).
const OVERLAY_POSITIONS = new Set(['fixed', 'absolute', 'sticky']);

purify.addHook('afterSanitizeAttributes', (node) => {
  if (node instanceof HTMLElement && node.hasAttribute('style')) {
    if (OVERLAY_POSITIONS.has(node.style.position)) node.style.removeProperty('position');
    node.style.removeProperty('z-index');
    if (!node.getAttribute('style')?.trim()) node.removeAttribute('style');
  }
  if (node.tagName === 'A') {
    // Chi link web ra ngoai moi mo tab moi; link neo (#), mailto:, tel: giu hanh vi mac dinh
    if (/^https?:\/\//i.test(node.getAttribute('href') ?? '')) {
      node.setAttribute('target', '_blank');
      node.setAttribute('rel', 'noopener noreferrer');
    } else {
      node.removeAttribute('target');
    }
  }
  if (node.tagName === 'IMG') {
    node.setAttribute('loading', 'lazy');
  }
});

interface SanitizeOptions {
  /** Alt cho anh CMS de trong (UAT gui alt="") — noi dung chinh sach thuong la anh chup chu. */
  imageAlt?: string;
}

/**
 * Sanitize HTML tho tu CMS truoc khi render. Giu `style` (mau, size, can le admin dat).
 * Tra ve '' khi khong co gi hien thi (vd trinh soan thao luu `<p>&nbsp;</p>` khi admin xoa het noi dung).
 */
export function sanitizeHtml(html: string, { imageAlt }: SanitizeOptions = {}): string {
  const fragment = purify.sanitize(html, { FORBID_TAGS, RETURN_DOM_FRAGMENT: true });

  fragment.querySelectorAll('table').forEach((table) => {
    const wrapper = document.createElement('div');
    wrapper.className = TABLE_WRAPPER_CLASS;
    table.replaceWith(wrapper);
    wrapper.appendChild(table);
  });

  if (imageAlt) {
    fragment.querySelectorAll('img').forEach((img) => {
      if (!img.getAttribute('alt')?.trim()) img.setAttribute('alt', imageAlt);
    });
  }

  // trim() da bo ca &nbsp; (U+00A0)
  const hasText = (fragment.textContent ?? '').trim() !== '';
  if (!hasText && !fragment.querySelector('img, table, hr')) return '';

  const container = document.createElement('div');
  container.appendChild(fragment);
  return container.innerHTML;
}
