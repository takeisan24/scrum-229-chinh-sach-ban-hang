import { useCallback, useEffect, useState } from 'react';

export type RequestState<T> =
  | { status: 'loading' }
  | { status: 'success'; data: T }
  | { status: 'error'; error: unknown };

/**
 * Gọi API khi `key` đổi, huỷ request cũ khi đổi trang/unmount. `retry` dùng cho nút "Thử lại".
 * `request` phải nhận AbortSignal.
 */
export function useRequest<T>(key: unknown, request: (signal: AbortSignal) => Promise<T>) {
  const [state, setState] = useState<RequestState<T>>({ status: 'loading' });
  const [attempt, setAttempt] = useState(0);

  useEffect(() => {
    const controller = new AbortController();
    setState({ status: 'loading' });
    request(controller.signal)
      .then((data) => {
        if (!controller.signal.aborted) setState({ status: 'success', data });
      })
      .catch((error) => {
        if (!controller.signal.aborted) setState({ status: 'error', error });
      });
    return () => controller.abort();
    // `request` là closure mới mỗi lần render — chỉ chạy lại khi key/attempt đổi
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key, attempt]);

  const retry = useCallback(() => setAttempt((n) => n + 1), []);
  return [state, retry] as const;
}
