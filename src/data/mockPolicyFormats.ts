import bannerOceanCity from '../assets/figma/banner-ocean-city.jpg';
import policyImage from '../assets/figma/policy-vinhomes-ocean-park-3.jpg';

/**
 * Trang demo dinh dang — DU LIEU GIA, khong lay tu API.
 * Muc dich: chung minh FE hien thi du cac kieu ma task yeu cau (bold, italic, mau, size,
 * anh, table, can le, list, link) trong khi du lieu that tren UAT moi chi co anh.
 *
 * HTML viet theo dung kieu trinh soan thao CMS that sinh ra (doi chieu du an 7 tren UAT):
 * style inline, <span style="font-size">, ky tu Viet ma hoa (&Aacute;...), anh width/height 100%.
 */
export const FORMAT_DEMO_SLUG = 'demo-dinh-dang';

export const FORMAT_DEMO_PROJECT = {
  name: 'Trang demo định dạng chính sách',
  description: 'Dữ liệu giả để kiểm tra hiển thị đủ các kiểu định dạng của nội dung chính sách bán hàng.',
  bannerImages: [bannerOceanCity],
};

export const FORMAT_DEMO_POLICY_HTML = `<h2 style="text-align: center;"><span style="color: #c0392b; font-size: 26px;"><strong>CH&Iacute;NH S&Aacute;CH B&Aacute;N H&Agrave;NG MẪU</strong></span></h2>
<p style="text-align: center;"><em>(&Aacute;p dụng từ 01/10/2026 đến 31/12/2026 &ndash; dữ liệu giả)</em></p>
<h3>1. Định dạng chữ</h3>
<p>Chữ thường, <strong>chữ đậm</strong>, <em>chữ nghi&ecirc;ng</em>, <span style="text-decoration: underline;">gạch ch&acirc;n</span>, <span style="text-decoration: line-through;">gạch ngang</span>, <strong><em>đậm v&agrave; nghi&ecirc;ng</em></strong>.</p>
<p>M&agrave;u chữ: <span style="color: #e03e2d;">đỏ</span>, <span style="color: #169179;">xanh l&aacute;</span>, <span style="color: #3598db;">xanh dương</span>, <span style="color: #e67e23;">cam</span>. M&agrave;u nền: <span style="background-color: #fbeeb8;">t&ocirc; v&agrave;ng</span>, <span style="background-color: #c2e0f4;">t&ocirc; xanh</span>.</p>
<p>Cỡ chữ: <span style="font-size: 12px;">12px</span> &middot; <span style="font-size: 16px;">16px</span> &middot; <span style="font-size: 20px;">20px</span> &middot; <span style="font-size: 28px;">28px</span> &middot; <span style="font-size: 36px;">36px</span></p>
<p><span style="font-size: 18px;">Chiết khấu l&ecirc;n tới <strong><span style="color: #e03e2d; font-size: 28px;">11.5%</span></strong> gi&aacute; trước VAT v&agrave; KPBT.</span></p>
<h3>2. Căn lề</h3>
<p style="text-align: left;">Căn tr&aacute;i: Ch&iacute;nh s&aacute;ch &aacute;p dụng cho kh&aacute;ch h&agrave;ng k&yacute; Hợp đồng mua b&aacute;n trong thời gian triển khai.</p>
<p style="text-align: center;">Căn giữa: Ưu đ&atilde;i đặc biệt d&agrave;nh cho kh&aacute;ch h&agrave;ng th&acirc;n thiết.</p>
<p style="text-align: right;">Căn phải: Chủ đầu tư bảo lưu quyền thay đổi ch&iacute;nh s&aacute;ch.</p>
<p style="text-align: justify;">Căn đều hai b&ecirc;n: Kh&aacute;ch h&agrave;ng thanh to&aacute;n sớm được hưởng chiết khấu theo tỷ lệ tương ứng với số tiền v&agrave; thời gian thanh to&aacute;n trước hạn. Mức chiết khấu được t&iacute;nh tr&ecirc;n gi&aacute; trước thuế VAT v&agrave; kinh ph&iacute; bảo tr&igrave;, kh&ocirc;ng &aacute;p dụng đồng thời với c&aacute;c chương tr&igrave;nh kh&aacute;c trừ khi c&oacute; th&ocirc;ng b&aacute;o ri&ecirc;ng.</p>
<h3>3. Danh s&aacute;ch</h3>
<ul>
<li>Hỗ trợ vay tối đa <strong>70%</strong> gi&aacute; trị biệt thự.</li>
<li>Hỗ trợ l&atilde;i suất <strong>0%</strong> trong <strong>24 th&aacute;ng</strong>:
<ul>
<li>&Aacute;p dụng với ng&acirc;n h&agrave;ng li&ecirc;n kết.</li>
<li>Kh&ocirc;ng muộn hơn 10/06/2026.</li>
</ul>
</li>
<li>&Acirc;n hạn nợ gốc đến khi nhận b&agrave;n giao.</li>
</ul>
<ol>
<li>Hạng <span style="color: #169179;"><strong>Topaz</strong></span>: chiết khấu 0.5%</li>
<li>Hạng <span style="color: #e03e2d;"><strong>Ruby</strong></span>: chiết khấu 0.65%</li>
<li>Hạng <span style="color: #843fa1;"><strong>Diamond</strong></span>: chiết khấu 0.85%</li>
</ol>
<h3>4. Li&ecirc;n kết</h3>
<p>Xem th&ecirc;m tại <a href="https://vinhomes.vn">website chủ đầu tư</a> hoặc gọi hotline <a href="tel:0972729999">0972 72 9999</a>.</p>
<h3>5. Bảng</h3>
<table style="border-collapse: collapse; width: 100%;" border="1">
<colgroup><col style="width: 40%;"><col style="width: 20%;"><col style="width: 40%;"></colgroup>
<thead>
<tr><th>Phương thức thanh to&aacute;n</th><th style="text-align: center;">Chiết khấu</th><th>Ghi ch&uacute;</th></tr>
</thead>
<tbody>
<tr><td>Thanh to&aacute;n theo tiến độ</td><td style="text-align: center;"><span style="color: #e67e23; font-size: 20px;"><strong>5%</strong></span></td><td>Theo tiến độ chuẩn của chủ đầu tư</td></tr>
<tr><td>Thanh to&aacute;n sớm 100%</td><td style="text-align: center;"><span style="color: #e67e23; font-size: 20px;"><strong>11.5%</strong></span></td><td>Thanh to&aacute;n 95% gi&aacute; trị trong 30 ng&agrave;y</td></tr>
<tr><td>Thanh to&aacute;n sớm từng phần</td><td style="text-align: center;"><span style="color: #e67e23; font-size: 20px;"><strong>11%</strong></span></td><td>Chiết khấu d&ograve;ng tiền theo từng đợt</td></tr>
</tbody>
</table>
<p>Bảng nhiều cột (tr&ecirc;n mobile cuộn ngang trong khung, kh&ocirc;ng l&agrave;m vỡ trang):</p>
<table style="border-collapse: collapse; width: 100%;" border="1">
<tbody>
<tr><td><strong>Căn</strong></td><td><strong>Loại h&igrave;nh</strong></td><td><strong>Diện t&iacute;ch đất</strong></td><td><strong>Diện t&iacute;ch s&agrave;n</strong></td><td><strong>Hướng</strong></td><td><strong>Gi&aacute; trước VAT</strong></td><td><strong>Chiết khấu</strong></td><td><strong>Gi&aacute; sau chiết khấu</strong></td></tr>
<tr><td>TK-51</td><td>Liền kề</td><td>100 m&sup2;</td><td>322.8 m&sup2;</td><td>Đ&ocirc;ng Nam</td><td>9.717 tỷ</td><td>11.5%</td><td>8.600 tỷ</td></tr>
<tr><td>TK-39</td><td>Liền kề</td><td>100 m&sup2;</td><td>322.8 m&sup2;</td><td>T&acirc;y Bắc</td><td>9.717 tỷ</td><td>5%</td><td>9.231 tỷ</td></tr>
</tbody>
</table>
<h3>6. Ảnh</h3>
<p><img src="${policyImage}" alt="" width="100%" height="100%"></p>
<p>&nbsp;</p>`;
