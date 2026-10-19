# SCRUM-229 — Tab "Chính sách bán hàng" và nút Chia sẻ

> **Status**: Implemented — spec viết bù ngày 19/10/2026, mô tả đúng hành vi đã có trong code (commit `15b6083`)
> **Stack**: React 19, TypeScript, Vite 7, MUI v9 (bản chính), Bootstrap 5.3 (bản tĩnh), Axios, DOMPurify — xem [AGENTS.md](../AGENTS.md)
> **Ticket**: SCRUM-229 — [EndUser][Chi tiết dự án] Tab "Chính sách bán hàng" trong mỗi dự án

Spec viết sau khi làm xong. Mỗi hành vi kèm vị trí trong code để đối chiếu (`/spec-check`).
Những điểm chưa đạt hoặc còn mở nằm ở mục **Khoảng trống đã biết** cuối file.

## Overview

**Goal**: Người xem trang chi tiết dự án đọc được chính sách bán hàng do admin soạn trên CMS, đúng định dạng admin đặt, và chia sẻ được link mở thẳng vào tab này.
**Trigger**: Người dùng bấm tab "Chính sách bán hàng", hoặc mở link có `#chinh-sach-ban-hang`.
**Users affected**: Khách xem website (không cần đăng nhập). Gián tiếp: admin soạn chính sách trên CMS.

**Phạm vi ticket**: nút Chia sẻ + hiển thị nội dung từ `GET /portal/contents/get`.
**Ngoài phạm vi (dựng thêm để repo chạy độc lập)**: header, footer, banner, 6 tab còn lại, tra slug → mã dự án.

---

## Acceptance Criteria

- [x] Mở tab Chính sách → gọi `GET /portal/contents/get?refId={projectId}&refType=PROJECT&contentType=POLICY` và hiển thị `data.content`
  — `src/api/contents.ts:8-11`
- [x] Hiển thị đủ định dạng của ticket: Text, Format chữ (bold, italic, gạch chân, màu, cỡ chữ), Ảnh, table, Căn lề, list, link
  — `src/lib/sanitizeHtml.ts:45` giữ thuộc tính `style`; `src/styles/policy-content.css` không đè màu/cỡ/căn lề
- [x] Nút **Chia sẻ** copy link `{origin}{đường dẫn slug}#chinh-sach-ban-hang` và báo kết quả
  — `src/lib/share.ts:4-7`, `src/pages/mui/components/ShareButton.tsx:16-20`
- [x] Mở link đã chia sẻ → vào thẳng tab Chính sách và cuộn tới thanh tab
  — `src/hooks/useHashTab.ts:9-10, 18-24`
- [x] Dự án chưa có chính sách (`data: null` hoặc nội dung rỗng) → thông báo "đang được cập nhật"
  — `src/components/PolicyContent.tsx:44-46`, `src/lib/sanitizeHtml.ts:60-62`
- [x] Nội dung HTML được làm sạch trước khi hiển thị; không chạy được script, không phủ kín trang
  — `src/lib/sanitizeHtml.ts:11-33`
- [x] Bảng rộng cuộn ngang trong khung riêng trên điện thoại, trang không tràn ngang
  — `src/lib/sanitizeHtml.ts:47-52`, `src/styles/policy-content.css:60-64`
- [x] Bản MUI và bản Bootstrap hiển thị nội dung giống nhau (dùng chung `PolicyContent`)
- [x] Hiển thị tốt ở 1440px (web) và 402px (mobile) theo Figma (node `135:3696`, `247:10789`)

---

## S1: Error States & Validation

