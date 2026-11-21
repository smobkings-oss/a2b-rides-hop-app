'use client';

import { useState, useEffect } from 'react';
import { User, Star, Shield, Car } from 'lucide-react';

export default function ProfilePage() {
  const [name, setName] = useState('Rider');
  const [email, setEmail] = useState('');
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const profile = localStorage.getItem('a2b-profile');
    if (profile) {
      const p = JSON.parse(profile);
      setName(p.name || 'Rider');
      setEmail(p.email || '');
    }
  }, []);

  const saveProfile = () => {
    localStorage.setItem('a2b-profile', JSON.stringify({ name, email }));
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-10">
      <div className="text-center mb-10">
        <div className="w-24 h-24 mx-auto rounded-full bg-gradient-to-br from-gold-500 to-cyan-500 p-1 mb-4">
          <div className="w-full h-full rounded-full bg-black flex items-center justify-center">
            <User size={40} className="text-gold-400" />
          </div>
        </div>
        <h1 className="text-3xl font-bold">{name}</h1>
        <p className="text-gray-400">A2B Rides Member</p>
      </div>

      <div className="bg-zinc-900/70 border border-zinc-800 rounded-2xl p-6 mb-6">
        <h2 className="text-lg font-semibold mb-4">Profile</h2>
        <div className="space-y-4">
          <div>
            <label className="text-sm text-gray-400">Name</label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full mt-1 bg-black/50 border border-zinc-700 rounded-lg px-4 py-2.5 focus:outline-none focus:border-gold-500"
            />
          </div>
          <div>
            <label className="text-sm text-gray-400">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="w-full mt-1 bg-black/50 border border-zinc-700 rounded-lg px-4 py-2.5 focus:outline-none focus:border-gold-500"
            />
          </div>
          <button
            onClick={saveProfile}
            className="w-full bg-gold-500 text-black font-semibold py-3 rounded-lg hover:bg-gold-400 transition"
          >
            {saved ? 'Saved!' : 'Save Profile'}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-4 text-center">
          <Star className="mx-auto text-gold-400 mb-2" />
          <div className="text-2xl font-bold">4.9</div>
          <div className="text-xs text-gray-400">Your Rating</div>
        </div>
        <div className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-4 text-center">
          <Shield className="mx-auto text-cyan-400 mb-2" />
          <div className="text-2xl font-bold">Verified</div>
          <div className="text-xs text-gray-400">Safety</div>
        </div>
      </div>

      <div className="mt-8 text-center text-sm text-gray-500">
        <Car className="inline mr-1" size={16} />
        Powered by A2B Rides • NW Ohio
      </div>
    </div>
  );
}
