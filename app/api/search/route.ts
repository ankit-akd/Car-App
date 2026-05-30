import { NextRequest, NextResponse } from 'next/server';
import carsData from '@/lib/data/cars.json';
import { Car } from '@/lib/types';

const cars = carsData as Car[];

export async function GET(req: NextRequest) {
  const q = req.nextUrl.searchParams.get('q')?.toLowerCase().trim();

  if (!q || q.length < 2) {
    return NextResponse.json([]);
  }

  const results = cars
    .filter(
      (c) =>
        c.make.toLowerCase().includes(q) ||
        c.model.toLowerCase().includes(q) ||
        c.variant.toLowerCase().includes(q) ||
        c.bodyType.toLowerCase().includes(q)
    )
    .slice(0, 8);

  return NextResponse.json(results);
}
