import { useEffect, useState } from 'react';
import iconExternalLink from '../../../assets/figma/icon-external-link.svg';
import { buildPolicyShareUrl, copyToClipboard } from '../../../lib/share';

type CopyStatus = 'idle' | 'success' | 'error';

/** Nut Chia se + toast Bootstrap (tu an sau 3s). */
export default function BsShareButton() {
  const [status, setStatus] = useState<CopyStatus>('idle');

  useEffect(() => {
    if (status === 'idle') return;
    const timer = setTimeout(() => setStatus('idle'), 3000);
    return () => clearTimeout(timer);
  }, [status]);

  const handleClick = async () => {
    const ok = await copyToClipboard(buildPolicyShareUrl());
    setStatus(ok ? 'success' : 'error');
  };

  return (
    <>
      <button type="button" className="btn bs-btn-gradient flex-shrink-0" onClick={handleClick}>
        <img src={iconExternalLink} alt="" width={24} height={24} />
        Chia sẻ
      </button>

      <div className="toast-container position-fixed bottom-0 start-50 translate-middle-x p-3">
        <div
          className={`toast align-items-center border-0 ${status === 'error' ? 'text-bg-danger' : 'text-bg-success'}${status !== 'idle' ? ' show' : ''}`}
          role="status"
          aria-live="polite"
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
      </div>
    </>
  );
}
