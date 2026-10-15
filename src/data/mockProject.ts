import bannerOceanCity from '../assets/figma/banner-ocean-city.jpg';
import policyImage from '../assets/figma/policy-vinhomes-ocean-park-3.jpg';

/**
 * Du lieu tinh theo dung Figma — cho ban UI tinh (Bootstrap).
 * Ban MUI lay du lieu that tu BE, khong dung file nay.
 */
export interface ProjectSummary {
  name: string;
  description: string;
  /** Anh carousel dau trang. Figma co 5 cham nhung chi 1 anh -> lap lai anh do. */
  bannerImages: string[];
}

export const MOCK_PROJECT: ProjectSummary = {
  name: 'Vinhomes Ocean Park 3',
  description:
    'Theo dõi thông tin chi tiết và bảng giá, mặt bằng, tiến độ và chính sách bán hàng dự án VINHOMES OCEAN PARK 3.',
  bannerImages: Array.from({ length: 5 }, () => bannerOceanCity),
};

/** Giong cau truc HTML CMS that tra ve: anh boc trong <p>, width/height 100%. */
export const MOCK_POLICY_HTML = `<p><img src="${policyImage}" alt="Chính sách bán hàng Vinhomes Ocean Park 3" width="100%" height="100%"></p>`;
