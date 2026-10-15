import { useEffect, useRef } from 'react';
import { Link as RouterLink, useLocation, useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import { ThemeProvider } from '@mui/material/styles';
import { colors } from '../../constants/designTokens';
import {
  DEFAULT_TAB_ID,
  POLICY_TAB_ID,
  PROJECT_TABS,
  isProjectTabId,
  type ProjectTabId,
} from '../../constants/projectTabs';
import { MOCK_POLICY_HTML, MOCK_PROJECT } from '../../data/mockProject';
import BannerCarousel from './components/BannerCarousel';
import PolicyContent from './components/PolicyContent';
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
  // TODO(SCRUM-229): thay mock bang du lieu that khi ghep API.
  const project = MOCK_PROJECT;
  const [activeTab, setActiveTab] = useHashTab();
  const tabsRef = useRef<HTMLDivElement>(null);

  // Mo tu link chia se: trinh duyet khong tu cuon duoc vi tab render sau khi tai trang.
  useEffect(() => {
    if (isProjectTabId(window.location.hash.slice(1))) {
      tabsRef.current?.scrollIntoView({ block: 'start' });
    }
  }, []);

  const activeLabel = PROJECT_TABS.find((tab) => tab.id === activeTab)?.label;

  return (
    <ThemeProvider theme={muiTheme}>
      <CssBaseline />
      <SiteHeader />

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
        <Box component="nav" aria-label="breadcrumb" sx={{ display: 'flex', gap: 0.5, fontSize: 15, lineHeight: '25px' }}>
          <Link component={RouterLink} to="/du-an" underline="hover" sx={{ color: colors.primary, fontWeight: 500 }}>
            Dự án
          </Link>
          <Box component="span" sx={{ color: colors.primary, fontWeight: 500 }}>/</Box>
          <Box component="span" aria-current="page" sx={{ color: colors.grey600, fontWeight: 600 }}>
            {project.name}
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
              {project.name}
            </Typography>
            <Typography
              title={project.description}
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
              {project.description}
            </Typography>
          </Box>
          <ShareButton />
        </Box>

        <BannerCarousel images={project.bannerImages} alt={project.name} />

        <Box ref={tabsRef} sx={{ scrollMarginTop: HEADER_HEIGHT + 16 }}>
          <ProjectTabs value={activeTab} onChange={setActiveTab} />
        </Box>

        <Box role="tabpanel" id={`tabpanel-${activeTab}`} aria-labelledby={`tab-${activeTab}`}>
          {activeTab === POLICY_TAB_ID ? (
            <PolicyContent html={MOCK_POLICY_HTML} />
          ) : (
            // Cac tab khac nam ngoai pham vi SCRUM-229
            <Typography color="text.secondary" sx={{ py: 6, textAlign: 'center' }}>
              Nội dung tab “{activeLabel}” nằm ngoài phạm vi SCRUM-229.
            </Typography>
          )}
        </Box>
      </Box>

      <SiteFooter />
    </ThemeProvider>
  );
}
