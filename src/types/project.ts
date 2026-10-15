import type { FileInfo } from './api';

/** Swagger: response cua GET /portal/projects/detail — chi giu cac truong FE dung. */
export interface ProjectDetail {
  id: number;
  code: string;
  name: string;
  shortDescription: string | null;
  /** Anh dai dien du an — dung lam banner */
  fileInfo: FileInfo | null;
}
