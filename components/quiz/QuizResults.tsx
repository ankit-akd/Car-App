'use client';

import Link from 'next/link';
import { Check, Heart, GitCompare } from 'lucide-react';
import { RecommendedCar } from '@/lib/types';
import { formatPrice, formatMileage, getFuelTypeColor } from '@/lib/utils/format';
import { getCarColorBg, getCarEmoji } from '@/lib/utils/carColors';
import { useAppContext } from '@/lib/context/AppContext';
import StarRating from '@/components/ui/StarRating';
import { cn } from '@/lib/utils/cn';

export default function QuizResults({ results }: { results: RecommendedCar[] }) {
  const { addToShortlist, isInShortlist, addToCompare, isInCompare, compareList } = useAppContext();

  return (
    <div className="space-y-4">
      {results.map(({ car, matchReasons }, idx) => (
        <div key={car.id} className={`bg-white rounded-2xl border overflow-hidden ${idx === 0 ? 'border-indigo-200 shadow-md' : 'border-gray-100'}`}>
          {idx === 0 && (
            <div className="bg-indigo-600 text-white text-xs font-semibold px-4 py-1.5 flex items-center gap-1.5">
              <Check size={13} /> Top Match for You
            </div>
          )}
          <div className="flex gap-4 p-4">
            <div className={`w-28 h-20 rounded-xl flex items-center justify-center shrink-0 ${getCarColorBg(car.make)}`}>
              <span className="text-3xl">{getCarEmoji(car.bodyType)}</span>
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <p className="text-xs text-gray-400">{car.make}</p>
                  <h3 className="font-bold text-gray-900 text-lg leading-tight">{car.model}</h3>
                  <p className="text-xs text-gray-500">{car.variant}</p>
                </div>
                <div className="text-right shrink-0">
                  <p className="font-bold text-indigo-600 text-lg">{formatPrice(car.price)}</p>
                  <p className="text-xs text-gray-400">ex-showroom</p>
                </div>
              </div>

              <div className="flex items-center gap-2 mt-1 mb-2">
                <StarRating value={car.reviewScore} size="sm" showValue />
                <span className={cn('text-xs px-2 py-0.5 rounded-full font-medium', getFuelTypeColor(car.fuelType))}>
                  {car.fuelType}
                </span>
                <span className="text-xs text-gray-400">{formatMileage(car)}</span>
              </div>

              {/* Match reasons */}
              {matchReasons.length > 0 && (
                <div className="flex flex-wrap gap-1.5 mb-3">
                  {matchReasons.map((r) => (
                    <span key={r} className="inline-flex items-center gap-1 text-[11px] bg-green-50 text-green-700 px-2 py-0.5 rounded-full border border-green-100">
                      <Check size={10} /> {r}
                    </span>
                  ))}
                </div>
              )}

              <div className="flex gap-2 flex-wrap">
                <Link
                  href={`/cars/${car.id}`}
                  className="px-3 py-1.5 rounded-xl text-xs font-medium bg-indigo-600 text-white hover:bg-indigo-700 transition-colors"
                >
                  View Details
                </Link>
                <button
                  onClick={() => addToShortlist(car)}
                  disabled={isInShortlist(car.id)}
                  className={cn(
                    'flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-medium transition-colors',
                    isInShortlist(car.id)
                      ? 'bg-red-50 text-red-500'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  )}
                >
                  <Heart size={12} className={isInShortlist(car.id) ? 'fill-current' : ''} />
                  {isInShortlist(car.id) ? 'Shortlisted' : 'Shortlist'}
                </button>
                <button
                  onClick={() => addToCompare(car)}
                  disabled={isInCompare(car.id) || (compareList.length >= 3 && !isInCompare(car.id))}
                  className={cn(
                    'flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-medium transition-colors',
                    isInCompare(car.id)
                      ? 'bg-indigo-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200 disabled:opacity-40 disabled:pointer-events-none'
                  )}
                >
                  <GitCompare size={12} />
                  {isInCompare(car.id) ? 'Added' : 'Compare'}
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
