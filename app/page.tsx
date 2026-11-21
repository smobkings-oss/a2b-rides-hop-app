'use client';

import { useState, useEffect } from 'react';
import { MapPin, Clock, Car, Calendar, DollarSign, CheckCircle } from 'lucide-react';

interface Ride {
  id: string;
  pickup: string;
  dropoff: string;
  type: 'instant' | 'scheduled';
  scheduledTime?: string;
  price: number;
  status: 'requested' | 'matched' | 'completed';
  createdAt: string;
}

export default function Home() {
  const [pickup, setPickup] = useState('');
  const [dropoff, setDropoff] = useState('');
  const [rideType, setRideType] = useState<'instant' | 'scheduled'>('instant');
  const [scheduledTime, setScheduledTime] = useState('');
  const [estimate, setEstimate] = useState<{ price: number; time: number; distance: number } | null>(null);
  const [booking, setBooking] = useState(false);
  const [confirmed, setConfirmed] = useState(false);
  const [currentRide, setCurrentRide] = useState<Ride | null>(null);

  const calculateEstimate = () => {
    if (!pickup || !dropoff) return;
    // Mock calculation
    const distance = Math.max(2, Math.floor(Math.random() * 15) + 3);
    const time = Math.floor(distance * 2.5) + 5;
    const base = 4.5;
    const perMile = 1.75;
    const surge = rideType === 'instant' ? 1.0 : 1.1;
    const price = Math.round((base + distance * perMile) * surge * 100) / 100;
    setEstimate({ price, time, distance });
  };

  useEffect(() => {
    if (pickup && dropoff) {
      const timer = setTimeout(calculateEstimate, 500);
      return () => clearTimeout(timer);
    }
  }, [pickup, dropoff, rideType]);

  const handleBook = () => {
    if (!estimate || !pickup || !dropoff) return;
    if (rideType === 'scheduled' && !scheduledTime) {
      alert('Please select a date and time for your scheduled ride.');
      return;
    }

    setBooking(true);
    setTimeout(() => {
      const ride: Ride = {
        id: crypto.randomUUID(),
        pickup,
        dropoff,
        type: rideType,
        scheduledTime: rideType === 'scheduled' ? scheduledTime : undefined,
        price: estimate.price,
        status: 'requested',
        createdAt: new Date().toISOString(),
      };

      // Save to localStorage
      const existing = JSON.parse(localStorage.getItem('a2b-rides') || '[]');
      existing.unshift(ride);
      localStorage.setItem('a2b-rides', JSON.stringify(existing));

      setCurrentRide(ride);
      setConfirmed(true);
      setBooking(false);

      // Simulate matching
      setTimeout(() => {
        setCurrentRide((prev) => prev ? { ...prev, status: 'matched' } : null);
      }, 2500);
    }, 1200);
  };

  const reset = () => {
    setConfirmed(false);
    setCurrentRide(null);
    setPickup('');
    setDropoff('');
    setEstimate(null);
    setScheduledTime('');
  };

  return (
    <div className="min-h-screen bg-black">
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-gold-500/10 via-transparent to-black" />
        <div className="max-w-4xl mx-auto px-4 py-16 text-center relative">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            <span className="holographic-text">Hop On</span> A2B Rides
          </h1>
          <p className="text-xl text-gray-300 mb-2">
            Premium rides. Instant booking or schedule ahead.
          </p>
          <p className="text-gold-400">NW Ohio • Better pay for drivers • Transparent pricing</p>
        </div>
      </section>

      <div className="max-w-2xl mx-auto px-4 pb-20">
        {!confirmed ? (
          <div className="bg-zinc-900/80 backdrop-blur border border-gold-500/20 rounded-2xl p-6 shadow-2xl">
            <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2">
              <Car className="text-gold-400" />
              Book Your Ride
            </h2>

            {/* Ride Type Toggle */}
            <div className="flex gap-2 mb-6 bg-black/50 p-1 rounded-xl">
              <button
                onClick={() => setRideType('instant')}
                className={`flex-1 py-3 rounded-lg font-medium transition ${
                  rideType === 'instant'
                    ? 'bg-gold-500 text-black'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                Instant
              </button>
              <button
                onClick={() => setRideType('scheduled')}
                className={`flex-1 py-3 rounded-lg font-medium transition ${
                  rideType === 'scheduled'
                    ? 'bg-gold-500 text-black'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                Scheduled
              </button>
            </div>

            {/* Locations */}
            <div className="space-y-4 mb-6">
              <div className="relative">
                <MapPin className="absolute left-3 top-3.5 text-gold-400" size={20} />
                <input
                  type="text"
                  placeholder="Pickup location"
                  value={pickup}
                  onChange={(e) => setPickup(e.target.value)}
                  className="w-full bg-black/60 border border-zinc-700 rounded-xl pl-11 pr-4 py-3.5 focus:outline-none focus:border-gold-500 transition"
                />
              </div>
              <div className="relative">
                <MapPin className="absolute left-3 top-3.5 text-cyan-400" size={20} />
                <input
                  type="text"
                  placeholder="Dropoff location"
                  value={dropoff}
                  onChange={(e) => setDropoff(e.target.value)}
                  className="w-full bg-black/60 border border-zinc-700 rounded-xl pl-11 pr-4 py-3.5 focus:outline-none focus:border-gold-500 transition"
                />
              </div>

              {rideType === 'scheduled' && (
                <div className="relative">
                  <Calendar className="absolute left-3 top-3.5 text-gold-400" size={20} />
                  <input
                    type="datetime-local"
                    value={scheduledTime}
                    onChange={(e) => setScheduledTime(e.target.value)}
                    min={new Date().toISOString().slice(0, 16)}
                    className="w-full bg-black/60 border border-zinc-700 rounded-xl pl-11 pr-4 py-3.5 focus:outline-none focus:border-gold-500 transition text-white"
                  />
                </div>
              )}
            </div>

            {/* Estimate */}
            {estimate && (
              <div className="bg-black/40 border border-gold-500/30 rounded-xl p-4 mb-6">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-gray-400">Estimated fare</span>
                  <span className="text-2xl font-bold text-gold-400">${estimate.price.toFixed(2)}</span>
                </div>
                <div className="flex gap-6 text-sm text-gray-400">
                  <span className="flex items-center gap-1">
                    <Clock size={14} /> {estimate.time} min
                  </span>
                  <span>{estimate.distance} mi</span>
                </div>
              </div>
            )}

            <button
              onClick={handleBook}
              disabled={!pickup || !dropoff || booking || (rideType === 'scheduled' && !scheduledTime)}
              className="w-full bg-gold-gradient text-black font-bold py-4 rounded-xl hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transition flex items-center justify-center gap-2"
            >
              {booking ? (
                <>Finding your ride...</>
              ) : (
                <>
                  <Car size={20} />
                  {rideType === 'instant' ? 'Request Instant Ride' : 'Schedule Ride'}
                </>
              )}
            </button>

            <p className="text-center text-xs text-gray-500 mt-4">
              Transparent pricing • No surge surprises in beta • Local NW Ohio drivers
            </p>
          </div>
        ) : currentRide && (
          <div className="bg-zinc-900/80 border border-gold-500/30 rounded-2xl p-8 text-center">
            <div className="mx-auto w-16 h-16 rounded-full bg-gold-500/20 flex items-center justify-center mb-4">
              <CheckCircle className="text-gold-400" size={32} />
            </div>
            <h2 className="text-2xl font-bold mb-2">
              {currentRide.status === 'matched' ? 'Driver Matched!' : 'Ride Requested'}
            </h2>
            <p className="text-gray-300 mb-6">
              {currentRide.status === 'matched'
                ? 'Your A2B driver is on the way.'
                : 'Matching you with a nearby driver...'}
            </p>

            <div className="bg-black/50 rounded-xl p-5 text-left space-y-3 mb-6">
              <div className="flex justify-between">
                <span className="text-gray-400">From</span>
                <span className="font-medium">{currentRide.pickup}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">To</span>
                <span className="font-medium">{currentRide.dropoff}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Type</span>
                <span className="capitalize">{currentRide.type}</span>
              </div>
              {currentRide.scheduledTime && (
                <div className="flex justify-between">
                  <span className="text-gray-400">When</span>
                  <span>{new Date(currentRide.scheduledTime).toLocaleString()}</span>
                </div>
              )}
              <div className="flex justify-between border-t border-white/10 pt-3">
                <span className="text-gray-400">Fare</span>
                <span className="text-gold-400 font-bold text-lg">${currentRide.price.toFixed(2)}</span>
              </div>
            </div>

            {currentRide.status === 'matched' && (
              <div className="mb-6 p-4 bg-gold-500/10 rounded-xl border border-gold-500/30">
                <p className="font-medium">Tesla Model 3 Navigator</p>
                <p className="text-sm text-gray-300">Driver: Alex • 4.97 ★ • ETA 4 min</p>
              </div>
            )}

            <button
              onClick={reset}
              className="w-full border border-gold-500 text-gold-400 py-3 rounded-xl hover:bg-gold-500/10 transition"
            >
              Book Another Ride
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
