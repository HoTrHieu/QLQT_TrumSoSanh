import { useEffect, useMemo, useState } from "react";

export function useQuery(fetchData) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        setData(await fetchData());
      } catch (err) {
        console.error(err);
        setError(err);
      }
      setLoading(false);
    })();
  }, [fetchData]);

  return useMemo(
    () => ({
      loading,
      error,
      data,
    }),
    [loading, error, data]
  );
}