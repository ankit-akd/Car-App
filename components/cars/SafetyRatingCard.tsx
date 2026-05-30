import { Shield, ShieldAlert, ShieldCheck } from 'lucide-react';
import { Car } from '@/lib/types';
import { getSafetyLabel } from '@/lib/utils/format';

export default function SafetyRatingCard({ car }: { car: Car }) {
  const rating = car.safetyRating;

  const color =
    rating >= 5 ? 'text-green-600 bg-green-50 border-green-200' :
    rating >= 4 ? 'text-blue-600 bg-blue-50 border-blue-200'    :
    rating >= 3 ? 'text-amber-600 bg-amber-50 border-amber-200' :
    rating >= 1 ? 'text-red-600 bg-red-50 border-red-200'       :
                  'text-gray-500 bg-gray-50 border-gray-200';

  const Icon = rating >= 5 ? ShieldCheck : rating >= 3 ? Shield : ShieldAlert;

  return (
    <div className={`rounded-2xl border p-5 ${color}`}>
      <div className="flex items-center gap-3 mb-4">
        <Icon size={28} />
        <div>
          <p className="font-bold text-xl">
            {rating > 0 ? `${rating} / 5 Stars` : 'Not Rated'}
          </p>
          <p className="text-sm opacity-75">Global NCAP Safety Rating</p>
        </div>
      </div>

      <div className="flex gap-1 mb-3">
        {Array.from({ length: 5 }).map((_, i) => (
          <div
            key={i}
            className={`h-2 flex-1 rounded-full ${i < rating ? 'bg-current' : 'bg-current opacity-20'}`}
          />
        ))}
      </div>

      <p className="text-sm font-medium">{getSafetyLabel(rating)}</p>
      {rating === 0 && (
        <p className="text-xs mt-1 opacity-70">This car has not been submitted for NCAP testing.</p>
      )}
    </div>
  );
}
