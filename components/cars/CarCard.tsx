'use client';

import Link from 'next/link';
import { Heart, GitCompare, Shield, Fuel } from 'lucide-react';
import { Car } from '@/lib/types';
import { formatPrice, formatMileage, getFuelTypeColor } from '@/lib/utils/format';
import { getCarColorBg, getCarEmoji } from '@/lib/utils/carColors';
import { useAppContext } from '@/lib/context/AppContext';
import StarRating from '@/components/ui/StarRating';
import Badge from '@/components/ui/Badge';
import { cn } from '@/lib/utils/cn';

export default function CarCard({ car }: { car: Car }) {
  const { addToCompare, removeFromCompare, isInCompare, addToShortlist, removeFromShortlist, isInShortlist, compareList } = useAppContext();

  const inCompare   = isInCompare(car.id);
  const inShortlist = isInShortlist(car.id);
  const comparesFull = compareList.length >= 3 && !inCompare;

  return (
    <div className="group relative bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-md hover:-translate-y-0.5 transition-all">
      {/* Image area */}
      <Link href={`/cars/${car.id}`}>
        <div className={`relative h-44 flex items-center justify-center ${getCarColorBg(car.make)}`}>
          <span className="text-6xl">{getCarEmoji(car.bodyType)}</span>
          {car.safetyRating >= 5 && (
            <span className="absolute top-2 left-2 bg-green-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
              <Shield size={10} /> 5★ Safety
            </span>
          )}
        </div>
      </Link>

      {/* Shortlist button */}
      <button
        onClick={() => inShortlist ? removeFromShortlist(car.id) : addToShortlist(car)}
        className="absolute top-3 right-3 w-8 h-8 bg-white rounded-full shadow flex items-center justify-center hover:scale-110 transition-transform"
        title={inShortlist ? 'Remove from shortlist' : 'Add to shortlist'}
      >
        <Heart
          size={15}
          className={inShortlist ? 'text-red-500 fill-red-500' : 'text-gray-400'}
        />
      </button>

      <div className="p-4">
        {/* Make + Model */}
        <Link href={`/cars/${car.id}`}>
          <p className="text-xs text-gray-400 mb-0.5">{car.make}</p>
          <h3 className="font-bold text-gray-900 text-base leading-tight hover:text-indigo-600 transition-colors">
            {car.model}
            <span className="font-normal text-gray-500 text-sm ml-1">{car.variant}</span>
          </h3>
        </Link>

        {/* Rating + Review */}
        <div className="flex items-center gap-1.5 mt-1.5 mb-2">
          <StarRating value={car.reviewScore} size="sm" />
          <span className="text-xs text-gray-500">{car.reviewScore}</span>
        </div>

        {/* Badges */}
        <div className="flex flex-wrap gap-1.5 mb-3">
          <span className={cn('inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium', getFuelTypeColor(car.fuelType))}>
            <Fuel size={10} />
            {car.fuelType}
          </span>
          <Badge variant="outline">{car.transmission}</Badge>
          <Badge variant="outline">{car.bodyType}</Badge>
        </div>

        {/* Specs row */}
        <div className="flex items-center gap-3 text-xs text-gray-500 mb-3 pb-3 border-b border-gray-50">
          <span title="Mileage">{formatMileage(car)}</span>
          <span>·</span>
          <span title="Seating">{car.seatingCapacity} seats</span>
          {car.safetyRating > 0 && (
            <>
              <span>·</span>
              <span title="Safety rating">{car.safetyRating}★ Safety</span>
            </>
          )}
        </div>

        {/* Price + Actions */}
        <div className="flex items-center justify-between gap-2">
          <div>
            <p className="text-[10px] text-gray-400 leading-none">Ex-showroom</p>
            <p className="font-bold text-indigo-600 text-lg leading-tight">{formatPrice(car.price)}</p>
          </div>
          <button
            onClick={() => inCompare ? removeFromCompare(car.id) : addToCompare(car)}
            disabled={comparesFull}
            title={comparesFull ? 'Compare list full (max 3)' : inCompare ? 'Remove from compare' : 'Add to compare'}
            className={cn(
              'flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium transition-colors',
              inCompare
                ? 'bg-indigo-600 text-white hover:bg-indigo-700'
                : comparesFull
                ? 'bg-gray-100 text-gray-300 cursor-not-allowed'
                : 'bg-indigo-50 text-indigo-600 hover:bg-indigo-100'
            )}
          >
            <GitCompare size={13} />
            {inCompare ? 'Added' : 'Compare'}
          </button>
        </div>
      </div>
    </div>
  );
}
