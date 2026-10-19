/** Khung response chung của BE Hovixi (Swagger: BaseResponse*). */
export interface BaseResponse<T> {
  code: string;
  message: string;
  requestId?: string;
  serverTime?: string;
  data: T | null;
}

/** Swagger: FileInfoResponse — chỉ giữ các trường FE dùng. */
export interface FileInfo {
  id: number;
  originalName: string;
  contentType: string;
  fullLink: string;
}
