import DOMPurify from 'dompurify';

/** Class cua khung boc moi <table> — de table rong cuon ngang ma van giu width (vd 100%) cua CMS. */
export const TABLE_WRAPPER_CLASS = 'cms-table-wrap';

// Link trong noi dung CMS mo tab moi, chan tab moi truy cap window.opener.
// Anh tai lazy vi noi dung chinh sach thuong co nhieu anh lon.
DOMPurify.addHook('afterSanitizeAttributes', (node) => {
  if (node.tagName === 'A' && node.hasAttribute('href')) {
    node.setAttribute('target', '_blank');
    node.setAttribute('rel', 'noopener noreferrer');
  }
  if (node.tagName === 'IMG') {
    node.setAttribute('loading', 'lazy');
  }
});

/**
 * Sanitize HTML tho tu CMS truoc khi render.
 * Giu lai `style` (mau, size, can le do CMS set inline) — DOMPurify mac dinh da cho phep.
 */
export function sanitizeHtml(html: string): string {
  const fragment = DOMPurify.sanitize(html, { ADD_ATTR: ['target'], RETURN_DOM_FRAGMENT: true });

  fragment.querySelectorAll('table').forEach((table) => {
    const wrapper = document.createElement('div');
    wrapper.className = TABLE_WRAPPER_CLASS;
    table.replaceWith(wrapper);
    wrapper.appendChild(table);
  });

  const container = document.createElement('div');
  container.appendChild(fragment);
  return container.innerHTML;
}
