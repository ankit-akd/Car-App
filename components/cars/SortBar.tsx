'use client';

import { CarFilters, SortOption } from '@/lib/types';

interface SortBarProps {
  filters: CarFilters;
  total: number;
  page: number;
  totalPages: number;
  onSortChange: (sort: SortOption) => void;
  onPageChange: (page: number) => void;
}

const SORT_OPTIONS: { value: SortOption; label: string }[] = [
  { value: 'review_desc',  label: 'Best Rated'       },
  { value: 'price_asc',   label: 'Price ↑'           },
  { value: 'price_desc',  label: 'Price ↓'           },
  { value: 'mileage_desc',label: 'Best Mileage'      },
  { value: 'rating_desc', label: 'Safest'            },
];

export default function SortBar({ filters, total, page, totalPages, onSortChange, onPageChange }: SortBarProps) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
      <p className="text-sm text-gray-500">
        <span className="font-semibold text-gray-900">{total}</span> cars found
        {totalPages > 1 && ` · Page ${page} of ${totalPages}`}
      </p>

      <div className="flex items-center gap-2 overflow-x-auto">
        <span className="text-sm text-gray-500 shrink-0">Sort:</span>
        {SORT_OPTIONS.map((opt) => (
          <button
            key={opt.value}
            onClick={() => onSortChange(opt.value)}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-colors ${
              filters.sort === opt.value || (!filters.sort && opt.value === 'review_desc')
                ? 'bg-indigo-600 text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            {opt.label}
          </button>
        ))}
      </div>

      {totalPages > 1 && (
        <div className="flex items-center gap-1">
          <button
            disabled={page <= 1}
            onClick={() => onPageChange(page - 1)}
            className="px-3 py-1.5 rounded-lg text-xs bg-gray-100 text-gray-600 hover:bg-gray-200 disabled:opacity-40 disabled:pointer-events-none"
          >
            ← Prev
          </button>
          <button
            disabled={page >= totalPages}
            onClick={() => onPageChange(page + 1)}
            className="px-3 py-1.5 rounded-lg text-xs bg-gray-100 text-gray-600 hover:bg-gray-200 disabled:opacity-40 disabled:pointer-events-none"
          >
            Next →
          </button>
        </div>
      )}
    </div>
  );
}
