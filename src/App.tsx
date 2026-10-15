/**
 * Commit base chi chua phan dung chung (token, icon/anh Figma, mock, share, sanitize).
 * Giao dien nam o tung branch: feature/SCRUM-229-mui va feature/SCRUM-229-bootstrap.
 */
export default function App() {
  return (
    <main style={{ padding: 32 }}>
      <h1>SCRUM-229 — Tab Chính sách bán hàng</h1>
      <p>Đây là phần dùng chung. Checkout một trong hai nhánh để xem giao diện:</p>
      <ul>
        <li><code>feature/SCRUM-229-mui</code> — bản MUI (bản chính, sẽ ghép API)</li>
        <li><code>feature/SCRUM-229-bootstrap</code> — bản Bootstrap (UI tĩnh)</li>
      </ul>
    </main>
  );
}
