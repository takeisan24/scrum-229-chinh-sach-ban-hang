import axios from 'axios';
import type { BaseResponse } from '../types/api';

export const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || '/hovixi/api/v1',
  timeout: 15_000,
  headers: { 'Accept-Language': 'vi' },
});

/** Lỗi nghiệp vụ BE trả về (`code` khác SUCCESS), vd RESOURCE_NOT_FOUND. */
export class ApiError extends Error {
  readonly code: string;

  constructor(code: string, message: string) {
    super(message);
    this.code = code;
  }
}

/**
 * Lấy `data` từ BaseResponse. BE báo lỗi bằng cả HTTP status (vd 404) lẫn `code`,
 * nên gom về một kiểu ApiError để UI chỉ cần xử lý một chỗ.
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
