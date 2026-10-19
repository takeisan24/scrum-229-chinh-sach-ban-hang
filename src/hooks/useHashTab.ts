import { useEffect, type RefObject } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { DEFAULT_TAB_ID, isProjectTabId, type ProjectTabId } from '../constants/projectTabs';

/** Tab đang chọn lưu trên hash URL để link chia sẻ `#chinh-sach-ban-hang` mở đúng tab. */
export function useHashTab(): [ProjectTabId, (id: ProjectTabId) => void] {
  const { hash, search } = useLocation();
  const navigate = useNavigate();
  const fromHash = hash.slice(1);
  const activeTab = isProjectTabId(fromHash) ? fromHash : DEFAULT_TAB_ID;

  // Giữ query string (vd ?utm_source=...) khi đổi tab
  const setActiveTab = (id: ProjectTabId) => navigate({ search, hash: id }, { replace: true });
  return [activeTab, setActiveTab];
}

/** Mở từ link chia sẻ: trình duyệt không tự cuộn được vì tab render sau khi tải trang -> cuộn tới thanh tab. */
export function useScrollToTabsOnLoad(tabsRef: RefObject<HTMLElement | null>) {
  useEffect(() => {
    if (isProjectTabId(window.location.hash.slice(1))) {
      tabsRef.current?.scrollIntoView({ block: 'start' });
    }
  }, [tabsRef]);
}
