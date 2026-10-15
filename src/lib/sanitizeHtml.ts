import DOMPurify from 'dompurify';

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
  return DOMPurify.sanitize(html, { ADD_ATTR: ['target'] });
}
