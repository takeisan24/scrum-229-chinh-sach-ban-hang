import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { ApiError } from '../../api/client';
import { getProjectDetail } from '../../api/projects';
import { colors } from '../../constants/designTokens';
import { useRequest } from '../../hooks/useRequest';
import { buildProjectSlug, parseProjectId } from '../../lib/projectSlug';
import type { ProjectDetail } from '../../types/project';
import PageShell from './components/PageShell';
import PolicyPanel from './components/PolicyPanel';
import ProjectView, { type ProjectViewModel } from './components/ProjectView';

/** Trang chi tiet du an that — du lieu tu API UAT. */
export default function ProjectDetailMui() {
  const { slug } = useParams();
  const projectId = parseProjectId(slug);

  return (
    <PageShell>
      {projectId === null ? <ProjectNotFound /> : <ProjectFromApi key={projectId} projectId={projectId} slug={slug} />}
    </PageShell>
  );
}

function toViewModel(project: ProjectDetail): ProjectViewModel {
  return {
    name: project.name,
    description: project.shortDescription,
    bannerImages: project.fileInfo?.fullLink ? [project.fileInfo.fullLink] : [],
  };
}

function ProjectFromApi({ projectId, slug }: { projectId: number; slug: string | undefined }) {
  const navigate = useNavigate();
  const [state, retry] = useRequest(projectId, (signal) => getProjectDetail(projectId, signal));
  const project = state.status === 'success' ? state.data : null;

  // Dua URL ve slug chuan (vd /du-an/65 -> /du-an/vinhomes-ocean-park-2-3-65) de link Chia se luon dung.
  useEffect(() => {
    if (!project) return;
    const canonical = buildProjectSlug(project);
    if (canonical !== slug) navigate({ pathname: `/du-an/${canonical}`, hash: window.location.hash }, { replace: true });
  }, [project, slug, navigate]);

  if (state.status === 'error') {
    if (state.error instanceof ApiError && state.error.code === 'RESOURCE_NOT_FOUND') return <ProjectNotFound />;
    return (
      <Alert severity="error" action={<Button color="inherit" size="small" onClick={retry}>Thử lại</Button>}>
        Không tải được thông tin dự án. Vui lòng thử lại.
      </Alert>
    );
  }

  return (
    <ProjectView
      project={project && toViewModel(project)}
      renderPolicy={() => <PolicyPanel projectId={projectId} />}
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
