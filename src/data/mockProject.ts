import bannerOceanCity from '../assets/figma/banner-ocean-city.jpg';
import policyImage from '../assets/figma/policy-vinhomes-ocean-park-3.jpg';
import { buildProjectSlug } from '../lib/projectSlug';

/**
 * Du lieu tinh theo dung Figma — cho ban UI tinh (Bootstrap) va lam du an mac dinh khi demo.
 * Ban ghep API lay du lieu that tu BE, khong dung file nay.
 */
export interface ProjectSummary {
  id: number;
  slug: string;
  name: string;
  description: string;
  /** Anh carousel dau trang. Figma co 5 cham nhung chi 1 anh -> lap lai anh do. */
  bannerImages: string[];
}

const MOCK_ID = 65; // id that cua "VINHOMES OCEAN PARK 2 & 3" tren UAT
const MOCK_NAME = 'Vinhomes Ocean Park 3';

export const MOCK_PROJECT: ProjectSummary = {
  id: MOCK_ID,
  slug: buildProjectSlug({ id: MOCK_ID, name: MOCK_NAME }),
  name: MOCK_NAME,
  description:
    'Theo dõi thông tin chi tiết và bảng giá, mặt bằng, tiến độ và chính sách bán hàng dự án VINHOMES OCEAN PARK 3.',
  bannerImages: Array.from({ length: 5 }, () => bannerOceanCity),
};

/** Giong cau truc HTML CMS that tra ve: anh boc trong <p>, width/height 100%. */
export const MOCK_POLICY_HTML = `<p><img src="${policyImage}" alt="Chính sách bán hàng Vinhomes Ocean Park 3" width="100%" height="100%"></p>`;
