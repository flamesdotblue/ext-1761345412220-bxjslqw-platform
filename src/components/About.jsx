import React from 'react';

export default function About(){
  return (
    <section id="about" className="py-16 bg-neutral-50 border-t">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-semibold tracking-tight">About Us</h2>
        <div className="mt-6 grid md:grid-cols-2 gap-8 items-start">
          <div>
            <p className="text-neutral-700">FocusGrid is built by a small team passionate about humane technology. We believe the web can be a place that restores attention—not just captures it. Our approach keeps interfaces calming, interactions intentional, and results tangible.</p>
            <p className="mt-4 text-neutral-700">We ship fast, listen to users, and iterate with care. More games and insights are on the way: breathing visualizers, spatial memory drills, and streak-friendly journeys.</p>
          </div>
          <div className="p-6 rounded-2xl border bg-white">
            <h3 className="font-semibold">Our Promise</h3>
            <ul className="mt-3 space-y-2 text-neutral-700 text-sm">
              <li>• Calm, accessible design</li>
              <li>• No ads, no dark patterns</li>
              <li>• Clear progress feedback</li>
              <li>• Evidence-informed updates</li>
            </ul>
            <a href="#games" className="mt-4 inline-block px-4 py-2 rounded-md bg-rose-500 text-white hover:bg-rose-600">Do your first 1 cycle now</a>
            <p className="mt-2 text-neutral-500 text-xs">Even 3 minutes can change your state. Don’t defer clarity—practice it.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
