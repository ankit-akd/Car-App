'use client';

import { SlidersHorizontal, X } from 'lucide-react';
import { CarFilters, FilterOptions, SortOption } from '@/lib/types';
import Select from '@/components/ui/Select';
import Button from '@/components/ui/Button';
import { formatPrice } from '@/lib/utils/format';

interface FiltersSidebarProps {
  filters: CarFilters;
  options: FilterOptions;
  onFilterChange: (key: keyof CarFilters, value: string | number | undefined) => void;
  onClear: () => void;
  totalResults: number;
}

const SORT_OPTIONS: { value: SortOption; label: string }[] = [
  { value: 'review_desc',  label: 'Best Rated'       },
  { value: 'price_asc',   label: 'Price: Low → High' },
  { value: 'price_desc',  label: 'Price: High → Low' },
  { value: 'mileage_desc',label: 'Best Mileage'      },
  { value: 'rating_desc', label: 'Safety Rating'     },
];

const BUDGET_PRESETS = [
  { label: 'Under ₹5L',   min: 0,       max: 500000   },
  { label: '₹5L – ₹10L', min: 500000,  max: 1000000  },
  { label: '₹10L – ₹15L',min: 1000000, max: 1500000  },
  { label: '₹15L – ₹20L',min: 1500000, max: 2000000  },
  { label: 'Above ₹20L', min: 2000000, max: undefined },
];

export default function FiltersSidebar({
  filters,
  options,
  onFilterChange,
  onClear,
  totalResults,
}: FiltersSidebarProps) {
  const activeCount = [
    filters.make, filters.bodyType, filters.fuelType, filters.transmission,
    filters.minPrice, filters.maxPrice, filters.minSeating, filters.minSafetyRating,
  ].filter(Boolean).length;

  return (
    <aside className="w-full space-y-5">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 font-semibold text-gray-900">
          <SlidersHorizontal size={16} />
          Filters
          {activeCount > 0 && (
            <span className="bg-indigo-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
              {activeCount}
            </span>
          )}
        </div>
        {activeCount > 0 && (
          <Button variant="ghost" size="sm" onClick={onClear} className="text-xs text-red-500 hover:text-red-600 hover:bg-red-50 px-2">
            <X size={13} /> Clear all
          </Button>
        )}
      </div>

      <p className="text-xs text-gray-400">{totalResults} cars found</p>

      {/* Sort */}
      <div>
        <Select
          label="Sort by"
          value={filters.sort ?? ''}
          onChange={(e) => onFilterChange('sort', e.target.value || undefined)}
        >
          {SORT_OPTIONS.map((o) => (
            <option key={o.value} value={o.value}>{o.label}</option>
          ))}
        </Select>
      </div>

      {/* Budget presets */}
      <div>
        <p className="text-sm font-medium text-gray-700 mb-2">Budget</p>
        <div className="flex flex-wrap gap-1.5">
          {BUDGET_PRESETS.map((p) => {
            const active = filters.minPrice === p.min && filters.maxPrice === p.max;
            return (
              <button
                key={p.label}
                onClick={() => {
                  if (active) {
                    onFilterChange('minPrice', undefined);
                    onFilterChange('maxPrice', undefined);
                  } else {
                    onFilterChange('minPrice', p.min || undefined);
                    onFilterChange('maxPrice', p.max);
                  }
                }}
                className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-colors ${
                  active
                    ? 'bg-indigo-600 text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {p.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Make */}
      <Select
        label="Brand"
        value={filters.make ?? ''}
        onChange={(e) => onFilterChange('make', e.target.value || undefined)}
        placeholder="All Brands"
      >
        {options.makes.map((m) => (
          <option key={m} value={m}>{m}</option>
        ))}
      </Select>

      {/* Body Type */}
      <Select
        label="Body Type"
        value={filters.bodyType ?? ''}
        onChange={(e) => onFilterChange('bodyType', e.target.value || undefined)}
        placeholder="All Types"
      >
        {options.bodyTypes.map((b) => (
          <option key={b} value={b}>{b}</option>
        ))}
      </Select>

      {/* Fuel Type */}
      <Select
        label="Fuel Type"
        value={filters.fuelType ?? ''}
        onChange={(e) => onFilterChange('fuelType', e.target.value || undefined)}
        placeholder="All Fuels"
      >
        {options.fuelTypes.map((f) => (
          <option key={f} value={f}>{f}</option>
        ))}
      </Select>

      {/* Transmission */}
      <Select
        label="Transmission"
        value={filters.transmission ?? ''}
        onChange={(e) => onFilterChange('transmission', e.target.value || undefined)}
        placeholder="Manual & Automatic"
      >
        {options.transmissions.map((t) => (
          <option key={t} value={t}>{t}</option>
        ))}
      </Select>

      {/* Seating */}
      <div>
        <p className="text-sm font-medium text-gray-700 mb-2">Min. Seats</p>
        <div className="flex gap-2">
          {[5, 6, 7].map((seats) => (
            <button
              key={seats}
              onClick={() => onFilterChange('minSeating', filters.minSeating === seats ? undefined : seats)}
              className={`flex-1 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                filters.minSeating === seats
                  ? 'bg-indigo-600 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {seats}+
            </button>
          ))}
        </div>
      </div>

      {/* Safety Rating */}
      <div>
        <p className="text-sm font-medium text-gray-700 mb-2">Min. Safety Rating</p>
        <div className="flex gap-1.5">
          {[1, 2, 3, 4, 5].map((r) => (
            <button
              key={r}
              onClick={() => onFilterChange('minSafetyRating', filters.minSafetyRating === r ? undefined : r)}
              className={`flex-1 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                filters.minSafetyRating === r
                  ? 'bg-indigo-600 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {r}★
            </button>
          ))}
        </div>
      </div>

      {/* Price range display */}
      {(filters.minPrice !== undefined || filters.maxPrice !== undefined) && (
        <div className="text-xs text-indigo-600 bg-indigo-50 rounded-lg px-3 py-2">
          Budget: {filters.minPrice ? formatPrice(filters.minPrice) : '₹0'} –{' '}
          {filters.maxPrice ? formatPrice(filters.maxPrice) : 'Any'}
        </div>
      )}
    </aside>
  );
}
