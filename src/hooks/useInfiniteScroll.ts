"use client";

import { useState, useEffect, useCallback, useRef } from "react";

export function useInfiniteScroll<T>(
  fetchFn: (page: number) => Promise<{ items: T[]; hasMore: boolean }>,
  deps: any[] = []
) {
  const [items, setItems] = useState<T[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const observer = useRef<IntersectionObserver | null>(null);

  const lastElementRef = useCallback(
    (node: HTMLElement | null) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setPage((prev) => prev + 1);
        }
      });
      if (node) observer.current.observe(node);
    },
    [loading, hasMore]
  );

  useEffect(() => {
    setItems([]);
    setPage(1);
    setHasMore(true);
  }, deps);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);

    fetchFn(page).then((data) => {
      if (!cancelled) {
        setItems((prev) => (page === 1 ? data.items : [...prev, ...data.items]));
        setHasMore(data.hasMore);
        setLoading(false);
      }
    });

    return () => {
      cancelled = true;
    };
  }, [page, fetchFn]);

  return { items, loading, hasMore, lastElementRef };
}
