# 🏢 Chính Sách Bán Hàng Dự Án — SCRUM-229

[![React](https://img.shields.io/badge/React-19.x-61dafb.svg?logo=react&logoColor=black)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178c6.svg?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-7.x-646cff.svg?logo=vite&logoColor=white)](https://vitejs.dev/)
[![MUI](https://img.shields.io/badge/Material--UI-v9-007fff.svg?logo=mui&logoColor=white)](https://mui.com/)
[![Bootstrap](https://img.shields.io/badge/Bootstrap-5.3-7952b3.svg?logo=bootstrap&logoColor=white)](https://getbootstrap.com/)

Tab **"Chính sách bán hàng"** trong trang chi tiết dự án bất động sản: hiển thị nội dung chính sách do admin soạn trên CMS (đủ định dạng chữ, ảnh, bảng, danh sách, liên kết) và nút **Chia sẻ** copy link dự án mở thẳng tab chính sách. Kết nối trực tiếp API Backend UAT.

---

## 📌 Mục Lục
- [Giới Thiệu](#-giới-thiệu)
- [Công Nghệ Sử Dụng (Tech Stack)](#-công-nghệ-sử-dụng-tech-stack)
- [Cấu Trúc Thư Mục (Folder Structure)](#-cấu-trúc-thư-mục-folder-structure)
- [Các Tính Năng & Quy Chuẩn Nghiệp Vụ](#-các-tính-năng--quy-chuẩn-nghiệp-vụ)
  - [1. Nút Chia sẻ](#1-nút-chia-sẻ)
  - [2. Slug dự án](#2-slug-dự-án)
  - [3. Hiển thị nội dung chính sách](#3-hiển-thị-nội-dung-chính-sách)
  - [4. Trạng thái hiển thị](#4-trạng-thái-hiển-thị)
  - [5. Tab theo URL hash](#5-tab-theo-url-hash)
  - [6. Floating Version Switcher](#6-floating-version-switcher)
- [Danh Sách API Tích Hợp](#-danh-sách-api-tích-hợp)
- [Hướng Dẫn Cài Đặt & Chạy Dự Án](#-hướng-dẫn-cài-đặt--chạy-dự-án)

---

## 🌟 Giới Thiệu

Dự án cung cấp 2 phiên bản giao diện song song phục vụ quá trình phát triển và nghiệm thu:
1. **Phiên bản Bootstrap (`/bootstrap/du-an/:slug`)**: Dựng tĩnh theo Figma (web 1440px, mobile 402px) với dữ liệu mẫu — luôn hiển thị dự án mẫu "Vinhomes Ocean Park 3".
2. **Phiên bản MUI (`/mui/du-an/:slug`)**: Phiên bản chính thức sử dụng Material-UI, tích hợp API thật (tra dự án theo slug, lấy nội dung chính sách).

Mở `/` sẽ vào `/mui/du-an/vinhomes-ocean-park-2-3#chinh-sach-ban-hang`.

---

## 🛠 Công Nghệ Sử Dụng (Tech Stack)

- **Frontend Core**: React 19, TypeScript, Vite 7
- **UI Frameworks**:
  - **Material-UI (MUI) v9**: Giao diện chính thức, theme dựng từ token màu của Figma.
  - **Bootstrap 5.3**: Dựng tĩnh theo Figma (`nav-pills`, `btn`, `toast`, `offcanvas`), điều khiển bằng React — không dùng `bootstrap.js`.
- **HTTP Client**: Axios — header `Accept-Language`, gom lỗi Backend (HTTP 404 / `code` khác `SUCCESS`) về một kiểu `ApiError`.
- **Bảo mật nội dung**: DOMPurify — sanitize HTML từ CMS trước khi render.
- **Routing**: `react-router-dom` v7, tách code theo route (`React.lazy`).
- **Icons & ảnh**: SVG/ảnh export trực tiếp từ Figma.

---

## 📁 Cấu Trúc Thư Mục (Folder Structure)

Ký hiệu: **[CS]** tab Chính sách bán hàng · **[SH]** nút Chia sẻ (hai nhóm thuộc phạm vi SCRUM-229) · **[DA]** giả lập trang chi tiết dự án (tra slug, banner, thanh tab) · **[HF]** header / footer. Không ghi ký hiệu: bản Bootstrap và phần chung của app.

Kiến trúc, chiều phụ thuộc giữa các lớp và quy tắc code: xem [AGENTS.md](AGENTS.md).

```text
scrum-229-chinh-sach-ban-hang/
├── public/
│   └── favicon.svg                    # Icon tab trình duyệt (theo logo Figma)
├── src/
│   ├── api/                           # Gọi API Backend
│   │   ├── client.ts                  # [CS] Axios instance, getData() + ApiError
│   │   ├── contents.ts                # [CS] GET /portal/contents/get (chính sách)
│   │   └── projects.ts                # [DA] Tìm dự án theo tên, so khớp slug
│   ├── assets/figma/                  # Icon, logo, ảnh export từ Figma
│   ├── components/                    # Dùng chung cho 2 phiên bản
│   │   ├── PolicyContent.tsx          # [CS] Hiển thị HTML chính sách (sanitize + CSS chung)
│   │   └── VersionSwitcher.tsx        # Nút chuyển phiên bản MUI / Bootstrap
│   ├── constants/
│   │   ├── designTokens.ts            # Màu, gradient, shadow lấy từ biến Figma
│   │   └── projectTabs.ts             # [SH] 7 tab + icon + hash (#chinh-sach-ban-hang)
│   ├── data/
│   │   ├── site.ts                    # [HF] Nội dung header / footer, câu mô tả theo SCRUM-10
│   │   ├── mockProject.ts             # Dữ liệu tĩnh theo Figma (bản Bootstrap)
│   │   └── mockPolicyFormats.ts       # HTML mẫu đủ định dạng để test (không dùng trong app)
│   ├── hooks/
│   │   ├── useRequest.ts              # [CS] Gọi API: loading / lỗi / thử lại, huỷ request cũ
│   │   ├── useHashTab.ts              # [SH] Tab theo URL hash, cuộn tới thanh tab khi mở link chia sẻ
│   │   ├── useSnapCarousel.ts         # [DA] Logic carousel banner (scroll-snap)
│   │   └── useBootstrapStylesheet.ts  # Nạp / gỡ CSS Bootstrap theo route
│   ├── lib/
│   │   ├── sanitizeHtml.ts            # [CS] DOMPurify + bọc table để cuộn ngang
│   │   ├── share.ts                   # [SH] Tạo link chia sẻ, copy clipboard (có fallback)
│   │   ├── projectSlug.ts             # [DA] Tạo slug theo SCRUM-7, sinh cụm từ tìm kiếm
│   │   └── routes.ts                  # Đường dẫn 2 phiên bản
│   ├── pages/
│   │   ├── mui/                       # Chỉ phiên bản MUI (API thật)
│   │   │   ├── ProjectDetailMui.tsx   # [DA] Tra dự án theo slug → hiển thị
│   │   │   ├── theme.ts               # Theme MUI dựng từ token Figma
│   │   │   └── components/
│   │   │       ├── PolicyPanel.tsx    # [CS] Tab chính sách: gọi API, skeleton / lỗi / thử lại
│   │   │       ├── ShareButton.tsx    # [SH] Nút Chia sẻ + Snackbar
│   │   │       ├── ProjectView.tsx    # [DA] Tên, mô tả, banner, tab; tải chính sách khi mở tab lần đầu
│   │   │       ├── ProjectTabs.tsx    # [DA] Thanh 7 tab
│   │   │       ├── BannerCarousel.tsx # [DA] Banner ảnh dự án
│   │   │       ├── PageShell.tsx      # [HF] Khung trang + ThemeProvider
│   │   │       ├── SiteHeader.tsx     # [HF]
│   │   │       └── SiteFooter.tsx     # [HF]
│   │   └── bootstrap/                 # Chỉ phiên bản Bootstrap (UI tĩnh theo Figma)
│   │       ├── ProjectDetailBootstrap.tsx
│   │       ├── bootstrap-page.css     # Style riêng, mọi selector nằm dưới .bs-page
│   │       └── components/
│   │           ├── BsShareButton.tsx  # [SH] Nút Chia sẻ + toast
│   │           ├── BsTabs.tsx
│   │           ├── BsBanner.tsx
│   │           ├── BsHeader.tsx       # [HF]
│   │           └── BsFooter.tsx       # [HF]
│   ├── styles/
│   │   └── policy-content.css         # [CS] CSS nội dung chính sách (dùng chung)
│   ├── types/                         # Interface theo Swagger
│   │   ├── api.ts                     # [CS] BaseResponse, FileInfo
│   │   ├── content.ts                 # [CS] GetContentParams, ContentResponse
│   │   └── project.ts                 # [DA] Project
│   ├── App.tsx                        # Route 2 phiên bản, tách code theo route (React.lazy)
│   ├── main.tsx                       # Điểm khởi chạy
│   └── index.css                      # CSS nền chung
├── AGENTS.md                          # Kiến trúc & quy tắc code (cho người và AI agent)
├── CLAUDE.md                          # Trỏ sang AGENTS.md
├── vite.config.ts                     # Cấu hình Vite + proxy API khi chạy local
├── .env.example                       # Mẫu biến môi trường (không bắt buộc)
└── package.json, tsconfig*.json, eslint.config.js, index.html
```

---

## 📋 Các Tính Năng & Quy Chuẩn Nghiệp Vụ

### 1. Nút Chia sẻ
- Copy link dự án theo slug kèm tab: `{origin}/{phiên-bản}/du-an/{slug}#chinh-sach-ban-hang`, hiển thị thông báo "Đã sao chép liên kết chính sách bán hàng".
- Mở link chia sẻ sẽ **vào thẳng tab Chính sách bán hàng** và tự cuộn tới thanh tab.
- Trang chạy trên HTTP (không có `navigator.clipboard`) vẫn copy được nhờ cơ chế dự phòng.

### 2. Slug dự án
Theo quy ước SCRUM-7: **tên dự án tiếng Việt → không dấu, khoảng trắng thay bằng `-`** (xem [src/lib/projectSlug.ts](src/lib/projectSlug.ts)).

| Tên dự án | Slug |
| :--- | :--- |
| VINHOMES OCEAN PARK 2 & 3 | `vinhomes-ocean-park-2-3` |
| VINHOMES HẢI VÂN BAY | `vinhomes-hai-van-bay` |
| [AI] Vin Cần giờ khu B | `ai-vin-can-gio-khu-b` |

- Backend chưa có API tra dự án theo slug → tìm bằng `/portal/projects/search?name=` (không phân biệt dấu) rồi chọn dự án có slug **khớp chính xác**. Tên có ký tự đặc biệt (`&`, `[AI]`) được thử thêm vài cụm từ ngắn hơn.
- URL viết hoa hoặc có dấu (`/du-an/VINHOMES-HẢI-VÂN-BAY`) tự chuẩn hoá về slug đúng.

### 3. Hiển thị nội dung chính sách
- Nội dung là **HTML từ trình soạn thảo CMS** (Figma admin: "Thêm mới phân khu" > tab Chính sách — thanh công cụ cỡ chữ, màu, B/I/U/S, căn lề, list, ảnh, link). FE giữ nguyên định dạng admin nhập: text, **bold**, *italic*, màu, cỡ chữ, ảnh, bảng, căn lề, list, link.
- HTML được **sanitize bằng DOMPurify** trước khi render; link mở tab mới (`noopener noreferrer`); ảnh tải lazy; bảng rộng cuộn ngang trong khung riêng trên mobile.
- `fileInfoList` của API bị bỏ qua vì trùng với ảnh đã có trong HTML.
- Bản MUI hiển thị bài viết đúng như CMS trả về; Figma chỉ là chuẩn cho bản Bootstrap (dữ liệu tĩnh).
- Hai phiên bản dùng chung `PolicyContent` + `policy-content.css` để hiển thị **giống hệt nhau** (MUI/Bootstrap chỉ quyết định phần khung trang).

### 4. Trạng thái hiển thị
| Tình huống | Hiển thị |
| :--- | :--- |
| Đang tải | Khung chờ (skeleton), giữ chỗ để trang không bị giật |
| Dự án chưa có chính sách (`data: null`) | "Chính sách bán hàng của dự án đang được cập nhật." |
| Lỗi mạng / API | Thông báo lỗi + nút **Thử lại** |
| Slug không tồn tại | "Không tìm thấy dự án" |

### 5. Tab theo URL hash
- 7 tab theo Figma, mỗi tab ứng với một hash: `#tong-quan`, `#vi-tri`, `#phan-khu`, `#mat-bang-quy-can`, `#quy-can`, `#chinh-sach-ban-hang`, `#tin-tuc`.
- Không có hash → mở tab Tổng quan. Các tab ngoài phạm vi ticket hiển thị ghi chú.
- Nội dung chính sách chỉ tải khi mở tab lần đầu và được giữ lại khi chuyển tab.

### 6. Floating Version Switcher
- Nút chuyển phiên bản nổi ở góc phải dưới, chuyển 1-click giữa MUI & Bootstrap, giữ nguyên slug và tab.
- Tách code theo route: vào bản nào chỉ tải JS/CSS của bản đó. CSS Bootstrap chỉ nạp khi vào route Bootstrap và được gỡ khi rời trang → không đè lên MUI.
- Link nội bộ (logo, menu, breadcrumb, footer) giữ nguyên phiên bản đang xem.

---

## 🌐 Danh Sách API Tích Hợp

Base URL (UAT): `https://api-uat.vinhomes.biz.vn/hovixi/api/v1` — khi chạy local đi qua proxy Vite (`/hovixi`) vì UAT chặn CORS từ `localhost`. Header chung: `Accept-Language: vi`.

**Tab Chính sách bán hàng (phạm vi SCRUM-229) chỉ dùng 1 API:**

| Chức năng | Endpoint | Method | Tham số / Mô tả |
| :--- | :--- | :---: | :--- |
| **Nội dung chính sách** | `/portal/contents/get` | `GET` | `refId` (id dự án), `refType=PROJECT`, `contentType=POLICY` → `data.content` là bài viết RichText (HTML gồm chữ + ảnh), hoặc `data: null` khi dự án chưa có chính sách |

Response thực tế khớp schema Swagger; các trường có thể `null`: `data`, `data.embedLocation`, `debug` (object khi lỗi), `pageNumber`/`pageSize`/`totalElements`/`totalPages`. Tham số sai → HTTP 400 `VALIDATION_FAILED`.

**Giả lập trang chi tiết dự án (ngoài phạm vi ticket):** trên site thật, `projectId` và tên dự án do trang chi tiết dự án cung cấp (SCRUM-10 dùng `/portal/projects/detail`). Repo này chạy độc lập và URL chỉ có slug (SCRUM-7), nên bản MUI dùng thêm:

| Chức năng | Endpoint | Method | Tham số / Mô tả |
| :--- | :--- | :---: | :--- |
| Đổi slug → `projectId` + tên + banner | `/portal/projects/search` | `GET` | `name`, `pageSize=50` → chọn dự án có slug khớp chính xác |

Mô tả dưới tên dự án theo SCRUM-10: *"Theo dõi thông tin chi tiết và bảng giá, mặt bằng, tiến độ và chính sách bán hàng dự án" + tên dự án*.

---

## 🚀 Hướng Dẫn Cài Đặt & Chạy Dự Án

### 1. Yêu cầu môi trường
- **Node.js**: `^20.19` hoặc `>=22.12` (yêu cầu của Vite 7)
- **Trình quản lý gói**: `npm`

### 2. Cài đặt thư viện
```bash
npm install
```

### 3. Chạy môi trường phát triển (Development)
```bash
npm run dev
```
Truy cập ứng dụng tại: `http://localhost:5173` — không cần file `.env`.

### 4. Kiểm tra & Đóng gói sản phẩm (Production Build)
```bash
# Kiểm tra lint và TypeScript
npm run lint
npx tsc -b

# Đóng gói bundle tối ưu hoá
npm run build

# Chạy thử bản build (vẫn đi qua proxy API)
npm run preview      # http://localhost:4173
```

### 5. Link kiểm tra nhanh (bản MUI)
| Link | Kết quả mong đợi |
| :--- | :--- |
| `/mui/du-an/vinhomes-ocean-park-2-3#chinh-sach-ban-hang` | Chính sách dạng ảnh |
| `/mui/du-an/vinhomes-hai-van-bay#chinh-sach-ban-hang` | Chữ có định dạng + ảnh |
| `/mui/du-an/vinhomes-global-gate-ha-long#chinh-sach-ban-hang` | "Đang được cập nhật" |
| `/mui/du-an/khong-ton-tai` | "Không tìm thấy dự án" |

---

## 👥 Thông Tin Dự Án
- **Ticket**: SCRUM-229 — [EndUser][Chi tiết dự án] Tab "Chính sách bán hàng" trong mỗi dự án
- **Frontend Developer**: takeisan24
- **Phiên bản**: 1.0.0
