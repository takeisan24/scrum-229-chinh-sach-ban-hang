import { useEffect, useMemo, useRef, useState } from 'react';
import { sanitizeHtml } from '../lib/sanitizeHtml';
import '../styles/policy-content.css';

interface PolicyContentProps {
  html: string;
  /** Alt gán cho ảnh CMS để trống, vd "Chính sách bán hàng – VINHOMES HẢI VÂN BAY" */
  imageAlt?: string;
}

/**
 * Hiển thị HTML chính sách (đã sanitize). Dùng chung cho bản MUI và Bootstrap —
 * nội dung là HTML của admin nên hai bản hiển thị giống hệt nhau.
 */
export default function PolicyContent({ html, imageAlt }: PolicyContentProps) {
  const safeHtml = useMemo(() => sanitizeHtml(html, { imageAlt }), [html, imageAlt]);
  const ref = useRef<HTMLDivElement>(null);
  const [mediaLoading, setMediaLoading] = useState(true);

  // Ảnh CMS không có kích thước sẵn (width/height="100%") nên mỗi ảnh tải xong lại đẩy footer xuống.
  // Giữ chiều cao tối thiểu (CSS .is-loading-media) đến khi ảnh tải xong để footer ở ngoài màn hình -> không giật layout.
  useEffect(() => {
    const pending = [...(ref.current?.querySelectorAll('img') ?? [])].filter((img) => !img.complete);
    if (pending.length === 0) {
      setMediaLoading(false);
      return;
    }
    setMediaLoading(true);
    let left = pending.length;
    const done = () => {
      left -= 1;
      if (left === 0) setMediaLoading(false);
    };
    pending.forEach((img) => {
      img.addEventListener('load', done, { once: true });
      img.addEventListener('error', done, { once: true });
    });
    return () => pending.forEach((img) => {
      img.removeEventListener('load', done);
      img.removeEventListener('error', done);
    });
  }, [safeHtml]);

  if (!safeHtml.trim()) {
    return <p className="policy-content-empty">Chính sách bán hàng của dự án đang được cập nhật.</p>;
  }

  // Nội dung không có ảnh thì không giữ chiều cao (tránh khoảng trắng thừa rồi co lại)
  const holdHeight = mediaLoading && safeHtml.includes('<img');

  return (
    <div
      ref={ref}
      className={`policy-content${holdHeight ? ' is-loading-media' : ''}`}
      dangerouslySetInnerHTML={{ __html: safeHtml }}
    />
  );
}
