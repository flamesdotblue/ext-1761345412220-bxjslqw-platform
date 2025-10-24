import React, { useEffect, useMemo, useRef, useState } from 'react';

function useChime() {
  const ctxRef = useRef(null);
  const play = async () => {
    if (!ctxRef.current) ctxRef.current = new (window.AudioContext || window.webkitAudioContext)();
    const ctx = ctxRef.current;
    const o = ctx.createOscillator();
    const g = ctx.createGain();
    o.type = 'sine';
    o.frequency.setValueAtTime(660, ctx.currentTime);
    g.gain.setValueAtTime(0.0001, ctx.currentTime);
    g.gain.exponentialRampToValueAtTime(0.2, ctx.currentTime + 0.02);
    g.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 1.6);
    o.connect(g).connect(ctx.destination);
    o.start();
    o.stop(ctx.currentTime + 1.7);
    // gentle second partial
    const o2 = ctx.createOscillator();
    const g2 = ctx.createGain();
    o2.type = 'sine';
    o2.frequency.setValueAtTime(880, ctx.currentTime + 0.05);
    g2.gain.setValueAtTime(0.0001, ctx.currentTime + 0.05);
    g2.gain.exponentialRampToValueAtTime(0.12, ctx.currentTime + 0.1);
    g2.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 1.2);
    o2.connect(g2).connect(ctx.destination);
    o2.start(ctx.currentTime + 0.05);
    o2.stop(ctx.currentTime + 1.3);
  };
  return play;
}

const RECS = [
  'Find a comfortable posture with a relaxed spine.',
  'Gently close your eyes or soften your gaze.',
  'Rest hands on lap; relax the jaw and shoulders.',
  'Breathe in through the nose, out through the nose or mouth.',
  'If your mind wanders, kindly return to the breath.',
];

export default function MeditationTimer() {
  const [minutes, setMinutes] = useState(5);
  const [secondsLeft, setSecondsLeft] = useState(0);
  const [running, setRunning] = useState(false);
  const [started, setStarted] = useState(false);
  const intervalRef = useRef(null);
  const chime = useChime();

  const totalSeconds = useMemo(() => minutes * 60, [minutes]);
  const progress = started ? (1 - secondsLeft / totalSeconds) * 100 : 0;

  useEffect(() => {
    if (!running) return;
    intervalRef.current = setInterval(() => {
      setSecondsLeft((s) => {
        if (s <= 1) {
          clearInterval(intervalRef.current);
          setRunning(false);
          setStarted(false);
          chime();
          return 0;
        }
        return s - 1;
      });
    }, 1000);
    return () => clearInterval(intervalRef.current);
  }, [running, chime]);

  const start = () => {
    if (minutes <= 0) return;
    setSecondsLeft(minutes * 60);
    setStarted(true);
    setRunning(true);
  };

  const pause = () => setRunning(false);
  const resume = () => secondsLeft > 0 && setRunning(true);
  const reset = () => {
    setRunning(false);
    setStarted(false);
    setSecondsLeft(0);
  };

  const mm = String(Math.floor(secondsLeft / 60)).padStart(2, '0');
  const ss = String(secondsLeft % 60).padStart(2, '0');

  return (
    <div className="bg-white rounded-2xl border border-neutral-200 overflow-hidden">
      <div className="p-6 grid md:grid-cols-2 gap-6 items-center">
        <div>
          <h3 className="text-xl font-semibold">Meditation Timer</h3>
          <p className="text-neutral-600 mt-1">A calm space to breathe. Gentle guidance, soft end-chime, and a soothing display.</p>
          <ul className="mt-4 space-y-2 text-neutral-700">
            {RECS.map((r, i) => (
              <li key={i} className="flex gap-2"><span className="text-rose-500">•</span><span>{r}</span></li>
            ))}
          </ul>
          <div className="mt-4 flex items-center gap-3">
            <label className="text-sm">Minutes</label>
            <input type="number" min={1} max={120} value={minutes} onChange={(e)=>setMinutes(Math.max(1, Math.min(120, Number(e.target.value)||1)))} className="w-24 px-3 py-2 rounded-md border"/>
          </div>
          <div className="mt-4 flex gap-2">
            {!started && <button onClick={start} className="px-4 py-2 rounded-md bg-rose-500 text-white hover:bg-rose-600">Start</button>}
            {started && running && <button onClick={pause} className="px-4 py-2 rounded-md border">Pause</button>}
            {started && !running && secondsLeft>0 && <button onClick={resume} className="px-4 py-2 rounded-md bg-rose-500 text-white">Resume</button>}
            {started && <button onClick={reset} className="px-4 py-2 rounded-md border">Reset</button>}
          </div>
        </div>
        <div className="relative p-6">
          <div className="aspect-square rounded-2xl bg-gradient-to-br from-rose-50 to-white border flex items-center justify-center">
            <div className="text-center">
              <div className="text-6xl font-light tabular-nums text-neutral-800">{started ? `${mm}:${ss}` : `${String(minutes).padStart(2,'0')}:00`}</div>
              <div className="mt-4 w-64 h-2 bg-neutral-200 rounded-full overflow-hidden">
                <div className="h-full bg-rose-500 transition-all" style={{width: `${progress}%`}} />
              </div>
              <p className="mt-4 text-neutral-500 text-sm">Breathe naturally. If thoughts arise, acknowledge and return.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
