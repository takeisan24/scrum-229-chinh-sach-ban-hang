import { useMemo } from 'react';
import { sanitizeHtml } from '../lib/sanitizeHtml';
import '../styles/policy-content.css';

interface PolicyContentProps {
  html: string;
}

/**
 * Hien thi HTML chinh sach (da sanitize). Dung chung cho ban MUI va Bootstrap —
 * noi dung la HTML cua admin nen hai ban hien thi giong het nhau.
 */
export default function PolicyContent({ html }: PolicyContentProps) {
  const safeHtml = useMemo(() => sanitizeHtml(html), [html]);

  if (!safeHtml.trim()) {
    return <p className="policy-content-empty">Chính sách bán hàng của dự án đang được cập nhật.</p>;
  }

  return <div className="policy-content" dangerouslySetInnerHTML={{ __html: safeHtml }} />;
}
