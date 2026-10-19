import { useRef, useState, type ReactNode } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Skeleton from '@mui/material/Skeleton';
import Typography from '@mui/material/Typography';
import { colors } from '../../../constants/designTokens';
import { POLICY_TAB_ID, PROJECT_TABS } from '../../../constants/projectTabs';
import { useHashTab, useScrollToTabsOnLoad } from '../../../hooks/useHashTab';
import { versionPath } from '../../../lib/routes';
import BannerCarousel from './BannerCarousel';
import ProjectTabs from './ProjectTabs';
import ShareButton from './ShareButton';
import { HEADER_HEIGHT } from './SiteHeader';

/** Dữ liệu trang cần — map từ API (xem ProjectDetailMui). */
export interface ProjectViewModel {
  name: string;
  description: string;
  bannerImages: string[];
}

interface ProjectViewProps {
  /** null = đang tải -> hiện skeleton */
  project: ProjectViewModel | null;
  /** Nội dung tab chính sách — chỉ được gọi khi mở tab lần đầu */
  renderPolicy: () => ReactNode;
}

export default function ProjectView({ project, renderPolicy }: ProjectViewProps) {
  const [activeTab, setActiveTab] = useHashTab();
  const tabsRef = useRef<HTMLDivElement>(null);

  // Chỉ tải chính sách khi mở tab lần đầu (nội dung có thể nặng ~800 KB), sau đó giữ lại khi đổi tab.
  const [policyOpened, setPolicyOpened] = useState(activeTab === POLICY_TAB_ID);
  if (activeTab === POLICY_TAB_ID && !policyOpened) setPolicyOpened(true);

  useScrollToTabsOnLoad(tabsRef);

  const activeLabel = PROJECT_TABS.find((tab) => tab.id === activeTab)?.label;

  return (
    <>
      <Box component="nav" aria-label="breadcrumb" sx={{ display: 'flex', gap: 0.5, fontSize: 15, lineHeight: '25px' }}>
        <Link component={RouterLink} to={versionPath('mui', '/du-an')} underline="hover" sx={{ color: colors.primary, fontWeight: 500 }}>
          Dự án
        </Link>
        <Box component="span" sx={{ color: colors.primary, fontWeight: 500 }}>/</Box>
        <Box component="span" aria-current="page" sx={{ color: colors.grey600, fontWeight: 600 }}>
          {project ? project.name : <Skeleton width={180} />}
        </Box>
      </Box>

      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          alignItems: { xs: 'stretch', md: 'flex-end' },
          gap: { xs: 2, md: 3 },
        }}
      >
        <Box sx={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', gap: 1 }}>
          <Typography
            component="h1"
            sx={{ color: colors.primary, fontSize: { xs: 22, md: 32 }, fontWeight: 700, textTransform: 'uppercase', lineHeight: 'normal' }}
          >
            {project ? project.name : <Skeleton width="40%" />}
          </Typography>
          <Typography
            title={project?.description ?? undefined}
            sx={{
              color: colors.grey500,
              fontSize: { xs: 15, md: 17 },
              fontWeight: 500,
              lineHeight: 'normal',
              // Figma web: mô tả một dòng, tràn thì ...
              whiteSpace: { md: 'nowrap' },
              overflow: { md: 'hidden' },
              textOverflow: { md: 'ellipsis' },
            }}
          >
            {project ? project.description : <Skeleton width="70%" />}
          </Typography>
        </Box>
        <ShareButton />
      </Box>

      {project ? (
        <BannerCarousel images={project.bannerImages} alt={project.name} />
      ) : (
        <Skeleton variant="rounded" sx={{ width: '100%', height: 'auto', aspectRatio: '1392 / 725', borderRadius: { xs: '8px', md: '16px' } }} />
      )}

      <Box ref={tabsRef} sx={{ scrollMarginTop: HEADER_HEIGHT + 16 }}>
        <ProjectTabs value={activeTab} onChange={setActiveTab} />
      </Box>

      <Box role="tabpanel" id={`tabpanel-${activeTab}`} aria-labelledby={`tab-${activeTab}`}>
        {policyOpened && <Box hidden={activeTab !== POLICY_TAB_ID}>{renderPolicy()}</Box>}
        {activeTab !== POLICY_TAB_ID && (
          // Các tab khác nằm ngoài phạm vi SCRUM-229
          <Typography color="text.secondary" sx={{ py: 6, textAlign: 'center' }}>
            Nội dung tab “{activeLabel}” nằm ngoài phạm vi SCRUM-229.
          </Typography>
        )}
      </Box>
    </>
  );
}
