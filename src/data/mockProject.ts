import bannerOceanCity from '../assets/figma/banner-ocean-city.jpg';
import policyImage from '../assets/figma/policy-vinhomes-ocean-park-3.jpg';
import { projectDescription } from './site';

/**
 * Dữ liệu tĩnh theo đúng Figma — cho bản UI tĩnh (Bootstrap).
 * Bản MUI lấy dữ liệu thật từ BE, không dùng file này.
 */
export interface ProjectSummary {
  name: string;
  description: string;
  /** Ảnh carousel đầu trang. Figma có 5 chấm nhưng chỉ 1 ảnh -> lặp lại ảnh đó. */
  bannerImages: string[];
}

const MOCK_NAME = 'Vinhomes Ocean Park 3';

export const MOCK_PROJECT: ProjectSummary = {
  name: MOCK_NAME,
  // Figma viết hoa tên dự án trong câu mô tả
  description: projectDescription(MOCK_NAME.toUpperCase()),
  bannerImages: Array.from({ length: 5 }, () => bannerOceanCity),
};

/** Giống cấu trúc HTML CMS thật trả về: ảnh bọc trong <p>, width/height 100%. */
export const MOCK_POLICY_HTML = `<p><img src="${policyImage}" alt="Chính sách bán hàng Vinhomes Ocean Park 3" width="100%" height="100%"></p>`;