| Scenario | Expected Behavior | Code |
|----------|------------------|------|
| Chưa đăng nhập / hết phiên | Không áp dụng: API portal không yêu cầu đăng nhập | — |
| Dự án chưa có chính sách (`data: null`) | Hiện "Chính sách bán hàng của dự án đang được cập nhật." | `PolicyContent.tsx:44-46` |
| Nội dung chỉ có khoảng trắng (`<p>&nbsp;</p>` khi admin xoá hết) | Coi như rỗng → cùng thông báo "đang được cập nhật" | `sanitizeHtml.ts:60-62` |
| Lỗi mạng / API lỗi / quá 15 giây | Hiện "Không tải được chính sách bán hàng. Vui lòng thử lại." + nút **Thử lại**; bấm thì gọi lại | `PolicyPanel.tsx:30-41`, `client.ts:6` |
| BE trả `code ≠ SUCCESS` (HTTP 200) hoặc HTTP 4xx/5xx | Gom về một lỗi `ApiError` → cùng giao diện lỗi + Thử lại | `client.ts:24-35` |
| Vượt giới hạn ~100 request/phút (HTTP 429) | Như lỗi API: thông báo + Thử lại | `client.ts:30-32` |
| Slug không khớp dự án nào | Hiện "Không tìm thấy dự án" + "Đường dẫn không đúng hoặc dự án đã bị gỡ." | `ProjectDetailMui.tsx:52, 63-71` |
| Slug rỗng | "Không tìm thấy dự án", không gọi API | `ProjectDetailMui.tsx:29` |
| URL viết hoa / có dấu (`/du-an/VINHOMES-HẢI-VÂN-BAY`) | Tự chuyển về slug chuẩn, giữ nguyên `#tab`, thay lịch sử (Back không về URL sai) | `ProjectDetailMui.tsx:23-26` |
| Lỗi khi tra dự án | "Không tải được thông tin dự án. Vui lòng thử lại." + Thử lại | `ProjectDetailMui.tsx:44-50` |
| Hash lạ (`#abc`) hoặc không có hash | Mở tab Tổng quan | `useHashTab.ts:10` |
| HTML có `<script>`, thuộc tính `on*`, `javascript:` | Bị DOMPurify loại bỏ | `sanitizeHtml.ts:45` |
| HTML có `<style>`, `<form>`, `<input>`, `<button>`... | Bị loại bỏ (có thể đè CSS toàn app / giả mạo form) | `sanitizeHtml.ts:11` |
| Inline `position: fixed/absolute/sticky`, `z-index` | Bị gỡ để nội dung không phủ lên trang | `sanitizeHtml.ts:13-20` |
| Link `http(s)` | Mở tab mới, `rel="noopener noreferrer"` | `sanitizeHtml.ts:22-28` |
| Link neo `#`, `mailto:`, `tel:` | Giữ hành vi mặc định, không mở tab mới | `sanitizeHtml.ts:26-28` |
| Ảnh CMS `alt=""` | Gán alt "Chính sách bán hàng – {tên dự án}" | `sanitizeHtml.ts:54-58`, `PolicyPanel.tsx:42` |
| Ảnh CMS `height="100%"` | Ép `height: auto` để không méo | `policy-content.css:38-42` |
| Ảnh lỗi tải | Vẫn bỏ giữ chiều cao khi mọi ảnh xong (load hoặc error) | `PolicyContent.tsx:31-39` |
| Copy bị trình duyệt chặn / trang chạy HTTP | Thử cách dự phòng (`textarea` + `execCommand`); vẫn lỗi → "Không sao chép được liên kết, vui lòng thử lại" | `share.ts:13-41`, `ShareButton.tsx:66-68` |
| Xung đột chỉnh sửa đồng thời | Không áp dụng: tính năng chỉ đọc | — |

---

## S2: Post-Completion Flow

| Event | Result | Code |
|-------|--------|------|
| Tải chính sách thành công | Hiển thị nội dung; trong lúc ảnh tải, vùng nội dung giữ cao tối thiểu 1 màn hình để footer không nhảy | `PolicyContent.tsx:22-42, 49` |
| Bấm Chia sẻ thành công | Thông báo "Đã sao chép liên kết chính sách bán hàng", tự tắt sau 3 giây; bấm lại thì đếm lại 3 giây | `ShareButton.tsx:51-70`, `BsShareButton.tsx:14-17` |
| Copy xong bằng cách dự phòng | Trả focus về nút Chia sẻ (người dùng bàn phím không mất vị trí) | `share.ts:24, 40` |
| Chuyển sang tab khác rồi quay lại | Nội dung giữ nguyên (chỉ ẩn), không gọi lại API | `ProjectView.tsx:35-36, 99` |
| Đổi tab | Cập nhật hash, giữ query string (`?utm_source=...`), không thêm lịch sử | `useHashTab.ts:13` |
| Rời trang khi đang tải | Huỷ request; kết quả cũ không ghi đè trang mới | `useRequest.ts:16-26` |
| Chuyển sang dự án khác | Trạng thái cũ bị xoá (`key={slug}`), tra và tải lại từ đầu | `ProjectDetailMui.tsx:29` |
| Tải lại trang (F5) | Hash giữ trên URL → mở lại đúng tab, gọi API lại | `useHashTab.ts:9-10` |
| Hết phiên | Không áp dụng (không đăng nhập) | — |
| Giới hạn đầu ra | Không giới hạn độ dài nội dung; nội dung hiển thị trong khung tối đa 1200px | `policy-content.css:8` |

---

## S3: Cross-Feature Integration

