const MAKE_COLORS: Record<string, string> = {
  'Maruti Suzuki': 'bg-blue-50',
  'Hyundai':       'bg-sky-50',
  'Tata':          'bg-indigo-50',
  'Honda':         'bg-red-50',
  'Toyota':        'bg-orange-50',
  'Kia':           'bg-violet-50',
  'Mahindra':      'bg-amber-50',
  'Volkswagen':    'bg-gray-50',
  'Skoda':         'bg-green-50',
  'Renault':       'bg-yellow-50',
  'Nissan':        'bg-rose-50',
  'MG':            'bg-teal-50',
  'Jeep':          'bg-stone-50',
};

export function getCarColorBg(make: string): string {
  return MAKE_COLORS[make] ?? 'bg-slate-50';
}

export function getCarEmoji(bodyType: string): string {
  const map: Record<string, string> = {
    'Hatchback':   '🚗',
    'Sedan':       '🚙',
    'Compact SUV': '🚐',
    'SUV':         '🛻',
  };
  return map[bodyType] ?? '🚘';
}
