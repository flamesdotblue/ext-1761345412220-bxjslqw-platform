import React, { useState } from 'react';
import MeditationTimer from './games/MeditationTimer';
import PomodoroTimer from './games/PomodoroTimer';
import RedDotFocus from './games/RedDotFocus';
import ReflexSpeed from './games/ReflexSpeed';

const TABS = [
  { key: 'meditation', label: 'Meditation Timer' },
  { key: 'pomodoro', label: 'Pomodoro Focus' },
  { key: 'reddot', label: 'Red Dot Focus' },
  { key: 'reflex', label: 'Reflex Speed' },
];

export default function GamesHub() {
  const [tab, setTab] = useState('meditation');

  return (
    <section id="games" className="py-16 bg-neutral-50">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
          <div>
            <h2 className="text-3xl md:text-4xl font-semibold tracking-tight">Training Hub</h2>
            <p className="text-neutral-600 mt-1">Pick a tool and start strengthening your attention today.</p>
          </div>
          <div className="flex flex-wrap gap-2 mt-2">
            {TABS.map((t) => (
              <button
                key={t.key}
                onClick={() => setTab(t.key)}
                className={`px-4 py-2 rounded-full border text-sm ${tab === t.key ? 'bg-rose-500 text-white border-rose-500' : 'bg-white hover:bg-neutral-100 border-neutral-200'}`}
              >
                {t.label}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-8 grid grid-cols-1">
          {tab === 'meditation' && <MeditationTimer />}
          {tab === 'pomodoro' && <PomodoroTimer />}
          {tab === 'reddot' && <RedDotFocus />}
          {tab === 'reflex' && <ReflexSpeed />}
        </div>
      </div>
    </section>
  );
}
