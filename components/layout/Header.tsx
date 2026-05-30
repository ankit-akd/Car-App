'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Search, Car, GitCompare, Heart, Menu, X } from 'lucide-react';
import { useAppContext } from '@/lib/context/AppContext';
import { Car as CarType } from '@/lib/types';

export default function Header() {
  const router = useRouter();
  const { compareList, shortlist } = useAppContext();
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState<CarType[]>([]);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  const displaySuggestions = query.length >= 2 ? suggestions : [];

  useEffect(() => {
    if (query.length < 2) return;
    const timer = setTimeout(async () => {
      const res = await fetch(`/api/search?q=${encodeURIComponent(query)}`);
      const data = await res.json();
      setSuggestions(data);
    }, 250);
    return () => clearTimeout(timer);
  }, [query]);

  useEffect(() => {
    function onClickOutside(e: MouseEvent) {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setSuggestions([]);
      }
    }
    document.addEventListener('mousedown', onClickOutside);
    return () => document.removeEventListener('mousedown', onClickOutside);
  }, []);

  function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/cars?q=${encodeURIComponent(query.trim())}`);
      setSuggestions([]);
    }
  }

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 shrink-0">
            <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
              <Car size={18} className="text-white" />
            </div>
            <span className="font-bold text-gray-900 text-lg hidden sm:block">
              Find<span className="text-indigo-600">My</span>Car
            </span>
          </Link>

          {/* Search */}
          <div ref={searchRef} className="flex-1 max-w-xl relative">
            <form onSubmit={handleSearch}>
              <div className="relative">
                <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search by make, model or type…"
                  className="w-full pl-9 pr-4 py-2 text-sm rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
            </form>

            {displaySuggestions.length > 0 && (
              <div className="absolute top-full mt-1 left-0 right-0 bg-white border border-gray-100 rounded-xl shadow-lg overflow-hidden z-50">
                {displaySuggestions.map((car) => (
                  <button
                    key={car.id}
                    onClick={() => {
                      router.push(`/cars/${car.id}`);
                      setSuggestions([]);
                      setQuery('');
                    }}
                    className="w-full text-left px-4 py-2.5 hover:bg-gray-50 flex items-center justify-between gap-2"
                  >
                    <span className="text-sm font-medium text-gray-800">
                      {car.make} {car.model}
                      <span className="ml-1 text-gray-400 font-normal">{car.variant}</span>
                    </span>
                    <span className="text-xs text-gray-400 shrink-0">{car.bodyType}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Nav */}
          <nav className="hidden md:flex items-center gap-1">
            <Link href="/cars" className="px-3 py-2 text-sm text-gray-600 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors">
              Browse
            </Link>
            <Link href="/quiz" className="px-3 py-2 text-sm text-gray-600 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors">
              Find My Car
            </Link>
            <Link href="/compare" className="relative px-3 py-2 text-sm text-gray-600 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors flex items-center gap-1">
              <GitCompare size={16} />
              Compare
              {compareList.length > 0 && (
                <span className="absolute -top-0.5 -right-0.5 w-4 h-4 text-[10px] bg-indigo-600 text-white rounded-full flex items-center justify-center font-bold">
                  {compareList.length}
                </span>
              )}
            </Link>
            <Link href="/shortlist" className="relative px-3 py-2 text-sm text-gray-600 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors flex items-center gap-1">
              <Heart size={16} />
              Shortlist
              {shortlist.length > 0 && (
                <span className="absolute -top-0.5 -right-0.5 w-4 h-4 text-[10px] bg-red-500 text-white rounded-full flex items-center justify-center font-bold">
                  {shortlist.length}
                </span>
              )}
            </Link>
          </nav>

          {/* Mobile menu button */}
          <button
            className="md:hidden p-2 rounded-lg text-gray-600 hover:bg-gray-100"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-gray-100 bg-white px-4 py-3 space-y-1">
          {[
            { href: '/cars', label: 'Browse Cars' },
            { href: '/quiz', label: 'Find My Car Quiz' },
            { href: '/compare', label: `Compare (${compareList.length})` },
            { href: '/shortlist', label: `Shortlist (${shortlist.length})` },
          ].map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 text-sm text-gray-700 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg"
            >
              {label}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
}
