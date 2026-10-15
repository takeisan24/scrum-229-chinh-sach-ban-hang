import { getData } from './client';
import { buildProjectSlug, slugSearchQueries } from '../lib/projectSlug';
import type { Project } from '../types/project';

/** GET /portal/projects/search — tim theo ten, khong phan biet dau. */
export function searchProjects(name: string, signal?: AbortSignal) {
  return getData<Project[]>('/portal/projects/search', { name, pageSize: 50 }, signal);
}

/** Tra du an tu slug (xem slugSearchQueries). Tra null neu khong co du an nao co slug khop. */
export async function findProjectBySlug(slug: string, signal?: AbortSignal): Promise<Project | null> {
  for (const query of slugSearchQueries(slug)) {
    const projects = (await searchProjects(query, signal)) ?? [];
    const match = projects.find((project) => buildProjectSlug(project) === slug);
    if (match) return match;
  }
  return null;
}
