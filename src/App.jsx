import React from 'react';
import Hero from './components/Hero';
import Features from './components/Features';
import ChatPlayground from './components/ChatPlayground';
import Pricing from './components/Pricing';

export default function App() {
  return (
    <div className="min-h-screen bg-white text-gray-900">
      <header className="px-6 py-5 flex items-center justify-between max-w-6xl mx-auto">
        <div className="text-sm font-semibold tracking-tight">OmniPanel</div>
        <nav className="hidden md:flex items-center gap-6 text-sm text-gray-700">
          <a href="#playground" className="hover:text-gray-900">Playground</a>
          <a href="#pricing" className="hover:text-gray-900">Pricing</a>
          <a href="#" className="rounded-full bg-rose-500 text-white px-4 py-2 hover:opacity-90">Sign in</a>
        </nav>
      </header>

      <main>
        <Hero />
        <Features />
        <ChatPlayground />
        <Pricing />
      </main>

      <footer className="px-6 py-10 max-w-6xl mx-auto text-sm text-gray-500">
        <div className="flex items-center justify-between">
          <span>© {new Date().getFullYear()} OmniPanel</span>
          <a href="#" className="hover:text-gray-700">Privacy & Terms</a>
        </div>
      </footer>
    </div>
  );
}
