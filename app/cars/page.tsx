'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import { CarFilters, FilterOptions, SortOption, PaginatedResponse, Car } from '@/lib/types';
import CarGrid from '@/components/cars/CarGrid';
import FiltersSidebar from '@/components/cars/FiltersSidebar';
import SortBar from '@/components/cars/SortBar';
import { SlidersHorizontal } from 'lucide-react';

function CarsPageContent() {
  const searchParams  = useSearchParams();
  const router        = useRouter();
  const pathname      = usePathname();

  const [result,    setResult]    = useState<PaginatedResponse<Car> | null>(null);
  const [options,   setOptions]   = useState<FilterOptions | null>(null);
  const [loadedKey, setLoadedKey] = useState<string | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const loading = loadedKey !== searchParams.toString();

  const page = Number(searchParams.get('page') ?? 1);

  const filters: CarFilters = {
    q:               searchParams.get('q')               ?? undefined,
    make:            searchParams.get('make')            ?? undefined,
    bodyType:        searchParams.get('bodyType')        ?? undefined,
    fuelType:        searchParams.get('fuelType')        ?? undefined,
    transmission:    searchParams.get('transmission')    ?? undefined,
    minPrice:        searchParams.get('minPrice')        ? Number(searchParams.get('minPrice'))        : undefined,
    maxPrice:        searchParams.get('maxPrice')        ? Number(searchParams.get('maxPrice'))        : undefined,
    minSeating:      searchParams.get('minSeating')      ? Number(searchParams.get('minSeating'))      : undefined,
    minSafetyRating: searchParams.get('minSafetyRating') ? Number(searchParams.get('minSafetyRating')) : undefined,
    sort:            (searchParams.get('sort') as SortOption) ?? undefined,
  };

  function setParam(key: string, value: string | number | undefined) {
    const params = new URLSearchParams(searchParams.toString());
    if (value === undefined || value === '') {
      params.delete(key);
    } else {
      params.set(key, String(value));
      params.delete('page');
    }
    router.push(`${pathname}?${params.toString()}`);
  }

  function clearFilters() {
    router.push(pathname);
  }

  useEffect(() => {
    fetch('/api/filter-options')
      .then((r) => r.json())
      .then(setOptions);
  }, []);

  useEffect(() => {
    const key = searchParams.toString();
    fetch(`/api/cars?${key}`)
      .then((r) => r.json())
      .then((data) => { setResult(data); setLoadedKey(key); })
      .catch(() => setLoadedKey(key));
  }, [searchParams]);

  const title = filters.q
    ? `Results for "${filters.q}"`
    : filters.bodyType
    ? `${filters.bodyType}s`
    : filters.make
    ? `${filters.make} Cars`
    : 'Browse All Cars';

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-6">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900">{title}</h1>
      </div>

      <div className="flex gap-8">
        {/* Sidebar — desktop */}
        <div className="hidden lg:block w-64 shrink-0">
          {options && (
            <FiltersSidebar
              filters={filters}
              options={options}
              onFilterChange={(k, v) => setParam(k as string, v)}
              onClear={clearFilters}
              totalResults={result?.total ?? 0}
            />
          )}
        </div>

        {/* Main content */}
        <div className="flex-1 min-w-0">
          {/* Mobile filter toggle */}
          <button
            className="lg:hidden flex items-center gap-2 text-sm font-medium text-gray-700 bg-white border border-gray-200 px-3 py-2 rounded-xl mb-4 hover:bg-gray-50"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            <SlidersHorizontal size={15} />
            Filters
          </button>

          {/* Mobile sidebar overlay */}
          {sidebarOpen && options && (
            <div className="lg:hidden mb-4 bg-white rounded-2xl border border-gray-100 p-4">
              <FiltersSidebar
                filters={filters}
                options={options}
                onFilterChange={(k, v) => { setParam(k as string, v); setSidebarOpen(false); }}
                onClear={() => { clearFilters(); setSidebarOpen(false); }}
                totalResults={result?.total ?? 0}
              />
            </div>
          )}

          <SortBar
            filters={filters}
            total={result?.total ?? 0}
            page={page}
            totalPages={result?.totalPages ?? 1}
            onSortChange={(sort) => setParam('sort', sort)}
            onPageChange={(p) => setParam('page', p)}
          />

          <CarGrid cars={result?.data} loading={loading} />

          {/* Pagination bottom */}
          {result && result.totalPages > 1 && (
            <div className="flex justify-center gap-2 mt-8">
              {Array.from({ length: result.totalPages }, (_, i) => i + 1).map((p) => (
                <button
                  key={p}
                  onClick={() => setParam('page', p)}
                  className={`w-9 h-9 rounded-xl text-sm font-medium transition-colors ${
                    p === page ? 'bg-indigo-600 text-white' : 'bg-white border border-gray-200 text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  {p}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function CarsPage() {
  return (
    <Suspense>
      <CarsPageContent />
    </Suspense>
  );
}
