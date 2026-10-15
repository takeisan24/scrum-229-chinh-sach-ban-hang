import axios from 'axios';
import type { BaseResponse } from '../types/api';

export const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || '/hovixi/api/v1',
  timeout: 15_000,
  headers: { 'Accept-Language': 'vi' },
});

/** Loi nghiep vu BE tra ve (`code` khac SUCCESS), vd RESOURCE_NOT_FOUND. */
export class ApiError extends Error {
  readonly code: string;

  constructor(code: string, message: string) {
    super(message);
    this.code = code;
  }
}

/**
 * Lay `data` tu BaseResponse. BE bao loi bang ca HTTP status (vd 404) lan `code`,
 * nen gom ve mot kieu ApiError de UI chi can xu ly mot cho.
 */
export async function getData<T>(url: string, params: object, signal?: AbortSignal): Promise<T | null> {
  try {
    const { data } = await apiClient.get<BaseResponse<T>>(url, { params, signal });
    if (data.code !== 'SUCCESS') throw new ApiError(data.code, data.message);
    return data.data;
  } catch (error) {
    if (axios.isAxiosError<BaseResponse<unknown>>(error) && error.response?.data?.code) {
      throw new ApiError(error.response.data.code, error.response.data.message);
    }
    throw error;
  }
}