| When This Happens | This Feature | Triggers / Updates |
|-------------------|-------------|-------------------|
| Trang chi tiết dự án có `projectId` (site thật: do trang cha truyền; repo này: tra từ slug qua `/portal/projects/search`) | → | `PolicyPanel` gọi `contents/get` với `refId = projectId` |
| Người dùng mở tab Chính sách lần đầu | → | Mount `PolicyPanel` → gọi API (trước đó không gọi) |
| Admin lưu bài chính sách trên CMS | → | Lần mở tab tiếp theo hiển thị bài mới (không có bộ nhớ đệm giữa các lần tải trang) |
| Bấm Chia sẻ | → | Link trong clipboard; người nhận mở → tab Chính sách của đúng dự án |
| `VersionSwitcher` chuyển MUI ↔ Bootstrap | → | Giữ slug + hash → vẫn ở tab Chính sách |
| Header / footer / breadcrumb | → | Link nội bộ giữ nguyên phiên bản đang xem (`lib/routes.ts:17-19`) |

**Shared state**: tab đang mở nằm trên URL hash (`useHashTab`). Dự án hiện tại do `ProjectDetailMui` truyền xuống qua prop `projectId`, `projectName`. Không có store toàn cục.
**API dùng chung**: `contents/get` cũng phục vụ `OVERVIEW` (tab Tổng quan, SCRUM-10) và `LOCATION` (tab Vị trí, SCRUM-11) → các tab đó dùng lại được `PolicyContent` + `sanitizeHtml`.
**Bỏ qua có chủ đích**: `fileInfoList` của `contents/get` không hiển thị vì trùng với ảnh đã nhúng trong `content`.
**Empty state**: chưa có `projectId` (đang tra dự án) → hiện khung chờ ở vị trí tab chính sách (`ProjectDetailMui.tsx:58`).
**Cleanup**: rời trang hoặc đổi dự án → huỷ request đang chạy, xoá trạng thái; CSS Bootstrap được gỡ khi rời bản Bootstrap (`useBootstrapStylesheet.ts`).

---

## S4: Copy Review

| Chữ hiển thị | Ở đâu | Đánh giá |
|---|---|---|
| "Chia sẻ" | Nút | ✅ |
| "Đã sao chép liên kết chính sách bán hàng" | Thông báo thành công | ✅ cụ thể |
| "Không sao chép được liên kết, vui lòng thử lại" | Thông báo lỗi copy | ✅ |
| "Chính sách bán hàng của dự án đang được cập nhật." | Trạng thái rỗng | ✅ |
| "Không tải được chính sách bán hàng. Vui lòng thử lại." + "Thử lại" | Lỗi API | ✅ |
| "Không tìm thấy dự án" / "Đường dẫn không đúng hoặc dự án đã bị gỡ." | Slug sai | ✅ |
| "Không tải được thông tin dự án. Vui lòng thử lại." | Lỗi tra dự án | ✅ |
| Đang tải: khung chờ (skeleton), không có chữ; `aria-label="Đang tải chính sách bán hàng"` cho trình đọc màn hình | `PolicyPanel.tsx:18` | ✅ chấp nhận: Figma không vẽ trạng thái tải |
| "Nội dung tab “…” nằm ngoài phạm vi SCRUM-229." | 6 tab còn lại | ⚠️ thuật ngữ nội bộ, người dùng thật không hiểu — xem Khoảng trống #1 |

- [x] Không có mã lỗi kỹ thuật (HTTP 500, `VALIDATION_FAILED`) hiện ra cho người dùng
- [x] Nút và nhãn tự giải thích
- [x] Thông báo xác nhận cụ thể
- [ ] Toàn bộ chữ không có thuật ngữ nội bộ — còn câu "ngoài phạm vi SCRUM-229"

---

## S5: State & Persistence Matrix

| Data | Stored Where | Persists After Refresh? | Cleared When |
|------|-------------|------------------------|--------------|
| Tab đang mở | URL hash | Có | Đổi tab / mở URL khác |
| Slug dự án | URL path | Có | Điều hướng |
| Dự án đã tra (id, tên, banner) | State React (`useRequest`) | Không — tra lại | Đổi slug / rời trang |
| Nội dung chính sách | State React (`useRequest`), giữ khi đổi tab | Không — tải lại | Đổi dự án / rời trang |
| Đã mở tab chính sách chưa | State `policyOpened` trong `ProjectView` | Không | Đổi dự án / rời trang |
| HTML đã làm sạch | `useMemo` trong `PolicyContent` | Không | Nội dung đổi |
| Trạng thái thông báo copy | State nút Chia sẻ | Không | Sau 3 giây / bấm đóng |
| Link chia sẻ | Clipboard hệ điều hành | Có (ngoài app) | Người dùng copy thứ khác |

Không dùng `localStorage`, `sessionStorage` hay cookie.

---

## S6: Manual QA Scenarios

Chạy `npm run dev`, mở http://localhost:5173. Dữ liệu theo UAT ngày 19/10/2026.

