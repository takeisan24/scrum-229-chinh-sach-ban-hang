/** Khung response chung cua BE Hovixi (Swagger: BaseResponse*). */
export interface BaseResponse<T> {
  code: string;
  message: string;
  requestId?: string;
  serverTime?: string;
  data: T | null;
}

/** Swagger: FileInfoResponse — chi giu cac truong FE dung. */
export interface FileInfo {
  id: number;
  originalName: string;
  contentType: string;
  fullLink: string;
}
