import bannerOceanCity from '../assets/figma/banner-ocean-city.jpg';
import policyImage from '../assets/figma/policy-vinhomes-ocean-park-3.jpg';

/**
 * Du lieu gia de dung FE khi chua ghep API.
 * MOCK_POLICY_HTML co du moi kieu format ma task yeu cau support:
 * bold/italic/underline, mau, size, can le, list, link, table, anh.
 */
export interface ProjectSummary {
  id: number;
  slug: string;
  name: string;
  description: string;
  /** Anh carousel dau trang. Figma co 5 cham nhung chi 1 anh -> mock lap lai anh do. */
  bannerImages: string[];
}

export const MOCK_PROJECT: ProjectSummary = {
  id: 3,
  slug: 'vinhomes-ocean-park-3',
  name: 'Vinhomes Ocean Park 3',
  description:
    'Theo dõi thông tin chi tiết và bảng giá, mặt bằng, tiến độ và chính sách bán hàng dự án VINHOMES OCEAN PARK 3.',
  bannerImages: Array.from({ length: 5 }, () => bannerOceanCity),
};

export const MOCK_POLICY_HTML = `
<p style="text-align: center;">
  <img src="${policyImage}" alt="Chính sách bán hàng Vinhomes Ocean Park 3" width="1200" height="1265" />
</p>

<h2 style="text-align: center; color: #c2410c;">CHÍNH SÁCH BÁN HÀNG PHÂN KHU THỜI ĐẠI</h2>
<p style="text-align: center;"><em>(Áp dụng từ 18/05/2024)</em></p>

<p style="text-align: justify;">
  Chính sách áp dụng cho khách hàng ký <strong>Hợp đồng mua bán</strong> các sản phẩm thấp tầng thuộc phân khu
  <strong><em>Thời Đại</em></strong> và <u>Vịnh Thiên Đường</u>. Mức chiết khấu được tính trên
  <span style="color: #dc2626; font-weight: 700;">giá trước VAT và KPBT</span>.
</p>

<h3>1. Khách hàng không vay ngân hàng</h3>
<table>
  <thead>
    <tr>
      <th>Phương thức thanh toán</th>
      <th>Chiết khấu</th>
      <th>Ghi chú</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Thanh toán theo tiến độ</td>
      <td style="text-align: center;"><span style="font-size: 20px; color: #ea580c;"><strong>5%</strong></span></td>
      <td>Theo tiến độ chuẩn của chủ đầu tư</td>
    </tr>
    <tr>
      <td>Thanh toán sớm 100%</td>
      <td style="text-align: center;"><span style="font-size: 20px; color: #ea580c;"><strong>11.5%</strong></span></td>
      <td>Thanh toán 95% giá trị trong 30 ngày</td>
    </tr>
    <tr>
      <td>Thanh toán sớm từng phần</td>
      <td style="text-align: center;"><span style="font-size: 20px; color: #ea580c;"><strong>11%</strong></span></td>
      <td>Chiết khấu dòng tiền theo từng đợt</td>
    </tr>
  </tbody>
</table>

<h3>2. Khách hàng vay ngân hàng</h3>
<ul>
  <li>Hỗ trợ vay tối đa <strong>70%</strong> giá trị biệt thự.</li>
  <li>Hỗ trợ lãi suất <strong>0%</strong> trong <strong>24 tháng</strong> <em>(không muộn hơn 10/06/2026)</em>.</li>
  <li>Ân hạn nợ gốc đến khi nhận bàn giao.</li>
</ul>

<h3>3. Chương trình khách hàng thân thiết</h3>
<p><span style="font-size: 13px; color: #6b7280;">Áp dụng từ 10/05/2024 – 31/05/2024</span></p>
<ol>
  <li>Hạng <span style="color: #0891b2;"><strong>Topaz</strong></span> (Hoàng Ngọc): chiết khấu 0.5%</li>
  <li>Hạng <span style="color: #e11d48;"><strong>Ruby</strong></span> (Hồng Ngọc): chiết khấu 0.65%</li>
  <li>Hạng <span style="color: #7c3aed;"><strong>Diamond</strong></span> (Kim Cương): chiết khấu 0.85%</li>
  <li>Hạng <span style="color: #7c3aed;"><strong>Diamond Elite</strong></span> (Tinh Hoa): chiết khấu 0.85%</li>
</ol>

<p style="text-align: right;"><em>Chi tiết xem tại
  <a href="https://vinhomes.vn">website chủ đầu tư</a>.</em></p>
`;
