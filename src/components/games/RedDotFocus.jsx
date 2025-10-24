import React, { useEffect, useRef, useState } from 'react';

const LEVELS = {
  easy: { label: 'Easy', duration: 3*60, move: false, speed: 0 },
  medium: { label: 'Medium', duration: 5*60, move: true, speed: 20 },
  hard: { label: 'Hard', duration: 7*60, move: true, speed: 40, distractions: 5 },
};

export default function RedDotFocus() {
  const [level, setLevel] = useState('easy');
  const [running, setRunning] = useState(false);
  const [secondsLeft, setSecondsLeft] = useState(LEVELS[level].duration);
  const [blink, setBlink] = useState(false);
  const [progress, setProgress] = useState(0);
  const containerRef = useRef(null);
  const dotRef = useRef({ x: 50, y: 50 });
  const animRef = useRef(null);

  useEffect(()=>{ setSecondsLeft(LEVELS[level].duration); setProgress(0); setRunning(false); }, [level]);

  useEffect(()=>{
    if (!running) return;
    const start = Date.now();
    const tickTimer = setInterval(()=>{
      setSecondsLeft((s)=>{
        if (s<=1){ clearInterval(tickTimer); setRunning(false); setBlink(true); setTimeout(()=>setBlink(false), 1500); return 0; }
        return s-1;
      });
      const elapsed = (Date.now()-start)/1000;
      setProgress(Math.min(100, (elapsed/LEVELS[level].duration)*100));
    },1000);

    const move = () => {
      if (!containerRef.current) return;
      const { move, speed } = LEVELS[level];
      if (move){
        dotRef.current.x += (Math.random()-0.5) * (speed/10);
        dotRef.current.y += (Math.random()-0.5) * (speed/10);
        dotRef.current.x = Math.max(5, Math.min(95, dotRef.current.x));
        dotRef.current.y = Math.max(5, Math.min(95, dotRef.current.y));
      }
      animRef.current = requestAnimationFrame(move);
    };
    animRef.current = requestAnimationFrame(move);

    return ()=>{ clearInterval(tickTimer); cancelAnimationFrame(animRef.current); };
  }, [running, level]);

  const distractions = [];
  if (LEVELS[level].distractions) {
    for (let i=0;i<LEVELS[level].distractions;i++){
      distractions.push({
        key: i,
        size: 8 + (i%3)*6,
        color: ['#22c55e','#3b82f6','#f59e0b'][i%3],
        top: (10 + i*15) % 80 + 10,
        left: (20 + i*21) % 80 + 10,
        delay: (i%5)*500,
      });
    }
  }

  const mm = String(Math.floor(secondsLeft/60)).padStart(2,'0');
  const ss = String(secondsLeft%60).padStart(2,'0');

  return (
    <div className="bg-white rounded-2xl border border-neutral-200 p-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h3 className="text-xl font-semibold">Red Dot Focus</h3>
          <p className="text-neutral-600">Keep eyes softly on the red dot. When it moves or distractions appear, gently return attention.</p>
        </div>
        <div className="flex items-center gap-2">
          {Object.keys(LEVELS).map(k=> (
            <button key={k} onClick={()=>setLevel(k)} className={`px-3 py-2 rounded-full border text-sm ${level===k?'bg-rose-500 text-white border-rose-500':'bg-white hover:bg-neutral-100'}`}>{LEVELS[k].label}</button>
          ))}
        </div>
      </div>

      <div className="mt-4 flex items-center gap-3">
        {!running && <button onClick={()=>setRunning(true)} className="px-4 py-2 rounded-md bg-rose-500 text-white">Start</button>}
        {running && <button onClick={()=>setRunning(false)} className="px-4 py-2 rounded-md border">Pause</button>}
        <button onClick={()=>{ setRunning(false); setSecondsLeft(LEVELS[level].duration); setProgress(0); }} className="px-4 py-2 rounded-md border">Reset</button>
        <span className="text-neutral-700">Time: <span className="font-medium tabular-nums">{mm}:{ss}</span></span>
      </div>

      <div ref={containerRef} className="mt-6 relative h-80 rounded-2xl border bg-gradient-to-br from-neutral-50 to-white overflow-hidden">
        <div className="absolute inset-x-6 top-4 h-2 bg-neutral-200 rounded-full overflow-hidden">
          <div className="h-full bg-rose-500 transition-all" style={{ width: `${progress}%` }} />
        </div>

        {distractions.map((d)=> (
          <MovingDot key={d.key} size={d.size} color={d.color} initialTop={d.top} initialLeft={d.left} delay={d.delay} />
        ))}

        <div
          className={`absolute rounded-full shadow-lg transition-transform`} 
          style={{
            width: 28,
            height: 28,
            background: blink? '#22c55e' : '#ef4444',
            top: `calc(${dotRef.current.y}% - 14px)`,
            left: `calc(${dotRef.current.x}% - 14px)`,
          }}
        />
      </div>
    </div>
  );
}

function MovingDot({ size=12, color='#3b82f6', initialTop=50, initialLeft=50, delay=0 }){
  const ref = useRef({ top: initialTop, left: initialLeft });
  const elRef = useRef(null);
  useEffect(()=>{
    let raf;
    let t0 = performance.now()+delay;
    const loop = (t)=>{
      const dt = Math.max(0, (t - t0)/1000);
      ref.current.top = initialTop + Math.sin(dt*1.2)*(10+(size%6));
      ref.current.left = initialLeft + Math.cos(dt*0.8)*(12+(size%5));
      if (elRef.current){
        elRef.current.style.top = `calc(${ref.current.top}% - ${size/2}px)`;
        elRef.current.style.left = `calc(${ref.current.left}% - ${size/2}px)`;
      }
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return ()=>cancelAnimationFrame(raf);
  }, [initialTop, initialLeft, size, delay]);
  return <div ref={elRef} className="absolute rounded-full opacity-60" style={{ width: size, height: size, background: color }} />;
}
