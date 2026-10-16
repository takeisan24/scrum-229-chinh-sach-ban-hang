import { useEffect, type RefObject } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { DEFAULT_TAB_ID, isProjectTabId, type ProjectTabId } from '../constants/projectTabs';

/** Tab dang chon luu tren hash URL de link chia se `#chinh-sach-ban-hang` mo dung tab. */
export function useHashTab(): [ProjectTabId, (id: ProjectTabId) => void] {
  const { hash, search } = useLocation();
  const navigate = useNavigate();
  const fromHash = hash.slice(1);
  const activeTab = isProjectTabId(fromHash) ? fromHash : DEFAULT_TAB_ID;

  // Giu query string (vd ?utm_source=...) khi doi tab
  const setActiveTab = (id: ProjectTabId) => navigate({ search, hash: id }, { replace: true });
  return [activeTab, setActiveTab];
}

/** Mo tu link chia se: trinh duyet khong tu cuon duoc vi tab render sau khi tai trang -> cuon toi thanh tab. */
export function useScrollToTabsOnLoad(tabsRef: RefObject<HTMLElement | null>) {
  useEffect(() => {
    if (isProjectTabId(window.location.hash.slice(1))) {
      tabsRef.current?.scrollIntoView({ block: 'start' });
    }
  }, [tabsRef]);
}
