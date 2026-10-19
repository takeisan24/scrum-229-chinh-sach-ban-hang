import { getData } from './client';
import type { ContentResponse, GetContentParams } from '../types/content';

/**
 * Lấy nội dung chính sách bán hàng của một dự án.
 * Trả `null` khi dự án chưa có chính sách (BE trả `data: null` — 7/10 dự án trên UAT).
 */
export function getProjectPolicy(projectId: number, signal?: AbortSignal) {
  const params: GetContentParams = { refId: projectId, refType: 'PROJECT', contentType: 'POLICY' };
  return getData<ContentResponse>('/portal/contents/get', params, signal);
}
