import { useEffect, useMemo, useRef, useState } from 'react';
import { sanitizeHtml } from '../lib/sanitizeHtml';
import '../styles/policy-content.css';

interface PolicyContentProps {
  html: string;
  /** Alt gan cho anh CMS de trong, vd "Chính sách bán hàng – VINHOMES HẢI VÂN BAY" */
  imageAlt?: string;
}

/**
 * Hien thi HTML chinh sach (da sanitize). Dung chung cho ban MUI va Bootstrap —
 * noi dung la HTML cua admin nen hai ban hien thi giong het nhau.
 */
export default function PolicyContent({ html, imageAlt }: PolicyContentProps) {
  const safeHtml = useMemo(() => sanitizeHtml(html, { imageAlt }), [html, imageAlt]);
  const ref = useRef<HTMLDivElement>(null);
  const [mediaLoading, setMediaLoading] = useState(true);

  // Anh CMS khong co kich thuoc san (width/height="100%") nen moi anh tai xong lai day footer xuong.
  // Giu chieu cao toi thieu (CSS .is-loading-media) den khi anh tai xong de footer o ngoai man hinh -> khong giat layout.
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

  // Noi dung khong co anh thi khong giu chieu cao (tranh khoang trang thua roi co lai)
  const holdHeight = mediaLoading && safeHtml.includes('<img');

  return (
    <div
      ref={ref}
      className={`policy-content${holdHeight ? ' is-loading-media' : ''}`}
      dangerouslySetInnerHTML={{ __html: safeHtml }}
    />
  );
}
