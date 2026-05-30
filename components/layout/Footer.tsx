import Link from 'next/link';
import { Car } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-400 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
                <Car size={18} className="text-white" />
              </div>
              <span className="font-bold text-white text-lg">
                Find<span className="text-indigo-400">My</span>Car
              </span>
            </div>
            <p className="text-sm leading-relaxed max-w-xs">
              India&apos;s smart car research platform. Go from confused to confident — find the right car for your budget and lifestyle.
            </p>
          </div>

          <div>
            <h4 className="text-white font-semibold text-sm mb-3">Discover</h4>
            <ul className="space-y-2 text-sm">
              {[
                { href: '/cars', label: 'Browse All Cars' },
                { href: '/cars?bodyType=Hatchback', label: 'Hatchbacks' },
                { href: '/cars?bodyType=Sedan', label: 'Sedans' },
                { href: '/cars?bodyType=SUV', label: 'SUVs' },
                { href: '/cars?fuelType=Electric', label: 'Electric Cars' },
              ].map(({ href, label }) => (
                <li key={href}>
                  <Link href={href} className="hover:text-white transition-colors">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold text-sm mb-3">Tools</h4>
            <ul className="space-y-2 text-sm">
              {[
                { href: '/quiz', label: 'Car Finder Quiz' },
                { href: '/compare', label: 'Compare Cars' },
                { href: '/shortlist', label: 'My Shortlist' },
              ].map(({ href, label }) => (
                <li key={href}>
                  <Link href={href} className="hover:text-white transition-colors">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-10 pt-6 text-xs text-center">
          <p>© {new Date().getFullYear()} FindMyCar. Prices are indicative ex-showroom. Always verify with your dealer.</p>
        </div>
      </div>
    </footer>
  );
}
