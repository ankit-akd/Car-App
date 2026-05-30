import { Star } from 'lucide-react';
import { cn } from '@/lib/utils/cn';

interface StarRatingProps {
  value: number;
  max?: number;
  size?: 'sm' | 'md' | 'lg';
  showValue?: boolean;
  className?: string;
}

const sizeMap = { sm: 12, md: 16, lg: 20 };

export default function StarRating({ value, max = 5, size = 'md', showValue, className }: StarRatingProps) {
  const px = sizeMap[size];

  return (
    <span className={cn('inline-flex items-center gap-0.5', className)}>
      {Array.from({ length: max }).map((_, i) => {
        const filled = i < Math.floor(value);
        const partial = !filled && i < value;
        return (
          <span key={i} className="relative inline-block" style={{ width: px, height: px }}>
            <Star
              size={px}
              className="text-gray-200"
              fill="currentColor"
            />
            {(filled || partial) && (
              <span
                className="absolute inset-0 overflow-hidden"
                style={{ width: partial ? `${(value % 1) * 100}%` : '100%' }}
              >
                <Star size={px} className="text-amber-400" fill="currentColor" />
              </span>
            )}
          </span>
        );
      })}
      {showValue && (
        <span className="ml-1 text-sm font-medium text-gray-700">{value.toFixed(1)}</span>
      )}
    </span>
  );
}
