import React from 'react';
import { Star, Target, Timer } from 'lucide-react';

export default function ResearchAndPricing(){
  return (
    <section id="research" className="py-16 bg-white border-t">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-semibold tracking-tight">Why This Works</h2>
        <p className="text-neutral-600 mt-2 max-w-2xl">Our mini tools leverage principles from attentional control, mindfulness, and cognitive training to build consistency without overwhelming you.</p>

        <div className="mt-8 grid md:grid-cols-3 gap-6">
          <Card icon={<Timer className="w-5 h-5"/>} title="Focused Intervals" desc="Short, intense focus blocks reduce switching cost and improve sustained attention over time."/>
          <Card icon={<Target className="w-5 h-5"/>} title="Visual Anchors" desc="Holding gaze on a single target trains selective attention and reduces distractibility."/>
          <Card icon={<Star className="w-5 h-5"/>} title="Rapid Feedback" desc="Instant scoring builds motivation and refines fast response with inhibition control."/>
        </div>

        <div className="mt-10 grid md:grid-cols-2 gap-6">
          <div className="p-6 rounded-2xl border bg-neutral-50">
            <h3 className="text-xl font-semibold">Research Snapshots</h3>
            <ul className="mt-3 space-y-2 text-neutral-700 text-sm">
              <li>• Brief mindfulness sessions (5–10 min) can enhance attention and reduce mind-wandering in the short term.</li>
              <li>• Pomodoro-style cycles help maintain deep work by lowering mental fatigue and context switching.</li>
              <li>• Fixation tasks improve gaze stability and selective attention, which generalize to everyday focus.</li>
              <li>• Go/No-Go style reflex tasks improve response inhibition—key for resisting distractions.</li>
            </ul>
            <p className="mt-3 text-neutral-500 text-xs">These summaries synthesize findings from cognitive psychology and HCI literature; always pair training with sleep, hydration, and movement for best results.</p>
          </div>

          <div className="p-6 rounded-2xl border bg-gradient-to-br from-rose-50 to-white">
            <h3 className="text-xl font-semibold">Pricing</h3>
            <p className="text-neutral-600">Simple, honest, and designed to help more people focus.</p>
            <div className="mt-4 p-5 rounded-xl bg-white border">
              <div className="text-2xl font-semibold">Free <span className="text-sm font-normal text-neutral-500">forever</span></div>
              <ul className="mt-3 space-y-2 text-sm text-neutral-700">
                <li>• Unlimited sessions</li>
                <li>• All four tools included</li>
                <li>• Local progress tracking</li>
                <li>• No ads, no distractions</li>
              </ul>
              <a href="#games" className="mt-4 inline-block px-4 py-2 rounded-md bg-rose-500 text-white hover:bg-rose-600">Start Free</a>
              <p className="mt-3 text-neutral-500 text-xs">Leaving now means tomorrow’s you starts over. Stay for 5 minutes—prove you can keep a promise to yourself.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Card({ icon, title, desc }){
  return (
    <div className="p-6 rounded-2xl border bg-neutral-50">
      <div className="w-9 h-9 rounded-lg bg-white border flex items-center justify-center text-rose-600">{icon}</div>
      <h3 className="mt-3 font-semibold">{title}</h3>
      <p className="text-neutral-600 text-sm mt-1">{desc}</p>
    </div>
  );
}
