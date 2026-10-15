import { useCallback, useEffect, useState } from 'react';

export type RequestState<T> =
  | { status: 'loading' }
  | { status: 'success'; data: T }
  | { status: 'error'; error: unknown };

/**
 * Goi API khi `key` doi, huy request cu khi doi trang/unmount. `retry` de nut "Thu lai".
 * `request` phai nhan AbortSignal.
 */
export function useRequest<T>(key: unknown, request: (signal: AbortSignal) => Promise<T>) {
  const [state, setState] = useState<RequestState<T>>({ status: 'loading' });
  const [attempt, setAttempt] = useState(0);

  useEffect(() => {
    const controller = new AbortController();
    setState({ status: 'loading' });
    request(controller.signal)
      .then((data) => setState({ status: 'success', data }))
      .catch((error) => {
        if (!controller.signal.aborted) setState({ status: 'error', error });
      });
    return () => controller.abort();
    // `request` la closure moi moi lan render — chi chay lai khi key/attempt doi
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key, attempt]);

  const retry = useCallback(() => setAttempt((n) => n + 1), []);
  return [state, retry] as const;
}
