import React, { useEffect, useRef, useState } from 'react';

const todayKey = () => new Date().toISOString().slice(0,10);

export default function PomodoroTimer() {
  const [focusMin, setFocusMin] = useState(25);
  const [breakMin, setBreakMin] = useState(5);
  const [mode, setMode] = useState('idle'); // idle | focus | break
  const [secondsLeft, setSecondsLeft] = useState(0);
  const [cyclesToday, setCyclesToday] = useState(() => Number(localStorage.getItem('cycles_'+todayKey())||0));
  const intervalRef = useRef(null);

  useEffect(() => {
    if (mode === 'idle') return;
    intervalRef.current = setInterval(() => {
      setSecondsLeft((s) => {
        if (s <= 1) {
          clearInterval(intervalRef.current);
          if (mode === 'focus') {
            setMode('break');
            setSecondsLeft(breakMin * 60);
          } else {
            const key = 'cycles_'+todayKey();
            const next = Number(localStorage.getItem(key)||0) + 1;
            localStorage.setItem(key, String(next));
            setCyclesToday(next);
            setMode('idle');
          }
          return 0;
        }
        return s - 1;
      });
    }, 1000);
    return () => clearInterval(intervalRef.current);
  }, [mode, breakMin]);

  const start = () => { setMode('focus'); setSecondsLeft(focusMin * 60); };
  const pause = () => clearInterval(intervalRef.current);
  const reset = () => { clearInterval(intervalRef.current); setMode('idle'); setSecondsLeft(0); };

  const mm = String(Math.floor(secondsLeft / 60)).padStart(2,'0');
  const ss = String(secondsLeft % 60).padStart(2,'0');

  return (
    <div className="bg-white rounded-2xl border border-neutral-200 p-6">
      <h3 className="text-xl font-semibold">Pomodoro Focus</h3>
      <p className="text-neutral-600 mt-1">Customize focus and break blocks. Each focus+break = 1 cycle. We track daily cycles for gentle accountability.</p>
      <div className="mt-4 grid sm:grid-cols-3 gap-4">
        <div className="flex items-center gap-2"><label className="text-sm">Focus (min)</label><input type="number" min={5} max={90} value={focusMin} onChange={(e)=>setFocusMin(Math.max(5, Math.min(90, Number(e.target.value)||25)))} className="w-24 px-3 py-2 border rounded-md"/></div>
        <div className="flex items-center gap-2"><label className="text-sm">Break (min)</label><input type="number" min={2} max={30} value={breakMin} onChange={(e)=>setBreakMin(Math.max(2, Math.min(30, Number(e.target.value)||5)))} className="w-24 px-3 py-2 border rounded-md"/></div>
        <div className="flex items-center gap-2"><span className="text-sm">Cycles today</span><span className="px-3 py-2 rounded-md bg-rose-50 border border-rose-200 text-rose-700 font-medium">{cyclesToday}</span></div>
      </div>
      <div className="mt-6 flex flex-col sm:flex-row sm:items-end gap-6">
        <div className="flex-1">
          <div className="text-6xl font-light tabular-nums text-neutral-800">{mode==='idle' ? `${String(focusMin).padStart(2,'0')}:00` : `${mm}:${ss}`}</div>
          <p className="mt-2 text-neutral-500 text-sm">Mode: <span className="font-medium text-neutral-800">{mode}</span></p>
        </div>
        <div className="flex gap-2">
          {mode==='idle' && <button onClick={start} className="px-4 py-2 rounded-md bg-rose-500 text-white hover:bg-rose-600">Start Focus</button>}
          {mode!=='idle' && <button onClick={pause} className="px-4 py-2 rounded-md border">Pause</button>}
          {mode!=='idle' && <button onClick={()=>{ if(mode==='focus'){setMode('break'); setSecondsLeft(breakMin*60)} else { setMode('idle'); }} } className="px-4 py-2 rounded-md border">Skip</button>}
          {mode!=='idle' && <button onClick={reset} className="px-4 py-2 rounded-md border">Reset</button>}
        </div>
      </div>
      <div className="mt-6 text-sm text-neutral-600">
        Tips: Try 4 cycles for a strong session. Keep breaks screen-light. A short stretch refuels attention.
      </div>
    </div>
  );
}
