import Link from 'next/link';
import { Car } from '@/lib/types';
import { formatPrice } from '@/lib/utils/format';
import { getCarColorBg, getCarEmoji } from '@/lib/utils/carColors';
import StarRating from '@/components/ui/StarRating';

export default function SimilarCars({ cars }: { cars: Car[] }) {
  if (cars.length === 0) return null;

  return (
    <section>
      <h2 className="text-xl font-bold text-gray-900 mb-4">Similar Cars</h2>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {cars.map((car) => (
          <Link
            key={car.id}
            href={`/cars/${car.id}`}
            className="bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-md hover:-translate-y-0.5 transition-all"
          >
            <div className={`h-28 flex items-center justify-center ${getCarColorBg(car.make)}`}>
              <span className="text-4xl">{getCarEmoji(car.bodyType)}</span>
            </div>
            <div className="p-3">
              <p className="text-xs text-gray-400">{car.make}</p>
              <p className="font-semibold text-sm text-gray-900">{car.model}</p>
              <div className="flex items-center gap-1 mt-0.5 mb-1">
                <StarRating value={car.reviewScore} size="sm" />
              </div>
              <p className="font-bold text-indigo-600 text-sm">{formatPrice(car.price)}</p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
