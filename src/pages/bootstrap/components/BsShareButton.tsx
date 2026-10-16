import { useEffect, useState } from 'react';
import iconExternalLink from '../../../assets/figma/icon-external-link.svg';
import { buildPolicyShareUrl, copyToClipboard } from '../../../lib/share';

type CopyStatus = 'idle' | 'success' | 'error';

/** Nut Chia se + toast Bootstrap (tu an sau 3s). */
export default function BsShareButton() {
  const [status, setStatus] = useState<CopyStatus>('idle');
  // Moi lan bam la mot thong bao moi -> dem lai 3s tu dau
  const [copyCount, setCopyCount] = useState(0);

  useEffect(() => {
    if (status === 'idle') return;
    const timer = setTimeout(() => setStatus('idle'), 3000);
    return () => clearTimeout(timer);
  }, [status, copyCount]);

  const handleClick = async () => {
    const ok = await copyToClipboard(buildPolicyShareUrl());
    setStatus(ok ? 'success' : 'error');
    setCopyCount((n) => n + 1);
  };

  return (
    <>
      <button type="button" className="btn bs-btn-gradient flex-shrink-0" onClick={handleClick}>
        <img src={iconExternalLink} alt="" width={24} height={24} />
        Chia sẻ
      </button>

      {/* Live region luon co mat; toast chen vao khi hien -> trinh doc man hinh doc duoc moi lan.
          bottom 56 + p-3: toast nam tren nut chuyen phien ban o goc duoi. */}
      <div
        className="toast-container position-fixed start-50 translate-middle-x p-3"
        style={{ bottom: 56 }}
        role="status"
        aria-live="polite"
      >
        {status !== 'idle' && (
          <div
            key={copyCount}
            className={`toast show align-items-center border-0 ${status === 'error' ? 'text-bg-danger' : 'text-bg-success'}`}
          >
            <div className="d-flex">
              <div className="toast-body">
                {status === 'error'
                  ? 'Không sao chép được liên kết, vui lòng thử lại'
                  : 'Đã sao chép liên kết chính sách bán hàng'}
              </div>
              <button
                type="button"
                className="btn-close btn-close-white me-2 m-auto"
                aria-label="Đóng"
                onClick={() => setStatus('idle')}
              />
            </div>
          </div>
        )}
      </div>
    </>
  );
}
