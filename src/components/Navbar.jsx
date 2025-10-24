import React from 'react';
import { Brain, Home, Gamepad2, Info, ShieldCheck } from 'lucide-react';

export default function Navbar() {
  return (
    <header className="sticky top-0 z-20 bg-white/70 backdrop-blur border-b border-neutral-200">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <a href="#top" className="flex items-center gap-2">
          <Brain className="w-6 h-6 text-rose-500" />
          <span className="font-semibold tracking-tight">FocusGrid</span>
        </a>
        <nav className="hidden md:flex items-center gap-6 text-sm">
          <a href="#home" className="flex items-center gap-1 hover:text-rose-600"><Home className="w-4 h-4"/>Home</a>
          <a href="#games" className="flex items-center gap-1 hover:text-rose-600"><Gamepad2 className="w-4 h-4"/>Games</a>
          <a href="#research" className="hover:text-rose-600">Research & Pricing</a>
          <a href="#about" className="flex items-center gap-1 hover:text-rose-600"><Info className="w-4 h-4"/>About</a>
          <a href="#terms" className="flex items-center gap-1 hover:text-rose-600"><ShieldCheck className="w-4 h-4"/>Terms</a>
        </nav>
        <a href="#games" className="px-3 py-2 rounded-md bg-rose-500 text-white text-sm hover:bg-rose-600">Start Focusing</a>
      </div>
    </header>
  );
}
