'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Car, Calendar, User, Menu, X } from 'lucide-react';
import { useState } from 'react';

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const links = [
    { href: '/', label: 'Book Ride', icon: Car },
    { href: '/rides', label: 'My Rides', icon: Calendar },
    { href: '/profile', label: 'Profile', icon: User },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black/90 backdrop-blur-md border-b border-gold-500/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="flex items-center gap-2">
            <div className="holographic-border rounded-lg p-1">
              <div className="bg-black px-3 py-1 rounded-md">
                <span className="text-xl font-bold holographic-text">A2B</span>
              </div>
            </div>
            <span className="hidden sm:inline text-gold-400 font-semibold">Rides</span>
          </Link>

          {/* Desktop */}
          <div className="hidden md:flex items-center gap-1">
            {links.map((link) => {
              const Icon = link.icon;
              const active = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg transition ${
                    active
                      ? 'bg-gold-500/20 text-gold-400'
                      : 'text-gray-300 hover:text-gold-400 hover:bg-white/5'
                  }`}
                >
                  <Icon size={18} />
                  {link.label}
                </Link>
              );
            })}
          </div>

          <button className="md:hidden text-gold-400" onClick={() => setOpen(!open)}>
            {open ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden bg-black border-t border-gold-500/20">
          {links.map((link) => {
            const Icon = link.icon;
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="flex items-center gap-3 px-6 py-4 border-b border-white/5 text-gray-200 hover:bg-gold-500/10"
              >
                <Icon size={20} />
                {link.label}
              </Link>
            );
          })}
        </div>
      )}
    </nav>
  );
}
