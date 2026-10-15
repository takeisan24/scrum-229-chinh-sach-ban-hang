import type { FileInfo } from './api';

/** Mot du an trong ket qua GET /portal/projects/search — chi giu cac truong FE dung. */
export interface Project {
  id: number;
  code: string;
  name: string;
  shortDescription: string | null;
  /** Anh dai dien du an — dung lam banner */
  fileInfo: FileInfo | null;
}
