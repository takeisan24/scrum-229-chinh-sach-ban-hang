import type { FileInfo } from './api';

/** Giá trị hợp lệ theo Swagger GetContentRequest. */
export type ContentRefType = 'PROJECT' | 'PHASE';
export type ContentType = 'OVERVIEW' | 'LOCATION' | 'POLICY';

/** Query params của GET /portal/contents/get. */
export interface GetContentParams {
  refId: number;
  refType: ContentRefType;
  contentType: ContentType;
}

/** Swagger: ContentResponse. */
export interface ContentResponse {
  id: number;
  refId: number;
  refType: string;
  contentType: string;
  /** HTML từ trình soạn thảo CMS — BẮT BUỘC sanitize trước khi render */
  content: string | null;
  /** Dùng cho contentType LOCATION (nhúng bản đồ), POLICY không dùng */
  embedLocation: string | null;
  /** Ảnh đã upload — trùng với ảnh đã nhúng trong `content`, không render lại */
  fileInfoList: FileInfo[] | null;
}
