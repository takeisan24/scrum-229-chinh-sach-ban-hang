import type { FileInfo } from './api';

/** Gia tri hop le theo Swagger GetContentRequest. */
export type ContentRefType = 'PROJECT' | 'PHASE';
export type ContentType = 'OVERVIEW' | 'LOCATION' | 'POLICY';

/** Query params cua GET /portal/contents/get. */
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
  /** HTML tu trinh soan thao CMS — BAT BUOC sanitize truoc khi render */
  content: string | null;
  /** Dung cho contentType LOCATION (nhung ban do), POLICY khong dung */
  embedLocation: string | null;
  /** Anh da upload — trung voi anh da nhung trong `content`, khong render lai */
  fileInfoList: FileInfo[] | null;
}
