'use client';

import Link from 'next/link';
import { X } from 'lucide-react';
import { Car } from '@/lib/types';
import { formatPrice, formatMileage, getSafetyLabel } from '@/lib/utils/format';
import { getCarColorBg, getCarEmoji } from '@/lib/utils/carColors';
import StarRating from '@/components/ui/StarRating';

interface CompareTableProps {
  cars: Car[];
  onRemove: (id: string) => void;
}

type Row = { label: string; getValue: (car: Car) => string | number; highlight?: 'max' | 'min' };

const ROWS: Row[] = [
  { label: 'Price (Ex-showroom)',  getValue: (c) => formatPrice(c.price),     highlight: 'min' },
  { label: 'Body Type',            getValue: (c) => c.bodyType                               },
  { label: 'Fuel Type',            getValue: (c) => c.fuelType                               },
  { label: 'Transmission',         getValue: (c) => c.transmission                           },
  { label: 'Mileage',              getValue: (c) => formatMileage(c),         highlight: 'max' },
  { label: 'Seating Capacity',     getValue: (c) => `${c.seatingCapacity} persons`            },
  { label: 'Safety Rating (NCAP)', getValue: (c) => c.safetyRating > 0 ? `${c.safetyRating}/5 — ${getSafetyLabel(c.safetyRating)}` : 'Not Rated', highlight: 'max' },
  { label: 'User Review Score',    getValue: (c) => `${c.reviewScore} / 5`,  highlight: 'max' },
];

function getNumericValue(row: Row, car: Car): number {
  if (row.label === 'Price (Ex-showroom)') return car.price;
  if (row.label === 'Mileage') return car.fuelType === 'Electric' ? -1 : car.mileage;
  if (row.label === 'Safety Rating (NCAP)') return car.safetyRating;
  if (row.label === 'User Review Score') return car.reviewScore;
  return 0;
}

export default function CompareTable({ cars, onRemove }: CompareTableProps) {
  if (cars.length === 0) return null;

  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse text-sm">
        {/* Car headers */}
        <thead>
          <tr>
            <th className="w-40 min-w-40 p-4 text-left text-gray-400 font-normal text-xs border-b border-gray-100" />
            {cars.map((car) => (
              <th key={car.id} className="min-w-52 border-b border-gray-100 p-4">
                <div className="relative">
                  <button
                    onClick={() => onRemove(car.id)}
                    className="absolute -top-1 -right-1 w-6 h-6 bg-gray-100 hover:bg-red-100 hover:text-red-600 rounded-full flex items-center justify-center transition-colors"
                  >
                    <X size={12} />
                  </button>
                  <div className={`h-28 flex items-center justify-center rounded-xl mb-3 ${getCarColorBg(car.make)}`}>
                    <span className="text-4xl">{getCarEmoji(car.bodyType)}</span>
                  </div>
                  <Link href={`/cars/${car.id}`} className="hover:text-indigo-600 transition-colors">
                    <p className="text-xs text-gray-400 mb-0.5">{car.make}</p>
                    <p className="font-bold text-gray-900 text-base leading-tight">{car.model}</p>
                    <p className="text-xs text-gray-500">{car.variant}</p>
                  </Link>
                  <div className="flex items-center gap-1 mt-2">
                    <StarRating value={car.reviewScore} size="sm" />
                    <span className="text-xs text-gray-500">{car.reviewScore}</span>
                  </div>
                </div>
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {ROWS.map((row, rowIdx) => {
            const values = cars.map((c) => getNumericValue(row, c));
            const best = row.highlight === 'min' ? Math.min(...values.filter(v => v >= 0)) : Math.max(...values);

            return (
              <tr key={row.label} className={rowIdx % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                <td className="px-4 py-3 font-medium text-gray-500 text-xs border-r border-gray-100">
                  {row.label}
                </td>
                {cars.map((car, carIdx) => {
                  const numericVal = values[carIdx];
                  const isBest = row.highlight && numericVal === best && numericVal >= 0 && cars.length > 1;
                  return (
                    <td
                      key={car.id}
                      className={`px-4 py-3 font-medium ${isBest ? 'text-green-700 bg-green-50' : 'text-gray-800'}`}
                    >
                      {String(row.getValue(car))}
                      {isBest && <span className="ml-1 text-[10px] bg-green-100 text-green-700 px-1.5 py-0.5 rounded-full font-semibold">Best</span>}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
