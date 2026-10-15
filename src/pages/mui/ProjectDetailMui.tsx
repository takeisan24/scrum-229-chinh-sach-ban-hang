import { useEffect, useRef, useState } from 'react';
import { Link as RouterLink, useLocation, useNavigate, useParams } from 'react-router-dom';
import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Link from '@mui/material/Link';
import Skeleton from '@mui/material/Skeleton';
import Typography from '@mui/material/Typography';
import { ThemeProvider } from '@mui/material/styles';
import { ApiError } from '../../api/client';
import { getProjectDetail } from '../../api/projects';
import { colors } from '../../constants/designTokens';
import {
  DEFAULT_TAB_ID,
  POLICY_TAB_ID,
  PROJECT_TABS,
  isProjectTabId,
  type ProjectTabId,
} from '../../constants/projectTabs';
import { useRequest } from '../../hooks/useRequest';
import { buildProjectSlug, parseProjectId } from '../../lib/projectSlug';
import type { ProjectDetail } from '../../types/project';
import BannerCarousel from './components/BannerCarousel';
import PolicyPanel from './components/PolicyPanel';
import ProjectTabs from './components/ProjectTabs';
import ShareButton from './components/ShareButton';
import SiteFooter from './components/SiteFooter';
import SiteHeader, { HEADER_HEIGHT } from './components/SiteHeader';
import { muiTheme } from './theme';

/** Tab dang chon luu tren hash URL de link chia se `#chinh-sach-ban-hang` mo dung tab. */
function useHashTab(): [ProjectTabId, (id: ProjectTabId) => void] {
  const { hash } = useLocation();
  const navigate = useNavigate();
  const fromHash = hash.slice(1);
  const activeTab = isProjectTabId(fromHash) ? fromHash : DEFAULT_TAB_ID;

  const setActiveTab = (id: ProjectTabId) => navigate({ hash: id }, { replace: true });
  return [activeTab, setActiveTab];
}

export default function ProjectDetailMui() {
  const { slug } = useParams();
  const projectId = parseProjectId(slug);

  return (
    <ThemeProvider theme={muiTheme}>
      <CssBaseline />
      <SiteHeader />
      {projectId === null ? <ProjectNotFound /> : <ProjectBody key={projectId} projectId={projectId} slug={slug} />}
      <SiteFooter />
    </ThemeProvider>
  );
}

function ProjectBody({ projectId, slug }: { projectId: number; slug: string | undefined }) {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useHashTab();
  const [projectState, retryProject] = useRequest(projectId, (signal) => getProjectDetail(projectId, signal));
  const tabsRef = useRef<HTMLDivElement>(null);

  // Chi tai chinh sach khi mo tab lan dau (noi dung co the nang ~800 KB), sau do giu lai khi doi tab.
  const [policyOpened, setPolicyOpened] = useState(activeTab === POLICY_TAB_ID);
  if (activeTab === POLICY_TAB_ID && !policyOpened) setPolicyOpened(true);

  const project = projectState.status === 'success' ? projectState.data : null;

  // Dua URL ve slug chuan (vd /du-an/65 -> /du-an/vinhomes-ocean-park-2-3-65) de link Chia se luon dung.
  useEffect(() => {
    if (!project) return;
    const canonical = buildProjectSlug(project);
    if (canonical !== slug) navigate({ pathname: `/du-an/${canonical}`, hash: window.location.hash }, { replace: true });
  }, [project, slug, navigate]);

  // Mo tu link chia se: trinh duyet khong tu cuon duoc vi tab render sau khi tai trang.
  useEffect(() => {
    if (isProjectTabId(window.location.hash.slice(1))) {
      tabsRef.current?.scrollIntoView({ block: 'start' });
    }
  }, []);

  if (projectState.status === 'error') {
    const notFound = projectState.error instanceof ApiError && projectState.error.code === 'RESOURCE_NOT_FOUND';
    if (notFound) return <ProjectNotFound />;
    return (
      <PageMain>
        <Alert severity="error" action={<Button color="inherit" size="small" onClick={retryProject}>Thử lại</Button>}>
          Không tải được thông tin dự án. Vui lòng thử lại.
        </Alert>
      </PageMain>
    );
  }

  const activeLabel = PROJECT_TABS.find((tab) => tab.id === activeTab)?.label;

  return (
    <PageMain>
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
        <ProjectHeading project={project} />
        <ShareButton />
      </Box>

      {project ? (
        project.fileInfo?.fullLink && <BannerCarousel images={[project.fileInfo.fullLink]} alt={project.name} />
      ) : (
        <Skeleton variant="rounded" sx={{ width: '100%', height: 'auto', aspectRatio: '1392 / 725', borderRadius: { xs: 2, md: 4 } }} />
      )}

      <Box ref={tabsRef} sx={{ scrollMarginTop: HEADER_HEIGHT + 16 }}>
        <ProjectTabs value={activeTab} onChange={setActiveTab} />
      </Box>

      <Box role="tabpanel" id={`tabpanel-${activeTab}`} aria-labelledby={`tab-${activeTab}`}>
        {policyOpened && (
          <Box hidden={activeTab !== POLICY_TAB_ID}>
            <PolicyPanel projectId={projectId} />
          </Box>
        )}
        {activeTab !== POLICY_TAB_ID && (
          // Cac tab khac nam ngoai pham vi SCRUM-229
          <Typography color="text.secondary" sx={{ py: 6, textAlign: 'center' }}>
            Nội dung tab “{activeLabel}” nằm ngoài phạm vi SCRUM-229.
          </Typography>
        )}
      </Box>
    </PageMain>
  );
}

function PageMain({ children }: { children: React.ReactNode }) {
  return (
    <Box
      component="main"
      sx={{
        maxWidth: 1440,
        mx: 'auto',
        px: { xs: 2, md: 3 },
        pt: 2,
        pb: 3,
        display: 'flex',
        flexDirection: 'column',
        gap: { xs: 3, md: 4 },
      }}
    >
      {children}
    </Box>
  );
}

function ProjectHeading({ project }: { project: ProjectDetail | null }) {
  return (
    <Box sx={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', gap: 1 }}>
      <Typography
        component="h1"
        sx={{ color: colors.primary, fontSize: { xs: 22, md: 32 }, fontWeight: 700, textTransform: 'uppercase', lineHeight: 'normal' }}
      >
        {project ? project.name : <Skeleton width="40%" />}
      </Typography>
      <Typography
        title={project?.shortDescription ?? undefined}
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
        {project ? project.shortDescription : <Skeleton width="70%" />}
      </Typography>
    </Box>
  );
}

function ProjectNotFound() {
  return (
    <PageMain>
      <Box sx={{ py: 8, textAlign: 'center' }}>
        <Typography component="h1" sx={{ fontSize: 22, fontWeight: 700, color: colors.primary, mb: 1 }}>
          Không tìm thấy dự án
        </Typography>
        <Typography color="text.secondary">Đường dẫn không đúng hoặc dự án đã bị gỡ.</Typography>
      </Box>
    </PageMain>
  );
}
