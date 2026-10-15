import { apiClient } from './client';
import type { ContentResponse, GetContentParams } from '../types/content';

/**
 * Lay noi dung chinh sach ban hang cua mot du an.
 *
 * TODO(SCRUM-229): chua ro endpoint dung GET hay POST — hoi BE.
 * Dang tam dung POST vi payload co 3 truong.
 */
export async function getProjectPolicy(projectId: string | number) {
  const params: GetContentParams = {
    refId: projectId,
    refType: 'PROJECT',
    contentType: 'POLICY',
  };

  const { data } = await apiClient.post<ContentResponse>('/portal/contents/get', params);
  return data;
}
