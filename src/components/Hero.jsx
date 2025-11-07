import React from 'react';
import Spline from '@splinetool/react-spline';

export default function Hero() {
  return (
    <section className="relative w-full min-h-[70vh] flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0">
        <Spline scene="https://prod.spline.design/zhZFnwyOYLgqlLWk/scene.splinecode" style={{ width: '100%', height: '100%' }} />
      </div>
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-white/80 via-white/40 to-white/20" />

      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        <h1 className="text-4xl md:text-6xl font-semibold tracking-tight text-gray-900">
          One AI to rule them all
        </h1>
        <p className="mt-6 text-base md:text-lg text-gray-600 leading-relaxed">
          ChatGPT, Claude, Gemini, DeepSeek, Grok, and leading Chinese LLMs collaborate in real‑time.
          A single, minimal workspace that fuses their strengths into one final answer.
        </p>
        <div className="mt-10 flex items-center justify-center gap-4">
          <a
            href="#playground"
            className="inline-flex items-center justify-center rounded-full bg-rose-500 text-white px-6 py-3 text-sm font-medium hover:opacity-90 transition-opacity"
          >
            Try the Playground
          </a>
          <a
            href="#pricing"
            className="inline-flex items-center justify-center rounded-full border border-gray-200 text-gray-800 px-6 py-3 text-sm font-medium hover:bg-gray-50 transition"
          >
            View Pricing
          </a>
        </div>
      </div>
    </section>
  );
}
