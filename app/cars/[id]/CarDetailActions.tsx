'use client';

import { Heart, GitCompare, Check } from 'lucide-react';
import { Car } from '@/lib/types';
import { useAppContext } from '@/lib/context/AppContext';
import Button from '@/components/ui/Button';

export default function CarDetailActions({ car }: { car: Car }) {
  const {
    addToShortlist, removeFromShortlist, isInShortlist,
    addToCompare, removeFromCompare, isInCompare, compareList,
  } = useAppContext();

  const inShortlist  = isInShortlist(car.id);
  const inCompare    = isInCompare(car.id);
  const comparesFull = compareList.length >= 3 && !inCompare;

  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-5 space-y-3">
      <h3 className="font-semibold text-gray-900 text-sm">Add to your list</h3>

      <Button
        variant={inShortlist ? 'danger' : 'outline'}
        className="w-full justify-center gap-2"
        onClick={() => inShortlist ? removeFromShortlist(car.id) : addToShortlist(car)}
      >
        <Heart size={16} className={inShortlist ? 'fill-current' : ''} />
        {inShortlist ? 'Remove from Shortlist' : 'Add to Shortlist'}
      </Button>

      <Button
        variant={inCompare ? 'primary' : 'secondary'}
        className="w-full justify-center gap-2"
        disabled={comparesFull}
        onClick={() => inCompare ? removeFromCompare(car.id) : addToCompare(car)}
        title={comparesFull ? 'Compare list is full (max 3)' : ''}
      >
        {inCompare ? <Check size={16} /> : <GitCompare size={16} />}
        {inCompare ? 'Added to Compare' : comparesFull ? 'Compare Full' : 'Add to Compare'}
      </Button>
    </div>
  );
}
