import { POLICY_TAB_ID } from '../constants/projectTabs';

/** Link du an hien tai (theo slug tren URL) kem anchor tab chinh sach ban hang. */
export function buildPolicyShareUrl(): string {
  const { origin, pathname } = window.location;
  return `${origin}${pathname}#${POLICY_TAB_ID}`;
}

/**
 * Copy text vao clipboard. `navigator.clipboard` chi co tren HTTPS/localhost,
 * nen fallback sang textarea + execCommand cho moi truong HTTP (vd test qua IP LAN).
 */
export async function copyToClipboard(text: string): Promise<boolean> {
  if (navigator.clipboard && window.isSecureContext) {
    try {
      await navigator.clipboard.writeText(text);
      return true;
    } catch {
      // Bi chan quyen -> thu cach cu ben duoi
    }
  }

  // Fallback lay focus vao textarea -> nho phan tu dang focus (nut Chia se) de tra lai sau khi copy
  const previousFocus = document.activeElement instanceof HTMLElement ? document.activeElement : null;
  const textarea = document.createElement('textarea');
  textarea.value = text;
  textarea.setAttribute('readonly', '');
  textarea.style.position = 'fixed';
  textarea.style.opacity = '0';
  document.body.appendChild(textarea);
  textarea.select();
  textarea.setSelectionRange(0, text.length); // iOS Safari can chon vung ro rang
  try {
    return document.execCommand('copy');
  } catch {
    return false;
  } finally {
    document.body.removeChild(textarea);
    previousFocus?.focus();
  }
}
