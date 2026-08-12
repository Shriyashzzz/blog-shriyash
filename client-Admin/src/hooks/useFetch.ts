import { useState, useEffect } from "react";

function useFetch<T = unknown>(url: string, options = {}) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await fetch(url, { ...options, signal });

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const json = await response.json();
        setData(json);
        setError(null);
      } catch (err: unknown) {
        if (err instanceof Error && err.name !== "AbortError") {
          setError(err.message || "Something went wrong");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();

    // Cleanup function runs when url changes or component unmounts
    return () => {
      controller.abort();
    };
  }, [url]); // Re-run effect only if URL changes

  return { data, loading, error };
}

export default useFetch;
