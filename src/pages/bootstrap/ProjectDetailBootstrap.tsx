import { useRef } from 'react';
import { Link } from 'react-router-dom';
import PolicyContent from '../../components/PolicyContent';
import { POLICY_TAB_ID, PROJECT_TABS } from '../../constants/projectTabs';
import { MOCK_POLICY_HTML, MOCK_PROJECT } from '../../data/mockProject';
import { useBootstrapStylesheet } from '../../hooks/useBootstrapStylesheet';
import { useHashTab, useScrollToTabsOnLoad } from '../../hooks/useHashTab';
import { versionPath } from '../../lib/routes';
import BsBanner from './components/BsBanner';
import BsFooter from './components/BsFooter';
import BsHeader from './components/BsHeader';
import BsShareButton from './components/BsShareButton';
import BsTabs from './components/BsTabs';
import './bootstrap-page.css';

/**
 * Ban Bootstrap — UI tinh theo dung Figma (du lieu tu src/data/mockProject.ts, khong goi API).
 * Hanh vi giong ban MUI: tab theo hash, nut Chia se, noi dung chinh sach qua PolicyContent dung chung.
 */
export default function ProjectDetailBootstrap() {
  const cssReady = useBootstrapStylesheet();
  // Cho CSS Bootstrap tai xong moi render de khong nhay giao dien
  return cssReady ? <BootstrapPage /> : null;
}

function BootstrapPage() {
  const project = MOCK_PROJECT;
  const [activeTab, setActiveTab] = useHashTab();
  const tabsRef = useRef<HTMLDivElement>(null);
  useScrollToTabsOnLoad(tabsRef);

  const activeLabel = PROJECT_TABS.find((tab) => tab.id === activeTab)?.label;

  return (
    <div className="bs-page">
      <BsHeader />

      <main className="bs-main">
        <nav aria-label="breadcrumb" className="bs-breadcrumb d-flex gap-1">
          <Link to={versionPath('bootstrap', '/du-an')}>Dự án</Link>
          <span className="bs-sep">/</span>
          <span className="bs-current" aria-current="page">{project.name}</span>
        </nav>

        <div className="d-flex flex-column flex-md-row align-items-md-end gap-3 gap-md-4">
          <div className="flex-fill" style={{ minWidth: 0 }}>
            <h1 className="bs-title">{project.name}</h1>
            <p className="bs-desc" title={project.description}>{project.description}</p>
          </div>
          <BsShareButton />
        </div>

        <BsBanner images={project.bannerImages} alt={project.name} />

        <div ref={tabsRef} style={{ scrollMarginTop: 86 }}>
          <BsTabs value={activeTab} onChange={setActiveTab} />
        </div>

        <div role="tabpanel" id={`tabpanel-${activeTab}`} aria-labelledby={`tab-${activeTab}`}>
          {activeTab === POLICY_TAB_ID ? (
            <PolicyContent html={MOCK_POLICY_HTML} />
          ) : (
            // Cac tab khac nam ngoai pham vi SCRUM-229
            <p className="bs-tab-placeholder">Nội dung tab “{activeLabel}” nằm ngoài phạm vi SCRUM-229.</p>
          )}
        </div>
      </main>

      <BsFooter />
    </div>
  );
}
