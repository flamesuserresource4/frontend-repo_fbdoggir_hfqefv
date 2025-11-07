import React from 'react';

const features = [
  {
    title: 'Model Council',
    desc: 'Responses are synthesized from a panel of top models for balanced, reliable answers.',
  },
  {
    title: 'Tool Augmentation',
    desc: 'Plug in image and video generators like Nano Bana and Sea Dream when needed.',
  },
  {
    title: 'Minimal Workspace',
    desc: 'A calm interface with generous whitespace to keep focus on ideas, not clutter.',
  },
];

export default function Features() {
  return (
    <section className="max-w-5xl mx-auto px-6 py-20">
      <div className="grid md:grid-cols-3 gap-8">
        {features.map((f) => (
          <div key={f.title} className="rounded-2xl border border-gray-200 p-6">
            <h3 className="text-lg font-medium text-gray-900">{f.title}</h3>
            <p className="mt-2 text-sm text-gray-600 leading-relaxed">{f.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
