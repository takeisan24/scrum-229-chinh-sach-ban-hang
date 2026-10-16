import { Navigate, useLocation, useParams } from 'react-router-dom';
import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { findProjectBySlug } from '../../api/projects';
import { colors } from '../../constants/designTokens';
import { projectDescription } from '../../data/site';
import { useRequest } from '../../hooks/useRequest';
import { slugify } from '../../lib/projectSlug';
import { projectPath } from '../../lib/routes';
import type { Project } from '../../types/project';
import PageShell from './components/PageShell';
import PolicyPanel, { PolicySkeleton } from './components/PolicyPanel';
import ProjectView, { type ProjectViewModel } from './components/ProjectView';

/** Trang chi tiet du an ban MUI — du lieu that tu API UAT. */
export default function ProjectDetailMui() {
  const { slug = '' } = useParams();
  const { hash } = useLocation();

  // Dua URL ve slug chuan (vd chu hoa, co dau) de link Chia se luon dung quy uoc.
  const normalized = slugify(slug);
  if (normalized && normalized !== slug) {
    return <Navigate to={{ pathname: projectPath('mui', normalized), hash }} replace />;
  }

  return (
    <PageShell>{normalized ? <ProjectFromApi key={slug} slug={slug} /> : <ProjectNotFound />}</PageShell>
  );
}

function toViewModel(project: Project): ProjectViewModel {
  return {
    name: project.name,
    description: projectDescription(project.name),
    bannerImages: project.fileInfo?.fullLink ? [project.fileInfo.fullLink] : [],
  };
}

function ProjectFromApi({ slug }: { slug: string }) {
  const [state, retry] = useRequest(slug, (signal) => findProjectBySlug(slug, signal));

  if (state.status === 'error') {
    return (
      <Alert severity="error" action={<Button color="inherit" size="small" onClick={retry}>Thử lại</Button>}>
        Không tải được thông tin dự án. Vui lòng thử lại.
      </Alert>
    );
  }

  if (state.status === 'success' && !state.data) return <ProjectNotFound />;

  const project = state.status === 'success' ? state.data : null;
  return (
    <ProjectView
      project={project && toViewModel(project)}
      renderPolicy={() => (project ? <PolicyPanel projectId={project.id} projectName={project.name} /> : <PolicySkeleton />)}
    />
  );
}

function ProjectNotFound() {
  return (
    <Box sx={{ py: 8, textAlign: 'center' }}>
      <Typography component="h1" sx={{ fontSize: 22, fontWeight: 700, color: colors.primary, mb: 1 }}>
        Không tìm thấy dự án
      </Typography>
      <Typography color="text.secondary">Đường dẫn không đúng hoặc dự án đã bị gỡ.</Typography>
    </Box>
  );
}
