'use client';

// import { ArrowDown, Globe } from 'lucide-react';

export default function Hero() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-white to-slate-100">
      <div className="container mx-auto px-6 text-center">
        <h1 className="text-4xl md:text-6xl font-bold text-slate-900 mb-6">
          Wanderlust Chronicles
        </h1>
        <p className="text-xl text-slate-600 mb-8 max-w-2xl mx-auto">
          AI-powered travel stories and professional insights for the modern explorer.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-3 rounded-lg font-medium transition-colors">
            Explore Destinations
          </button>
          <button className="border border-purple-600 text-purple-600 hover:bg-purple-50 px-8 py-3 rounded-lg font-medium transition-colors">
            Learn More
          </button>
        </div>
      </div>
    </div>
  );
}