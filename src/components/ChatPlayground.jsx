import React, { useState, useEffect, useRef } from 'react';

const systemModels = [
  { id: 'gpt-4', label: 'ChatGPT', tier: 'Pro' },
  { id: 'claude-3', label: 'Claude', tier: 'Pro' },
  { id: 'gemini-1.5', label: 'Gemini', tier: 'Pro' },
  { id: 'deepseek', label: 'DeepSeek', tier: 'Plus' },
  { id: 'grok', label: 'Grok', tier: 'Plus' },
  { id: 'ernie', label: 'Baidu ERNIE', tier: 'Enterprise' },
];

const BACKEND = import.meta.env.VITE_BACKEND_URL || '';

export default function ChatPlayground() {
  const [messages, setMessages] = useState([
    { role: 'assistant', content: 'Ask anything. I will consult multiple models and reply with a consensus.' },
  ]);
  const [input, setInput] = useState('');
  const [selected, setSelected] = useState(systemModels.map(m => m.id));
  const [isLoading, setIsLoading] = useState(false);
  const [apiKey, setApiKey] = useState(localStorage.getItem('apiKey') || '');
  const [imagePrompt, setImagePrompt] = useState('');
  const [videoPrompt, setVideoPrompt] = useState('');
  const [imageResult, setImageResult] = useState(null);
  const [videoResult, setVideoResult] = useState(null);
  const endRef = useRef(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const saveKey = () => {
    localStorage.setItem('apiKey', apiKey);
  };

  const toggleModel = (id) => {
    setSelected(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
  };

  const callChat = async (finalInput) => {
    try {
      const res = await fetch(`${BACKEND}/api/chat`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-API-Key': apiKey,
        },
        body: JSON.stringify({
          messages: [
            ...messages.filter(m => m.role !== 'assistant').map(({ role, content }) => ({ role, content })),
            { role: 'user', content: finalInput },
          ],
          selected_models: selected,
        }),
      });
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.detail || `HTTP ${res.status}`);
      }
      return await res.json();
    } catch (e) {
      throw e;
    }
  };

  const onSend = async () => {
    if (!input.trim()) return;
    const userMsg = { role: 'user', content: input.trim() };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    try {
      const data = await callChat(userMsg.content);
      const reply = { role: 'assistant', content: data.final || 'No response' };
      setMessages(prev => [...prev, reply]);
    } catch (e) {
      setMessages(prev => [...prev, { role: 'assistant', content: `Error: ${e.message}` }]);
    } finally {
      setIsLoading(false);
    }
  };

  const onGenerateImage = async () => {
    if (!imagePrompt.trim()) return;
    try {
      const res = await fetch(`${BACKEND}/api/generate/image`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-API-Key': apiKey,
        },
        body: JSON.stringify({ prompt: imagePrompt }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.detail || 'Generation failed');
      setImageResult(data);
    } catch (e) {
      setImageResult({ error: e.message });
    }
  };

  const onGenerateVideo = async () => {
    if (!videoPrompt.trim()) return;
    try {
      const res = await fetch(`${BACKEND}/api/generate/video`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-API-Key': apiKey,
        },
        body: JSON.stringify({ prompt: videoPrompt }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.detail || 'Generation failed');
      setVideoResult(data);
    } catch (e) {
      setVideoResult({ error: e.message });
    }
  };

  const onSignup = async () => {
    try {
      const res = await fetch(`${BACKEND}/api/auth/signup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: `guest+${Date.now()}@example.com` }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.detail || 'Signup failed');
      setApiKey(data.api_key);
      localStorage.setItem('apiKey', data.api_key);
    } catch (e) {
      alert(e.message);
    }
  };

  return (
    <section id="playground" className="max-w-5xl mx-auto px-6 py-20">
      <header className="mb-8">
        <h2 className="text-2xl md:text-3xl font-semibold text-gray-900">Playground</h2>
        <p className="mt-2 text-gray-600">Pick which brains to combine. Responses synthesize the best of each model.</p>
      </header>

      <div className="mb-6 rounded-2xl border border-gray-200 p-4 flex flex-col md:flex-row gap-3 items-start md:items-center">
        <div className="flex-1 w-full">
          <label className="block text-xs text-gray-600 mb-1">API Key</label>
          <input
            value={apiKey}
            onChange={(e) => setApiKey(e.target.value)}
            placeholder="Paste your API key or click Generate"
            className="w-full rounded-full border border-gray-200 px-5 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-rose-200"
          />
        </div>
        <div className="flex gap-3">
          <button onClick={saveKey} className="rounded-full border border-gray-200 px-4 py-2 text-sm">Save</button>
          <button onClick={onSignup} className="rounded-full bg-rose-500 text-white px-4 py-2 text-sm">Generate</button>
        </div>
      </div>

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

          <div className="rounded-2xl border border-gray-200 p-4 space-y-3">
            <h3 className="text-sm font-medium text-gray-800">Generators</h3>
            <div>
              <label className="block text-xs text-gray-600 mb-1">Image prompt</label>
              <input
                value={imagePrompt}
                onChange={(e) => setImagePrompt(e.target.value)}
                placeholder="Describe the image…"
                className="w-full rounded-full border border-gray-200 px-4 py-2 text-sm"
              />
              <button onClick={onGenerateImage} className="mt-2 w-full rounded-full bg-gray-900 text-white px-4 py-2 text-sm">Generate Image</button>
              {imageResult && (
                <div className="mt-2 text-xs text-gray-600 break-all">
                  {imageResult.error ? `Error: ${imageResult.error}` : `URL: ${imageResult.url}`}
                </div>
              )}
            </div>
            <div>
              <label className="block text-xs text-gray-600 mb-1">Video prompt</label>
              <input
                value={videoPrompt}
                onChange={(e) => setVideoPrompt(e.target.value)}
                placeholder="Describe the video…"
                className="w-full rounded-full border border-gray-200 px-4 py-2 text-sm"
              />
              <button onClick={onGenerateVideo} className="mt-2 w-full rounded-full bg-gray-900 text-white px-4 py-2 text-sm">Generate Video</button>
              {videoResult && (
                <div className="mt-2 text-xs text-gray-600 break-all">
                  {videoResult.error ? `Error: ${videoResult.error}` : `URL: ${videoResult.url}`}
                </div>
              )}
            </div>
            <p className="text-xs text-gray-500">Tool access scales with your plan.</p>
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
