import { Car } from '@/lib/types';
import { formatPrice, formatMileage, getSafetyLabel, getReviewLabel } from '@/lib/utils/format';

interface SpecsTableProps {
  car: Car;
}

export default function SpecsTable({ car }: SpecsTableProps) {
  const rows = [
    { label: 'Make',             value: car.make                                        },
    { label: 'Model',            value: car.model                                       },
    { label: 'Variant',          value: car.variant                                     },
    { label: 'Body Type',        value: car.bodyType                                    },
    { label: 'Ex-Showroom Price',value: formatPrice(car.price)                         },
    { label: 'Fuel Type',        value: car.fuelType                                    },
    { label: 'Transmission',     value: car.transmission                                },
    { label: 'Mileage',          value: formatMileage(car)                             },
    { label: 'Seating Capacity', value: `${car.seatingCapacity} persons`               },
    { label: 'Safety Rating',    value: car.safetyRating > 0 ? `${car.safetyRating}/5 Stars (NCAP) — ${getSafetyLabel(car.safetyRating)}` : 'Not Rated' },
    { label: 'User Review Score',value: `${car.reviewScore}/5 — ${getReviewLabel(car.reviewScore)}` },
  ];

  return (
    <div className="overflow-hidden rounded-2xl border border-gray-100">
      <table className="w-full text-sm">
        <tbody>
          {rows.map((row, i) => (
            <tr key={row.label} className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
              <td className="px-4 py-3 font-medium text-gray-500 w-1/3 border-r border-gray-100">
                {row.label}
              </td>
              <td className="px-4 py-3 text-gray-900 font-medium">{row.value}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