- [ ] **Happy path — chữ + ảnh**: mở `/mui/du-an/vinhomes-hai-van-bay#chinh-sach-ban-hang` → trang cuộn tới thanh tab, tab Chính sách đang chọn, tiêu đề căn giữa cỡ 28px, bên dưới 2 ảnh vừa khung
- [ ] **Happy path — chỉ ảnh**: mở `/mui/du-an/vinhomes-ocean-park-2-3#chinh-sach-ban-hang` → khung chờ trong lúc tải, sau đó 2 ảnh poster; footer không nhảy lên xuống trong lúc ảnh tải
- [ ] **Chia sẻ**: bấm **Chia sẻ** → thông báo "Đã sao chép liên kết chính sách bán hàng" trong 3 giây; dán link sang tab mới → mở đúng dự án, đúng tab Chính sách
- [ ] **Chia sẻ qua HTTP**: chạy `npm run dev -- --host`, mở bằng IP mạng LAN trên điện thoại, bấm Chia sẻ → vẫn copy được
- [ ] **Empty state**: mở `/mui/du-an/vinhomes-global-gate-ha-long#chinh-sach-ban-hang` → "Chính sách bán hàng của dự án đang được cập nhật."
- [ ] **Không tìm thấy**: mở `/mui/du-an/khong-ton-tai` → "Không tìm thấy dự án" trong khoảng 1–2 giây
- [ ] **URL không chuẩn**: mở `/mui/du-an/VINHOMES-HẢI-VÂN-BAY#chinh-sach-ban-hang` → thanh địa chỉ đổi thành `/mui/du-an/vinhomes-hai-van-bay#chinh-sach-ban-hang`; bấm Back không quay lại URL viết hoa
- [ ] **Error — API lỗi**: DevTools → Network → Offline, mở link dự án → thông báo lỗi + **Thử lại**; bật lại mạng, bấm Thử lại → nội dung hiện ra
- [ ] **Giữ nội dung khi đổi tab**: mở tab Chính sách, chuyển sang Tổng quan rồi quay lại → nội dung hiện ngay, Network không có request `contents/get` mới
- [ ] **Không tải khi chưa mở tab**: mở `/mui/du-an/vinhomes-hai-van-bay` (không hash) → tab Tổng quan; Network không có `contents/get` cho tới khi bấm tab Chính sách
- [ ] **Đủ định dạng**: tạm render `<PolicyContent html={FORMAT_DEMO_POLICY_HTML} />` (`src/data/mockPolicyFormats.ts`) → thấy bold, italic, gạch chân, gạch ngang, màu chữ, màu nền, cỡ chữ, căn trái/giữa/phải, list chấm, list số, link (mở tab mới), table
- [ ] **Mobile**: DevTools 402px (và 375px) → nút Chia sẻ rộng hết hàng, thanh tab cuộn ngang, table nhiều cột cuộn ngang trong khung, trang không có thanh cuộn ngang
- [ ] **Tải lại giữa chừng**: đang ở tab Chính sách, bấm F5 → vẫn ở tab Chính sách của đúng dự án
- [ ] **Hai tab trình duyệt**: mở cùng link ở 2 tab → hai tab độc lập, không ảnh hưởng nhau
- [ ] **Chuyển phiên bản**: ở tab Chính sách bản MUI, bấm nút chuyển sang Bootstrap → vẫn ở tab Chính sách (bản Bootstrap luôn hiện dự án mẫu theo Figma)
- [ ] **Bàn phím**: Tab tới nút Chia sẻ, Enter → copy được, focus vẫn ở nút

---

## Khoảng trống đã biết

| # | Điểm | Mức | Ghi chú |
|---|---|---|---|
| 1 | 6 tab ngoài phạm vi hiện câu "nằm ngoài phạm vi SCRUM-229" | Thấp | Chỉ phù hợp bản demo; khi ghép vào site thật thay bằng nội dung tab thật |
| 2 | Trùng slug giữa hai dự án | Trung bình | Lấy dự án khớp đầu tiên. Cần BE đảm bảo slug duy nhất hoặc có API tra theo slug |
| 3 | Link sai tốn tới 6–8 request tìm kiếm | Thấp | Dưới 1–2 giây; tính vào giới hạn ~100 request/phút |
| 4 | Không có bộ nhớ đệm giữa các lần vào trang | Thấp | Quay lại dự án vừa xem thì tải lại (có thể tới ~800 KB) |
| 5 | Ảnh chính sách ~8 MB, ảnh base64 nhúng trong HTML | Trung bình | Tải chậm trên di động; cần BE nén ảnh / upload lên CDN thay vì base64 |
| 6 | UAT chưa có bài chính sách đủ định dạng | Trung bình | Kịch bản "Đủ định dạng" phải dùng bài mẫu `mockPolicyFormats.ts`; cần admin nhập bài thật |
| 7 | Chưa có test tự động | Trung bình | Ứng viên đầu tiên: `slugify`, `slugSearchQueries`, `sanitizeHtml` |
| 8 | Deploy cần BE mở CORS cho domain FE | Chặn deploy | Local đi qua proxy Vite |
