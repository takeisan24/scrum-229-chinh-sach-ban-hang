import { getData } from './client';
import { buildProjectSlug, slugSearchQueries } from '../lib/projectSlug';
import type { Project } from '../types/project';

/** GET /portal/projects/search — tìm theo tên, không phân biệt dấu. */
export function searchProjects(name: string, signal?: AbortSignal) {
  return getData<Project[]>('/portal/projects/search', { name, pageSize: 50 }, signal);
}

/** Tra dự án từ slug (xem slugSearchQueries). Trả null nếu không có dự án nào có slug khớp. */
export async function findProjectBySlug(slug: string, signal?: AbortSignal): Promise<Project | null> {
  for (const query of slugSearchQueries(slug)) {
    const projects = (await searchProjects(query, signal)) ?? [];
    const match = projects.find((project) => buildProjectSlug(project) === slug);
    if (match) return match;
  }
  return null;
}
