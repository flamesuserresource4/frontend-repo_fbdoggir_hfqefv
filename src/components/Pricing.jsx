import React from 'react';

const tiers = [
  {
    name: 'Starter',
    price: '$0',
    tagline: 'Good for casual chats',
    features: ['Community models', 'Basic rate limits', 'Image gen (Lite)'],
  },
  {
    name: 'Plus',
    price: '$19',
    tagline: 'Better models and tools',
    features: ['Adds Grok & DeepSeek', 'Image gen (Standard)', 'Priority queue'],
  },
  {
    name: 'Pro',
    price: '$49',
    tagline: 'Top‑tier reasoning',
    features: ['GPT‑4, Claude, Gemini', 'Image gen (Pro)', 'Longer context'],
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    tagline: 'Maximum control',
    features: ['Chinese LLMs & ERNIE', 'Dedicated rate limits', 'Custom tools & SSO'],
  },
];

export default function Pricing() {
  return (
    <section id="pricing" className="max-w-5xl mx-auto px-6 py-20">
      <header className="mb-10 text-center">
        <h2 className="text-2xl md:text-3xl font-semibold text-gray-900">Simple, usage‑aware pricing</h2>
        <p className="mt-2 text-gray-600">Unlock stronger models and generators as you level up.</p>
      </header>

      <div className="grid md:grid-cols-4 gap-6">
        {tiers.map((t) => (
          <div key={t.name} className="rounded-2xl border border-gray-200 p-6 flex flex-col">
            <div>
              <h3 className="text-lg font-medium text-gray-900">{t.name}</h3>
              <div className="mt-1 text-3xl font-semibold text-gray-900">{t.price}</div>
              <p className="mt-1 text-sm text-gray-600">{t.tagline}</p>
            </div>
            <ul className="mt-6 space-y-2 text-sm text-gray-700">
              {t.features.map((f) => (
                <li key={f}>• {f}</li>
              ))}
            </ul>
            <button className="mt-8 rounded-full bg-rose-500 text-white px-5 py-3 text-sm font-medium hover:opacity-90">
              Get started
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}
