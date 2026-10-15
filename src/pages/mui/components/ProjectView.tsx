import { useEffect, useRef, useState, type ReactNode } from 'react';
import { Link as RouterLink, useLocation, useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Skeleton from '@mui/material/Skeleton';
import Typography from '@mui/material/Typography';
import { colors } from '../../../constants/designTokens';
import {
  DEFAULT_TAB_ID,
  POLICY_TAB_ID,
  PROJECT_TABS,
  isProjectTabId,
  type ProjectTabId,
} from '../../../constants/projectTabs';
import BannerCarousel from './BannerCarousel';
import ProjectTabs from './ProjectTabs';
import ShareButton from './ShareButton';
import { HEADER_HEIGHT } from './SiteHeader';

/** Du lieu trang can — trang that map tu API, trang demo lay tu mock. */
export interface ProjectViewModel {
  name: string;
  description: string | null;
  bannerImages: string[];
}

interface ProjectViewProps {
  /** null = dang tai -> hien skeleton */
  project: ProjectViewModel | null;
  /** Noi dung tab chinh sach — chi duoc goi khi mo tab lan dau */
  renderPolicy: () => ReactNode;
  /** Tab mo khi URL khong co hash */
  defaultTab?: ProjectTabId;
  /** Thong bao hien dau trang (vd danh dau trang demo) */
  notice?: ReactNode;
}

/** Tab dang chon luu tren hash URL de link chia se `#chinh-sach-ban-hang` mo dung tab. */
function useHashTab(defaultTab: ProjectTabId): [ProjectTabId, (id: ProjectTabId) => void] {
  const { hash } = useLocation();
  const navigate = useNavigate();
  const fromHash = hash.slice(1);
  const activeTab = isProjectTabId(fromHash) ? fromHash : defaultTab;

  const setActiveTab = (id: ProjectTabId) => navigate({ hash: id }, { replace: true });
  return [activeTab, setActiveTab];
}

export default function ProjectView({ project, renderPolicy, defaultTab = DEFAULT_TAB_ID, notice }: ProjectViewProps) {
  const [activeTab, setActiveTab] = useHashTab(defaultTab);
  const tabsRef = useRef<HTMLDivElement>(null);

  // Chi tai chinh sach khi mo tab lan dau (noi dung co the nang ~800 KB), sau do giu lai khi doi tab.
  const [policyOpened, setPolicyOpened] = useState(activeTab === POLICY_TAB_ID);
  if (activeTab === POLICY_TAB_ID && !policyOpened) setPolicyOpened(true);

  // Mo tu link chia se: trinh duyet khong tu cuon duoc vi tab render sau khi tai trang.
  useEffect(() => {
    if (isProjectTabId(window.location.hash.slice(1))) {
      tabsRef.current?.scrollIntoView({ block: 'start' });
    }
  }, []);

  const activeLabel = PROJECT_TABS.find((tab) => tab.id === activeTab)?.label;

  return (
    <>
      {notice}

      <Box component="nav" aria-label="breadcrumb" sx={{ display: 'flex', gap: 0.5, fontSize: 15, lineHeight: '25px' }}>
        <Link component={RouterLink} to="/du-an" underline="hover" sx={{ color: colors.primary, fontWeight: 500 }}>
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
              // Figma web: mo ta mot dong, tran thi ...
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
        project.bannerImages.length > 0 && <BannerCarousel images={project.bannerImages} alt={project.name} />
      ) : (
        <Skeleton variant="rounded" sx={{ width: '100%', height: 'auto', aspectRatio: '1392 / 725', borderRadius: { xs: 2, md: 4 } }} />
      )}

      <Box ref={tabsRef} sx={{ scrollMarginTop: HEADER_HEIGHT + 16 }}>
        <ProjectTabs value={activeTab} onChange={setActiveTab} />
      </Box>

      <Box role="tabpanel" id={`tabpanel-${activeTab}`} aria-labelledby={`tab-${activeTab}`}>
        {policyOpened && <Box hidden={activeTab !== POLICY_TAB_ID}>{renderPolicy()}</Box>}
        {activeTab !== POLICY_TAB_ID && (
          // Cac tab khac nam ngoai pham vi SCRUM-229
          <Typography color="text.secondary" sx={{ py: 6, textAlign: 'center' }}>
            Nội dung tab “{activeLabel}” nằm ngoài phạm vi SCRUM-229.
          </Typography>
        )}
      </Box>
    </>
  );
}
