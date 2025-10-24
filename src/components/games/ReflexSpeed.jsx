import React, { useEffect, useRef, useState } from 'react';

const COLORS = ['#ef4444','#22c55e','#3b82f6','#f59e0b','#8b5cf6'];

const LEVELS = {
  easy: { label: 'Easy', spawnMs: 1200, redChance: 0.25, missPenalty: 0, wrongPenalty: 1 },
  medium: { label: 'Medium', spawnMs: 900, redChance: 0.2, missPenalty: 1, wrongPenalty: 2 },
  hard: { label: 'Hard', spawnMs: 650, redChance: 0.15, missPenalty: 2, wrongPenalty: 3 },
};

export default function ReflexSpeed(){
  const [level, setLevel] = useState('easy');
  const [running, setRunning] = useState(false);
  const [score, setScore] = useState(0);
  const [high, setHigh] = useState(()=> Number(localStorage.getItem('reflex_high')||0));
  const [ball, setBall] = useState(null); // { color, x, y, id }
  const spawnRef = useRef(null);

  useEffect(()=>{
    const onKey = (e)=>{
      if (e.code !== 'Space') return;
      e.preventDefault();
      if (!running) return;
      if (!ball) {
        setScore(s=> Math.max(0, s - LEVELS[level].wrongPenalty));
        return;
      }
      if (ball.color === '#ef4444') setScore(s=>s+1); else setScore(s=> Math.max(0, s - LEVELS[level].wrongPenalty));
      setBall(null);
    };
    window.addEventListener('keydown', onKey);
    return ()=>window.removeEventListener('keydown', onKey);
  }, [running, ball, level]);

  useEffect(()=>{
    if (!running){ clearInterval(spawnRef.current); return; }
    const { spawnMs, redChance, missPenalty } = LEVELS[level];
    spawnRef.current = setInterval(()=>{
      // next spawn
      const isRed = Math.random() < redChance;
      const color = isRed ? '#ef4444' : COLORS[Math.floor(Math.random()*COLORS.length)];
      const id = Math.random().toString(36).slice(2);
      setBall({ color, x: 10 + Math.random()*80, y: 20 + Math.random()*60, id });
      // auto-clear after window; apply miss penalty if was red
      setTimeout(()=>{
        setBall((b)=>{
          if (b && b.id===id){
            if (b.color === '#ef4444') setScore((s)=> Math.max(0, s - missPenalty));
            return null;
          }
          return b;
        });
      }, Math.max(350, spawnMs - 200));
    }, spawnMs);
    return ()=>clearInterval(spawnRef.current);
  }, [running, level]);

  useEffect(()=>{ if (score>high){ setHigh(score); localStorage.setItem('reflex_high', String(score)); }}, [score, high]);

  const start = () => { setScore(0); setBall(null); setRunning(true); };
  const stop = () => { setRunning(false); setBall(null); };

  return (
    <div className="bg-white rounded-2xl border border-neutral-200 p-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h3 className="text-xl font-semibold">Reflex Speed</h3>
          <p className="text-neutral-600">Press Space when you see a red ball. Wrong or missed reds reduce points. Sharpen reaction and response inhibition.</p>
        </div>
        <div className="flex items-center gap-2">
          {Object.keys(LEVELS).map(k=> (
            <button key={k} onClick={()=>setLevel(k)} className={`px-3 py-2 rounded-full border text-sm ${level===k?'bg-rose-500 text-white border-rose-500':'bg-white hover:bg-neutral-100'}`}>{LEVELS[k].label}</button>
          ))}
        </div>
      </div>

      <div className="mt-4 flex items-center gap-4 text-sm">
        <div className="px-3 py-2 rounded-md bg-neutral-100">Score: <span className="font-semibold tabular-nums">{score}</span></div>
        <div className="px-3 py-2 rounded-md bg-rose-50 text-rose-700 border border-rose-200">High: <span className="font-semibold tabular-nums">{high}</span></div>
        {!running ? (
          <button onClick={start} className="px-4 py-2 rounded-md bg-rose-500 text-white">Start</button>
        ) : (
          <button onClick={stop} className="px-4 py-2 rounded-md border">Stop</button>
        )}
      </div>

      <div className="mt-6 relative h-72 rounded-2xl border bg-gradient-to-br from-neutral-50 to-white overflow-hidden">
        {ball && (
          <div className="absolute rounded-full shadow" style={{ width: 36, height: 36, background: ball.color, top: `calc(${ball.y}% - 18px)`, left: `calc(${ball.x}% - 18px)` }} />
        )}
        {!running && (
          <div className="absolute inset-0 flex items-center justify-center text-neutral-500">Press Start, then hit Space when you see red</div>
        )}
      </div>
    </div>
  );
}
