'use client';

import Link from 'next/link';
import { X, GitCompare, ExternalLink } from 'lucide-react';
import { Car } from '@/lib/types';
import { formatPrice, formatMileage, getFuelTypeColor } from '@/lib/utils/format';
import { getCarColorBg, getCarEmoji } from '@/lib/utils/carColors';
import { useAppContext } from '@/lib/context/AppContext';
import StarRating from '@/components/ui/StarRating';
import Badge from '@/components/ui/Badge';
import { cn } from '@/lib/utils/cn';

export default function ShortlistGrid({ cars }: { cars: Car[] }) {
  const { removeFromShortlist, addToCompare, removeFromCompare, isInCompare, compareList } = useAppContext();

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {cars.map((car) => {
        const inCompare    = isInCompare(car.id);
        const comparesFull = compareList.length >= 3 && !inCompare;

        return (
          <div key={car.id} className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
            <div className={`relative h-40 flex items-center justify-center ${getCarColorBg(car.make)}`}>
              <span className="text-5xl">{getCarEmoji(car.bodyType)}</span>
              <button
                onClick={() => removeFromShortlist(car.id)}
                className="absolute top-2 right-2 w-7 h-7 bg-white rounded-full shadow flex items-center justify-center hover:bg-red-50 hover:text-red-500 transition-colors"
              >
                <X size={14} />
              </button>
            </div>

            <div className="p-4">
              <p className="text-xs text-gray-400">{car.make}</p>
              <h3 className="font-bold text-gray-900 text-base">{car.model}
                <span className="font-normal text-gray-500 text-sm ml-1">{car.variant}</span>
              </h3>

              <div className="flex items-center gap-1.5 mt-1 mb-2">
                <StarRating value={car.reviewScore} size="sm" />
                <span className="text-xs text-gray-500">{car.reviewScore}</span>
              </div>

              <div className="flex flex-wrap gap-1.5 mb-3">
                <span className={cn('inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium', getFuelTypeColor(car.fuelType))}>
                  {car.fuelType}
                </span>
                <Badge variant="outline">{car.transmission}</Badge>
              </div>

              <div className="text-xs text-gray-500 mb-3">
                {formatMileage(car)} · {car.seatingCapacity} seats
                {car.safetyRating > 0 && ` · ${car.safetyRating}★ Safety`}
              </div>

              <div className="flex items-center justify-between gap-2 pt-3 border-t border-gray-50">
                <p className="font-bold text-indigo-600 text-lg">{formatPrice(car.price)}</p>

                <div className="flex gap-2">
                  <button
                    onClick={() => inCompare ? removeFromCompare(car.id) : addToCompare(car)}
                    disabled={comparesFull}
                    title={comparesFull ? 'Compare full' : 'Add to compare'}
                    className={cn(
                      'flex items-center gap-1 px-2.5 py-1.5 rounded-xl text-xs font-medium transition-colors',
                      inCompare
                        ? 'bg-indigo-600 text-white'
                        : comparesFull
                        ? 'bg-gray-100 text-gray-300 cursor-not-allowed'
                        : 'bg-indigo-50 text-indigo-600 hover:bg-indigo-100'
                    )}
                  >
                    <GitCompare size={13} />
                    {inCompare ? 'Added' : 'Compare'}
                  </button>

                  <Link
                    href={`/cars/${car.id}`}
                    className="flex items-center gap-1 px-2.5 py-1.5 rounded-xl text-xs font-medium bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors"
                  >
                    <ExternalLink size={13} />
                    View
                  </Link>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
