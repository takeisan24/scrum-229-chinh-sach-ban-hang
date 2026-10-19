import { useEffect, useRef } from 'react';
import { PROJECT_TABS, type ProjectTabId } from '../../../constants/projectTabs';

interface BsTabsProps {
  value: ProjectTabId;
  onChange: (value: ProjectTabId) => void;
}

/** Thanh tab dạng nav-pills của Bootstrap. Mobile cuộn ngang, tự đưa tab đang chọn vào giữa. */
export default function BsTabs({ value, onChange }: BsTabsProps) {
  const listRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    const list = listRef.current;
    const active = list?.querySelector<HTMLElement>('.nav-link.active');
    if (!list || !active || list.scrollWidth <= list.clientWidth) return;
    list.scrollTo({ left: active.offsetLeft - (list.clientWidth - active.offsetWidth) / 2, behavior: 'smooth' });
  }, [value]);

  return (
    <div className="bs-tabs-bar">
      <ul ref={listRef} className="nav nav-pills bs-tabs" role="tablist" aria-label="Thông tin dự án">
        {PROJECT_TABS.map((tab) => (
          <li key={tab.id} className="nav-item" role="presentation">
            <button
              type="button"
              role="tab"
              id={`tab-${tab.id}`}
              aria-controls={tab.id === value ? `tabpanel-${tab.id}` : undefined}
              aria-selected={tab.id === value}
              className={`nav-link${tab.id === value ? ' active' : ''}`}
              onClick={() => onChange(tab.id)}
            >
              <img src={tab.icon} alt="" />
              {tab.label}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
