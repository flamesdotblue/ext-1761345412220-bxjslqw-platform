import React from 'react';
import Spline from '@splinetool/react-spline';
import { Rocket } from 'lucide-react';

export default function Hero() {
  return (
    <section id="home" className="relative h-[64vh] min-h-[520px] w-full" aria-label="Hero">
      <div className="absolute inset-0">
        <Spline scene="https://prod.spline.design/zhZFnwyOYLgqlLWk/scene.splinecode" style={{ width: '100%', height: '100%' }} />
      </div>
      <div className="absolute inset-0 bg-gradient-to-b from-white/10 via-white/60 to-white pointer-events-none" />
      <div className="relative z-10 max-w-6xl mx-auto h-full flex flex-col items-center justify-center px-4 text-center">
        <h1 className="text-4xl md:text-6xl font-semibold tracking-tight text-neutral-900">Train Your Focus. Calm Your Mind.</h1>
        <p className="mt-4 text-neutral-700 max-w-2xl">Interactive, science-informed mini tools to deepen attention, build mental clarity, and boost reflexes. Simple. Free. Effective.</p>
        <div className="mt-6 flex items-center gap-3">
          <a href="#games" className="px-5 py-3 rounded-lg bg-rose-500 text-white font-medium hover:bg-rose-600 flex items-center gap-2"><Rocket className="w-4 h-4"/>Start Training</a>
          <a href="#research" className="px-5 py-3 rounded-lg bg-white/80 border border-neutral-200 hover:bg-white">Why it works</a>
        </div>
      </div>
    </section>
  );
}
