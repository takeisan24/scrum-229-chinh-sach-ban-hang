import iconBuilding from '../assets/figma/icon-building-01.svg';
import iconCompass from '../assets/figma/icon-compass.svg';
import iconFileCheck from '../assets/figma/icon-file-check.svg';
import iconGlobe from '../assets/figma/icon-globe.svg';
import iconMainComponent from '../assets/figma/icon-main-component.svg';
import iconMap from '../assets/figma/icon-map.svg';
import iconMapPin from '../assets/figma/icon-map-pin.svg';

/**
 * Cac tab cua trang chi tiet du an. `id` cung la hash tren URL (vd `#chinh-sach-ban-hang`).
 * Icon export tu Figma. Rieng tab "Chinh sach ban hang": Figma mobile dung icon Lock,
 * web dung File_Check — thong nhat dung File_Check cho ca hai.
 */
export const PROJECT_TABS = [
  { id: 'tong-quan', label: 'Tổng quan', icon: iconMainComponent },
  { id: 'vi-tri', label: 'Vị trí', icon: iconMapPin },
  { id: 'phan-khu', label: 'Phân khu', icon: iconCompass },
  { id: 'mat-bang-quy-can', label: 'Mặt bằng quỹ căn', icon: iconMap },
  { id: 'quy-can', label: 'Quỹ căn', icon: iconBuilding },
  { id: 'chinh-sach-ban-hang', label: 'Chính sách bán hàng', icon: iconFileCheck },
  { id: 'tin-tuc', label: 'Tin tức', icon: iconGlobe },
] as const;

export type ProjectTabId = (typeof PROJECT_TABS)[number]['id'];

export const DEFAULT_TAB_ID: ProjectTabId = 'tong-quan';
export const POLICY_TAB_ID: ProjectTabId = 'chinh-sach-ban-hang';

export function isProjectTabId(value: string): value is ProjectTabId {
  return PROJECT_TABS.some((tab) => tab.id === value);
}
