import { POLICY_TAB_ID } from '../constants/projectTabs';

/** Link dự án hiện tại (theo slug trên URL) kèm anchor tab chính sách bán hàng. */
export function buildPolicyShareUrl(): string {
  const { origin, pathname } = window.location;
  return `${origin}${pathname}#${POLICY_TAB_ID}`;
}

/**
 * Copy text vào clipboard. `navigator.clipboard` chỉ có trên HTTPS/localhost,
 * nên fallback sang textarea + execCommand cho môi trường HTTP (vd test qua IP LAN).
 */
export async function copyToClipboard(text: string): Promise<boolean> {
  if (navigator.clipboard && window.isSecureContext) {
    try {
      await navigator.clipboard.writeText(text);
      return true;
    } catch {
      // Bị chặn quyền -> thử cách cũ bên dưới
    }
  }

  // Fallback lấy focus vào textarea -> nhớ phần tử đang focus (nút Chia sẻ) để trả lại sau khi copy
  const previousFocus = document.activeElement instanceof HTMLElement ? document.activeElement : null;
  const textarea = document.createElement('textarea');
  textarea.value = text;
  textarea.setAttribute('readonly', '');
  textarea.style.position = 'fixed';
  textarea.style.opacity = '0';
  document.body.appendChild(textarea);
  textarea.select();
  textarea.setSelectionRange(0, text.length); // iOS Safari cần chọn vùng rõ ràng
  try {
    return document.execCommand('copy');
  } catch {
    return false;
  } finally {
    document.body.removeChild(textarea);
    previousFocus?.focus();
  }
}
