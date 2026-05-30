'use client';

import { useCallback } from 'react';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import { CarFilters, SortOption } from '@/lib/types';

export function useFilters(): { filters: CarFilters; setFilter: (key: keyof CarFilters, value: string | number | undefined) => void; clearFilters: () => void } {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const filters: CarFilters = {
    q: searchParams.get('q') ?? undefined,
    make: searchParams.get('make') ?? undefined,
    bodyType: searchParams.get('bodyType') ?? undefined,
    fuelType: searchParams.get('fuelType') ?? undefined,
    transmission: searchParams.get('transmission') ?? undefined,
    minPrice: searchParams.get('minPrice') ? Number(searchParams.get('minPrice')) : undefined,
    maxPrice: searchParams.get('maxPrice') ? Number(searchParams.get('maxPrice')) : undefined,
    minSeating: searchParams.get('minSeating') ? Number(searchParams.get('minSeating')) : undefined,
    minSafetyRating: searchParams.get('minSafetyRating') ? Number(searchParams.get('minSafetyRating')) : undefined,
    sort: (searchParams.get('sort') as SortOption) ?? undefined,
  };

  const setFilter = useCallback(
    (key: keyof CarFilters, value: string | number | undefined) => {
      const params = new URLSearchParams(searchParams.toString());
      if (value === undefined || value === '' || value === null) {
        params.delete(key);
      } else {
        params.set(key, String(value));
        params.delete('page');
      }
      router.push(`${pathname}?${params.toString()}`);
    },
    [searchParams, router, pathname]
  );

  const clearFilters = useCallback(() => {
    router.push(pathname);
  }, [router, pathname]);

  return { filters, setFilter, clearFilters };
}
