import { useState, useEffect, useCallback } from 'react';

/**
 * Generic data-fetching hook for the PERN API.
 *
 * @param {Function} fetcher  — async function that returns data
 * @param {Array}    deps     — re-fetch when these change (default: run once)
 *
 * @returns {{ data, loading, error, refetch }}
 *
 * @example
 *   const { data: projects, loading } = useApi(() => api.projects.getAll());
 */
export function useApi(fetcher, deps = []) {
  const [data, setData]       = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError]     = useState(null);

  const fetch = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await fetcher();
      setData(result);
    } catch (err) {
      setError(err.message || 'An error occurred');
    } finally {
      setLoading(false);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  useEffect(() => { fetch(); }, [fetch]);

  return { data, loading, error, refetch: fetch };
}

export default useApi;
