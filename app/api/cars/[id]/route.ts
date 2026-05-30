import { NextRequest, NextResponse } from 'next/server';
import carsData from '@/lib/data/cars.json';
import { Car } from '@/lib/types';

const cars = carsData as Car[];

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const car = cars.find((c) => c.id === id);

  if (!car) {
    return NextResponse.json({ error: 'Car not found' }, { status: 404 });
  }

  const similar = cars
    .filter((c) => c.id !== id && c.bodyType === car.bodyType)
    .sort((a, b) => Math.abs(a.price - car.price) - Math.abs(b.price - car.price))
    .slice(0, 4);

  return NextResponse.json({ car, similar });
}
