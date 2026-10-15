import { getData } from './client';
import type { ProjectDetail } from '../types/project';

/** Khong tim thay du an -> BE tra HTTP 404 + code RESOURCE_NOT_FOUND (getData nem ApiError). */
export function getProjectDetail(id: number, signal?: AbortSignal) {
  return getData<ProjectDetail>('/portal/projects/detail', { id }, signal);
}
