'use client';

import { useEffect, useState } from 'react';
import { Calendar, MapPin, Clock, Car } from 'lucide-react';

interface Ride {
  id: string;
  pickup: string;
  dropoff: string;
  type: 'instant' | 'scheduled';
  scheduledTime?: string;
  price: number;
  status: string;
  createdAt: string;
}

export default function RidesPage() {
  const [rides, setRides] = useState<Ride[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem('a2b-rides');
    if (stored) {
      setRides(JSON.parse(stored));
    }
  }, []);

  if (rides.length === 0) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-20 text-center">
        <Car className="mx-auto text-gold-400 mb-4" size={48} />
        <h2 className="text-2xl font-bold mb-2">No rides yet</h2>
        <p className="text-gray-400">Book your first instant or scheduled ride from the home page.</p>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 flex items-center gap-3">
        <Calendar className="text-gold-400" />
        My Rides
      </h1>

      <div className="space-y-4">
        {rides.map((ride) => (
          <div
            key={ride.id}
            className="bg-zinc-900/70 border border-zinc-800 rounded-xl p-5 hover:border-gold-500/40 transition"
          >
            <div className="flex justify-between items-start mb-3">
              <div>
                <span className={`inline-block px-2 py-0.5 text-xs rounded-full font-medium ${
                  ride.type === 'instant' ? 'bg-gold-500/20 text-gold-400' : 'bg-cyan-500/20 text-cyan-400'
                }`}>
                  {ride.type}
                </span>
                <span className="ml-2 text-xs text-gray-500 capitalize">{ride.status}</span>
              </div>
              <span className="text-gold-400 font-bold">${ride.price.toFixed(2)}</span>
            </div>

            <div className="space-y-2 text-sm">
              <div className="flex items-start gap-2">
                <MapPin size={16} className="text-gold-400 mt-0.5 flex-shrink-0" />
                <div>
                  <div className="text-gray-400 text-xs">Pickup</div>
                  <div>{ride.pickup}</div>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <MapPin size={16} className="text-cyan-400 mt-0.5 flex-shrink-0" />
                <div>
                  <div className="text-gray-400 text-xs">Dropoff</div>
                  <div>{ride.dropoff}</div>
                </div>
              </div>
              {ride.scheduledTime && (
                <div className="flex items-center gap-2 text-gray-300">
                  <Clock size={16} className="text-gold-400" />
                  {new Date(ride.scheduledTime).toLocaleString()}
                </div>
              )}
              <div className="text-xs text-gray-500 pt-2">
                Booked {new Date(ride.createdAt).toLocaleString()}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
