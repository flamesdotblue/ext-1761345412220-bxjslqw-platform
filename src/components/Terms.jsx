import React from 'react';

export default function Terms(){
  return (
    <section id="terms" className="py-16 bg-white border-t">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-semibold tracking-tight">Terms and Conditions</h2>
        <div className="mt-4 text-neutral-700 space-y-3 text-sm">
          <p>FocusGrid is a wellness and productivity tool for general informational purposes. It is not medical or psychological advice. If you have health concerns, consult a professional.</p>
          <p>We store minimal data in your browser (like session counts and high scores) via localStorage. Clearing your browser data clears this information. We do not sell or share your data.</p>
          <p>Using the tools is at your own discretion. Avoid use while driving or performing tasks requiring undivided real-world attention. Take breaks if you experience eye strain or discomfort.</p>
          <p>By using FocusGrid, you agree to these terms. We may update them as the product evolves.</p>
        </div>
      </div>
    </section>
  );
}
