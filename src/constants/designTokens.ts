/**
 * Token lấy từ biến của file Figma "Website BĐS" (frame 135:3696 / 247:10789).
 * Dùng chung cho bản MUI và bản Bootstrap — không hardcode màu ở component.
 */
export const colors = {
  primary: '#2a52be',
  primary100: '#eef0fd',
  secondary: '#00b4d8',
  secondary400: '#008ca8',
  grey100: '#f0f1f1',
  grey200: '#c9cacc',
  grey400: '#7c7d84',
  grey500: '#595a60',
  grey600: '#38393d',
  white: '#ffffff',
} as const;

export const BRAND_GRADIENT = `linear-gradient(90deg, ${colors.primary} 0%, ${colors.secondary} 100%)`;
export const HEADER_SHADOW = '0 2px 8px 0 rgba(42, 82, 190, 0.2)';
/** Tab đang chọn: web nền đặc, mobile nền primary 50% (theo Figma). */
export const ACTIVE_TAB_BG_MOBILE = 'rgba(42, 82, 190, 0.5)';
/** Nền hiện trước khi ảnh banner tải xong. */
export const BANNER_PLACEHOLDER_BG = '#166b86';

export const FONT_FAMILY = "Inter, system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif";
