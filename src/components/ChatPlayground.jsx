import React, { useState, useEffect, useRef } from 'react';

const systemModels = [
  { id: 'gpt-4', label: 'ChatGPT', tier: 'Pro' },
  { id: 'claude-3', label: 'Claude', tier: 'Pro' },
  { id: 'gemini-1.5', label: 'Gemini', tier: 'Pro' },
  { id: 'deepseek', label: 'DeepSeek', tier: 'Plus' },
  { id: 'grok', label: 'Grok', tier: 'Plus' },
  { id: 'ernie', label: 'Baidu ERNIE', tier: 'Enterprise' },
];

export default function ChatPlayground() {
  const [messages, setMessages] = useState([
    { role: 'assistant', content: 'Ask anything. I will consult multiple models and reply with a consensus.' },
  ]);
  const [input, setInput] = useState('');
  const [selected, setSelected] = useState(systemModels.map(m => m.id));
  const [isLoading, setIsLoading] = useState(false);
  const endRef = useRef(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const toggleModel = (id) => {
    setSelected(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
  };

  const onSend = async () => {
    if (!input.trim()) return;
    const userMsg = { role: 'user', content: input.trim() };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    // Placeholder UX: This would call the backend to orchestrate multi‑model discussion
    // For now we simulate a short thoughtful response
    setTimeout(() => {
      const reply = {
        role: 'assistant',
        content:
          `Consensus across ${selected.length} models:\n` +
          `• Core idea: ${input.trim()}\n` +
          '• Highlights from the panel are synthesized into a clear answer.\n' +
          'Upgrade tiers unlock higher‑end models for deeper reasoning and richer tools.\n',
      };
      setMessages(prev => [...prev, reply]);
      setIsLoading(false);
    }, 800);
  };

  return (
    <section id="playground" className="max-w-5xl mx-auto px-6 py-20">
      <header className="mb-8">
        <h2 className="text-2xl md:text-3xl font-semibold text-gray-900">Playground</h2>
        <p className="mt-2 text-gray-600">Pick which brains to combine. Responses synthesize the best of each model.</p>
      </header>

      <div className="grid md:grid-cols-[260px,1fr] gap-8">
        <aside className="space-y-4">
          <div className="rounded-2xl border border-gray-200 p-4">
            <h3 className="text-sm font-medium text-gray-800">Models</h3>
            <div className="mt-3 space-y-2">
              {systemModels.map(m => (
                <label key={m.id} className="flex items-center justify-between gap-3 text-sm text-gray-700">
                  <div className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      className="h-4 w-4 rounded border-gray-300 text-rose-500 focus:ring-rose-500"
                      checked={selected.includes(m.id)}
                      onChange={() => toggleModel(m.id)}
                    />
                    <span>{m.label}</span>
                  </div>
                  <span className="text-xs text-gray-500">{m.tier}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="rounded-2xl border border-gray-200 p-4">
            <h3 className="text-sm font-medium text-gray-800">Generators</h3>
            <ul className="mt-3 space-y-1 text-sm text-gray-700">
              <li>• Nano Bana (images)</li>
              <li>• Sea Dream (images)</li>
              <li>• Video Studio (video)</li>
            </ul>
            <p className="mt-3 text-xs text-gray-500">Tool access scales with your plan.</p>
          </div>
        </aside>

        <div className="rounded-3xl border border-gray-200 flex flex-col overflow-hidden min-h-[520px]">
          <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-white">
            {messages.map((m, i) => (
              <div key={i} className={m.role === 'user' ? 'ml-auto max-w-[80%]' : 'mr-auto max-w-[80%]'}>
                <div className={
                  'rounded-2xl px-4 py-3 text-sm leading-relaxed ' +
                  (m.role === 'user' ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-800 border border-gray-200')
                }>
                  {m.content}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="mr-auto max-w-[80%]">
                <div className="rounded-2xl px-4 py-3 text-sm bg-gray-50 text-gray-700 border border-gray-200">
                  Thinking…
                </div>
              </div>
            )}
            <div ref={endRef} />
          </div>
          <div className="border-t border-gray-200 p-4">
            <div className="flex items-center gap-3">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => { if (e.key === 'Enter') onSend(); }}
                placeholder="Ask anything…"
                className="flex-1 rounded-full border border-gray-200 px-5 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-rose-200"
              />
              <button
                onClick={onSend}
                className="rounded-full bg-rose-500 text-white px-5 py-3 text-sm font-medium hover:opacity-90 disabled:opacity-40"
                disabled={isLoading}
              >
                Send
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
