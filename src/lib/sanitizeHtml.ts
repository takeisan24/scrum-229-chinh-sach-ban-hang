import DOMPurify from 'dompurify';

/** Class của khung bọc mỗi <table> — để table rộng cuộn ngang mà vẫn giữ width (vd 100%) của CMS. */
export const TABLE_WRAPPER_CLASS = 'cms-table-wrap';

// Instance riêng: hook bên dưới chỉ áp cho nội dung CMS, không ảnh hưởng chỗ khác dùng DOMPurify.
const purify = DOMPurify(window);

// Nội dung chính sách chỉ là văn bản + ảnh + bảng: bỏ thẻ có thể phá trang
// (<style> áp lên toàn app, form/input giả mạo, ...).
const FORBID_TAGS = ['style', 'form', 'input', 'button', 'textarea', 'select', 'option'];
// Thuộc tính style có thể đưa nội dung ra khỏi luồng trang (phủ kín màn hình).
const OVERLAY_POSITIONS = new Set(['fixed', 'absolute', 'sticky']);

purify.addHook('afterSanitizeAttributes', (node) => {
  if (node instanceof HTMLElement && node.hasAttribute('style')) {
    if (OVERLAY_POSITIONS.has(node.style.position)) node.style.removeProperty('position');
    node.style.removeProperty('z-index');
    if (!node.getAttribute('style')?.trim()) node.removeAttribute('style');
  }
  if (node.tagName === 'A') {
    // Chỉ link web ra ngoài mới mở tab mới; link neo (#), mailto:, tel: giữ hành vi mặc định
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
  /** Alt cho ảnh CMS để trống (UAT gửi alt="") — nội dung chính sách thường là ảnh chụp chữ. */
  imageAlt?: string;
}

/**
 * Sanitize HTML thô từ CMS trước khi render. Giữ `style` (màu, size, căn lề admin đặt).
 * Trả về '' khi không có gì hiển thị (vd trình soạn thảo lưu `<p>&nbsp;</p>` khi admin xoá hết nội dung).
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

  // trim() đã bỏ cả &nbsp; (U+00A0)
  const hasText = (fragment.textContent ?? '').trim() !== '';
  if (!hasText && !fragment.querySelector('img, table, hr')) return '';

  const container = document.createElement('div');
  container.appendChild(fragment);
  return container.innerHTML;
}
