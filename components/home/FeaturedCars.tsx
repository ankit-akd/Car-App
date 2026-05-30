import Link from 'next/link';
import { Car } from '@/lib/types';
import { formatPrice, formatMileage, getFuelTypeColor } from '@/lib/utils/format';
import StarRating from '@/components/ui/StarRating';
import Badge from '@/components/ui/Badge';
import { getCarColorBg } from '@/lib/utils/carColors';

interface FeaturedCarsProps {
  cars: Car[];
  title?: string;
}

export default function FeaturedCars({ cars, title = 'Popular Cars' }: FeaturedCarsProps) {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-900">{title}</h2>
        <Link href="/cars" className="text-sm text-indigo-600 hover:underline font-medium">
          View all →
        </Link>
      </div>

      <div className="flex gap-4 overflow-x-auto pb-4 -mx-4 px-4 snap-x snap-mandatory">
        {cars.map((car) => (
          <Link
            key={car.id}
            href={`/cars/${car.id}`}
            className="group flex-none w-64 bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-md hover:-translate-y-0.5 transition-all snap-start"
          >
            <div className={`h-36 flex items-center justify-center ${getCarColorBg(car.make)}`}>
              <span className="text-5xl">🚗</span>
            </div>
            <div className="p-4">
              <div className="flex items-start justify-between gap-2 mb-1">
                <div>
                  <p className="text-xs text-gray-400">{car.make}</p>
                  <p className="font-bold text-gray-900 leading-tight">{car.model}</p>
                </div>
                <Badge className={getFuelTypeColor(car.fuelType)}>{car.fuelType}</Badge>
              </div>
              <div className="flex items-center gap-1 mb-2">
                <StarRating value={car.reviewScore} size="sm" />
                <span className="text-xs text-gray-500">{car.reviewScore}</span>
              </div>
              <div className="text-xs text-gray-500 mb-3">
                {formatMileage(car)} · {car.transmission}
              </div>
              <p className="font-bold text-indigo-600 text-base">{formatPrice(car.price)}</p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
