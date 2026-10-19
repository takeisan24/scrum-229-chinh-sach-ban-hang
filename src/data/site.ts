import iconMail from '../assets/figma/icon-mail.svg';
import iconMapPin from '../assets/figma/icon-map-pin-footer.svg';
import iconMobile from '../assets/figma/icon-mobile.svg';
import social1 from '../assets/figma/social-1.svg';
import social2 from '../assets/figma/social-2.svg';
import social3 from '../assets/figma/social-3.svg';
import social4 from '../assets/figma/social-4.svg';
import social5 from '../assets/figma/social-5.svg';

/**
 * Nội dung header/footer theo Figma. Link đích chưa có (ngoài phạm vi SCRUM-229)
 * nên trỏ tạm về trang dự án — xem route `*` trong App.
 */
export const ONLINE_COUNT = 100;

export const MAIN_NAV = [
  { label: 'Giới thiệu', href: '/gioi-thieu' },
  { label: 'Dự án', href: '/du-an' },
  { label: 'Tin tức', href: '/tin-tuc' },
] as const;

export const FOOTER_TAGLINE = 'Nền tảng công nghệ tiên phong & dẫn đầu lĩnh vực kinh doanh bất động sản tại Việt Nam';

const ADDRESS = 'SB24-36, Sao Biển 24, KĐT Vinhomes Ocean Park, Xã Gia Lâm, TP Hà Nội, Việt Nam';

export const FOOTER_CONTACTS = [
  { icon: iconMobile, label: '0972 72 9999', href: 'tel:0972729999' },
  { icon: iconMail, label: 'Contact@gmail.com', href: 'mailto:Contact@gmail.com' },
  { icon: iconMapPin, label: ADDRESS, href: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(ADDRESS)}` },
] as const;

export const FOOTER_MAP_URL = FOOTER_CONTACTS[2].href;

export const FOOTER_CATEGORIES = [
  { label: 'Giới thiệu', href: '/gioi-thieu' },
  { label: 'Dự án', href: '/du-an' },
  { label: 'Liên hệ', href: '/lien-he' },
] as const;

/** Thứ tự icon theo Figma: Facebook, YouTube, Instagram, TikTok, X. */
export const SOCIAL_LINKS = [
  { icon: social1, label: 'Facebook', href: 'https://www.facebook.com' },
  { icon: social2, label: 'YouTube', href: 'https://www.youtube.com' },
  { icon: social3, label: 'Instagram', href: 'https://www.instagram.com' },
  { icon: social4, label: 'TikTok', href: 'https://www.tiktok.com' },
  { icon: social5, label: 'X', href: 'https://x.com' },
] as const;

/**
 * Mô tả ngắn dưới tên dự án — SCRUM-10 quy định câu cố định + tên dự án
 * (không lấy shortDescription của API). Dấu chấm cuối theo Figma.
 */
export function projectDescription(projectName: string): string {
  return `Theo dõi thông tin chi tiết và bảng giá, mặt bằng, tiến độ và chính sách bán hàng dự án ${projectName}.`;
}

export const COPYRIGHT = '© 2026 - Realestate. All rights reserved.';
