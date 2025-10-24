import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import GamesHub from './components/GamesHub';
import ResearchAndPricing from './components/ResearchAndPricing';
import About from './components/About';
import Terms from './components/Terms';
import Footer from './components/Footer';

function App() {
  return (
    <div className="min-h-screen bg-neutral-50 text-neutral-900">
      <Navbar />
      <Hero />
      <main className="relative z-10">
        <GamesHub />
        <ResearchAndPricing />
        <About />
        <Terms />
      </main>
      <Footer />
    </div>
  );
}

export default App;
