import type { FileInfo } from './api';

/** Một dự án trong kết quả GET /portal/projects/search — chỉ giữ các trường FE dùng. */
export interface Project {
  id: number;
  code: string;
  name: string;
  /** Ảnh đại diện dự án — dùng làm banner */
  fileInfo: FileInfo | null;
}
