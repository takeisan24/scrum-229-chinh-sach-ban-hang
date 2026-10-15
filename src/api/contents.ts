import { getData } from './client';
import type { ContentResponse, GetContentParams } from '../types/content';

/**
 * Lay noi dung chinh sach ban hang cua mot du an.
 * Tra `null` khi du an chua co chinh sach (BE tra `data: null` — 7/10 du an tren UAT).
 */
export function getProjectPolicy(projectId: number, signal?: AbortSignal) {
  const params: GetContentParams = { refId: projectId, refType: 'PROJECT', contentType: 'POLICY' };
  return getData<ContentResponse>('/portal/contents/get', params, signal);
}
