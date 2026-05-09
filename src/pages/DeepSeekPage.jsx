import { useMemo, useRef, useState, useEffect } from 'react';
import { useAppState } from '../context/AppStateContext';
import { appDisplayName } from '../data/spots';

function buildProgressSummary({ spots, selectedRoute, stats, currentLocation, language }) {
  return {
    app: language === 'zh' ? '阊门遗产' : appDisplayName,
    interfaceLanguage: language === 'zh' ? 'Chinese' : 'English',
    currentLocation,
    selectedRoute: {
      name: selectedRoute.name,
      order: selectedRoute.spotIds,
      duration: selectedRoute.duration,
      distance: selectedRoute.distance,
    },
    progress: {
      totalSpots: stats.totalSpots,
      walkedMeters: stats.walkedMeters,
    },
    allStops: spots.map((spot) => ({
      id: spot.id,
      name: spot.name,
      category: spot.category,
      distanceMeters: spot.distanceMeters,
      storySnippet: spot.storySnippet,
      mission: spot.mission,
    })),
  };
}

function escapeHtml(text) {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

function renderInline(text) {
  let out = escapeHtml(text);

  out = out.replace(/!\[([^\]]*)\]\(([^)]+)\)/g, '<img alt="$1" src="$2" />');

  out = out.replace(/\[([^\]]+)\]\(([^)]+)\)/g, (_, label, url) => {
    const escapedUrl = escapeHtml(url);
    return `<a href="${escapedUrl}" target="_blank" rel="noopener noreferrer">${label}</a>`;
  });

  out = out.replace(/\*\*\*(.+?)\*\*\*/g, '<strong><em>$1</em></strong>');
  out = out.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
  out = out.replace(/\*(.+?)\*/g, '<em>$1</em>');

  out = out.replace(/`([^`]+)`/g, '<code>$1</code>');

  return out;
}

function MarkdownBlock({ content }) {
  const lines = content.split('\n');
  const blocks = [];
  let i = 0;
  let key = 0;

  while (i < lines.length) {
    const line = lines[i];

    if (line.startsWith('```')) {
      const lang = escapeHtml(line.slice(3).trim());
      const codeLines = [];
      i++;
      while (i < lines.length && !lines[i].startsWith('```')) {
        codeLines.push(lines[i]);
        i++;
      }
      i++;
      const codeContent = escapeHtml(codeLines.join('\n'));
      blocks.push(
        <pre key={key++}>
          <code className={lang ? `language-${lang}` : undefined}>
            {null}
            <span dangerouslySetInnerHTML={{ __html: codeContent }} />
          </code>
        </pre>
      );
      continue;
    }

    if (/^#{1,4}\s/.test(line)) {
      const m = line.match(/^(#{1,4})\s(.+)/);
      const level = m[1].length;
      if (level === 1) blocks.push(<h1 key={key++} dangerouslySetInnerHTML={{ __html: renderInline(m[2]) }} />);
      else if (level === 2) blocks.push(<h2 key={key++} dangerouslySetInnerHTML={{ __html: renderInline(m[2]) }} />);
      else if (level === 3) blocks.push(<h3 key={key++} dangerouslySetInnerHTML={{ __html: renderInline(m[2]) }} />);
      else blocks.push(<h4 key={key++} dangerouslySetInnerHTML={{ __html: renderInline(m[2]) }} />);
      i++;
      continue;
    }

    if (/^\|.+\|/.test(line) && i + 1 < lines.length && /^\|[-:| ]+\|$/.test(lines[i + 1].replace(/`/g, ''))) {
      const headerLine = line;
      const separatorLine = lines[i + 1];
      const dataRows = [];
      i += 2;
      while (i < lines.length && /^\|.+\|/.test(lines[i])) {
        dataRows.push(lines[i]);
        i++;
      }

      const parseRow = (row) =>
        row
          .replace(/^\||\|$/g, '')
          .split('|')
          .map((cell) => renderInline(cell.trim()));

      const headerCells = parseRow(headerLine);
      const bodyRows = dataRows.map(parseRow);

      const alignments = separatorLine
        .replace(/^\||\|$/g, '')
        .split('|')
        .map((s) => {
          const t = s.trim();
          if (t.startsWith(':') && t.endsWith(':')) return 'center';
          if (t.endsWith(':')) return 'right';
          return 'left';
        });

      blocks.push(
        <div className="md-table-wrap" key={key++}>
          <table>
            <thead>
              <tr>
                {headerCells.map((h, ci) => (
                  <th
                    key={ci}
                    style={{ textAlign: alignments[ci] || 'left' }}
                    dangerouslySetInnerHTML={{ __html: h }}
                  />
                ))}
              </tr>
            </thead>
            <tbody>
              {bodyRows.map((row, ri) => (
                <tr key={ri}>
                  {row.map((cell, ci) => (
                    <td
                      key={ci}
                      style={{ textAlign: alignments[ci] || 'left' }}
                      dangerouslySetInnerHTML={{ __html: cell }}
                    />
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
      continue;
    }

    if (/^[-*]\s/.test(line)) {
      const items = [];
      while (i < lines.length && /^[-*]\s/.test(lines[i])) {
        const itemText = lines[i].replace(/^[-*]\s/, '');
        items.push(<li key={items.length} dangerouslySetInnerHTML={{ __html: renderInline(itemText) }} />);
        i++;
      }
      blocks.push(<ul key={key++}>{items}</ul>);
      continue;
    }

    if (/^\d+\.\s/.test(line)) {
      const items = [];
      while (i < lines.length && /^\d+\.\s/.test(lines[i])) {
        const itemText = lines[i].replace(/^\d+\.\s/, '');
        items.push(<li key={items.length} dangerouslySetInnerHTML={{ __html: renderInline(itemText) }} />);
        i++;
      }
      blocks.push(<ol key={key++}>{items}</ol>);
      continue;
    }

    if (/^>\s/.test(line)) {
      const quoteLines = [];
      while (i < lines.length && /^>\s?/.test(lines[i])) {
        quoteLines.push(lines[i].replace(/^>\s?/, ''));
        i++;
      }
      blocks.push(
        <blockquote key={key++} dangerouslySetInnerHTML={{ __html: renderInline(quoteLines.join('<br/>')) }} />
      );
      continue;
    }

    if (/^(-{3,}|\*{3,}|_{3,})\s*$/.test(line)) {
      blocks.push(<hr key={key++} />);
      i++;
      continue;
    }

    if (line.trim() === '') {
      i++;
      continue;
    }

    const paraLines = [];
    while (
      i < lines.length &&
      lines[i].trim() !== '' &&
      !/^(```|#{1,4}\s|[-*]\s|\d+\.\s|>\s|\|)/.test(lines[i]) &&
      !/^(-{3,}|\*{3,}|_{3,})\s*$/.test(lines[i])
    ) {
      paraLines.push(lines[i]);
      i++;
    }
    blocks.push(
      <p key={key++} dangerouslySetInnerHTML={{ __html: renderInline(paraLines.join('<br/>')) }} />
    );
  }

  return <>{blocks}</>;
}

function Avatar() {
  return (
    <svg width="30" height="30" viewBox="0 0 32 32" fill="none">
      <defs>
        <linearGradient id="ds-av" x1="0" y1="0" x2="32" y2="32">
          <stop offset="0%" stopColor="var(--teal)" />
          <stop offset="100%" stopColor="var(--amber)" />
        </linearGradient>
      </defs>
      <circle cx="16" cy="16" r="15" fill="url(#ds-av)" stroke="rgba(47,138,125,0.3)" strokeWidth="1.5" />
      <text x="16" y="21" textAnchor="middle" fill="white" fontSize="14" fontWeight="800" fontFamily="Fraunces, serif">A</text>
    </svg>
  );
}

function formatAnswer(content) {
  const trimmed = content.trim();
  return trimmed || 'No response received.';
}

export default function DeepSeekPage() {
  const {
    isChinese,
    language,
    spots,
    selectedRoute,
    stats,
    currentLocation,
    chatMessages: messages,
    setChatMessages: setMessages,
  } = useAppState();
  const [input, setInput] = useState('');
  const [status, setStatus] = useState('idle');
  const [error, setError] = useState('');
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  const progressSummary = useMemo(
    () => buildProgressSummary({ spots, selectedRoute, stats, currentLocation, language }),
    [currentLocation, language, selectedRoute, spots, stats],
  );

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, status, error]);

  async function sendMessage() {
    const trimmed = input.trim();
    if (!trimmed || status === 'loading') return;

    setInput('');
    setError('');

    const userMsg = { id: Date.now(), role: 'user', content: trimmed };
    const updatedMessages = [...messages, userMsg];
    setMessages(updatedMessages);
    setStatus('loading');

    try {
      const systemMsg = {
        role: 'system',
        content:
          [
            `You are a concise onsite heritage walk assistant for ${appDisplayName}.`,
            'Use the supplied live progress JSON as truth. Recommend the next practical stop, explain why it fits the route, and keep advice outdoor-friendly.',
            'Do not invent locations outside the provided data.',
            `The visitor selected interface language is ${language === 'zh' ? 'Chinese' : 'English'}. You must answer in ${language === 'zh' ? 'Chinese' : 'English'} unless the visitor explicitly asks for another language.`,
            'Use Markdown for formatting in your responses when helpful.',
          ].join(' '),
      };

      const apiMessages = [systemMsg];

      for (let idx = 0; idx < updatedMessages.length; idx++) {
        const msg = updatedMessages[idx];
        if (idx === 0 && msg.role === 'user') {
          apiMessages.push({
            role: 'user',
            content: [
              isChinese ? '游客进度 JSON:' : 'Visitor progress JSON:',
              JSON.stringify(progressSummary, null, 2),
              '',
              isChinese ? '游客问题:' : 'Visitor request:',
              msg.content,
            ].join('\n'),
          });
        } else {
          apiMessages.push({ role: msg.role, content: msg.content });
        }
      }

      const response = await fetch('/api/deepseek', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: apiMessages,
          temperature: 0.45,
          max_tokens: 800,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || data.message || (isChinese ? '提问请求失败。' : 'Ask request failed.'));
      }

      const content = data.choices?.[0]?.message?.content;
      if (!content) {
        throw new Error(isChinese ? '未收到回答。' : 'Ask returned an empty answer.');
      }

      setMessages([...updatedMessages, { id: Date.now() + 1, role: 'assistant', content }]);
      setStatus('ready');
    } catch (err) {
      setError(err.message);
      setStatus('error');
    }
  }

  function handleKeyDown(e) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  }

  return (
    <div className="chat-page">
      <header className="chat-header">
        <div className="chat-header-top">
          <Avatar />
          <div>
            <h2 className="chat-model-name">{isChinese ? '提问' : 'Ask'}</h2>
            <p className="chat-model-desc">{isChinese ? '面向阊门路线的步行问答助手' : 'Route-aware chat for the Chang Gate walk'}</p>
          </div>
        </div>
        <div className="chat-progress-inline">
          <span className="chat-stat"><strong>{stats.totalSpots}</strong> {isChinese ? '个地点' : 'spots'}</span>
          <span className="chat-stat">{selectedRoute.name}</span>
        </div>
      </header>

      <div className="chat-messages">
        {messages.length === 0 ? (
          <div className="chat-empty">
            <div className="chat-empty-icon">
              <svg width="48" height="48" viewBox="0 0 56 56" fill="none">
                <circle cx="28" cy="28" r="26" fill="rgba(47,138,125,0.08)" stroke="rgba(47,138,125,0.2)" strokeWidth="2" />
                <path d="M28 18v16M22 22l6-4 6 4" stroke="rgba(47,138,125,0.6)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                <circle cx="20" cy="36" r="3" fill="rgba(201,135,45,0.3)" />
                <circle cx="28" cy="38" r="3" fill="rgba(201,135,45,0.3)" />
                <circle cx="36" cy="36" r="3" fill="rgba(201,135,45,0.3)" />
              </svg>
            </div>
            <h3>{isChinese ? '向路线助手提问' : 'Ask your route assistant'}</h3>
            <p>
              {isChinese
                ? '可以询问下一站、某个地点该观察什么，或根据当前进度获取实用步行建议。'
                : 'Ask about the best next stop, what to notice at a location, or get practical walking tips based on your current progress.'}
            </p>
            <div className="chat-suggestions">
              {(isChinese
                ? [
                    '根据我的进度，下一站应该去哪里？',
                    '介绍一下我路线上的下一站。',
                    '阊门片区为什么适合做遗产步行？',
                  ]
                : [
                    'Based on my progress, what should I visit next?',
                    'Tell me about the next stop on my route.',
                    'What makes the Chang Gate area special for heritage walking?',
                  ]).map((suggestion) => (
                <button
                  key={suggestion}
                  type="button"
                  className="chat-suggestion-chip"
                  onClick={() => {
                    setInput(suggestion);
                    inputRef.current?.focus();
                  }}
                >
                  {suggestion}
                </button>
              ))}
            </div>
          </div>
        ) : (
          messages.map((msg) => (
            <div key={msg.id} className={`chat-msg-row ${msg.role}`}>
              {msg.role === 'assistant' && (
                <div className="chat-msg-avatar">
                  <Avatar />
                </div>
              )}
              <div className="chat-msg-body">
                <div className={`chat-bubble ${msg.role}`}>
                  {msg.role === 'assistant' ? (
                    <div className="md-content">
                      <MarkdownBlock content={formatAnswer(msg.content)} />
                    </div>
                  ) : (
                    <p>{msg.content}</p>
                  )}
                </div>
              </div>
            </div>
          ))
        )}

        {status === 'loading' && (
          <div className="chat-msg-row assistant">
            <div className="chat-msg-avatar">
              <Avatar />
            </div>
            <div className="chat-msg-body">
              <div className="chat-bubble assistant chat-loading-bubble">
                <span className="typing-dots"><span /><span /><span /></span>
              </div>
            </div>
          </div>
        )}

        {error && (
          <div className="chat-msg-row assistant">
            <div className="chat-msg-body">
              <div className="chat-error">
                <strong>{isChinese ? '错误' : 'Error'}:</strong> {error}
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      <div className="chat-composer">
        <div className="chat-composer-inner">
          <textarea
            ref={inputRef}
            className="chat-input"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={isChinese ? '询问下一站、路线建议或观察重点...' : 'Ask about your next stop, route tips, or what to notice...'}
            rows={1}
            disabled={status === 'loading'}
          />
          <button
            type="button"
            className="chat-send-btn"
            onClick={sendMessage}
            disabled={status === 'loading' || !input.trim()}
            aria-label={isChinese ? '发送消息' : 'Send message'}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="12" y1="19" x2="12" y2="5" />
              <polyline points="5 12 12 5 19 12" />
            </svg>
          </button>
        </div>
        <p className="chat-composer-hint">
          {isChinese ? '按' : 'Press'} <kbd>Enter</kbd> {isChinese ? '发送，' : 'to send, '}<kbd>Shift + Enter</kbd> {isChinese ? '换行。' : 'for new line.'}
        </p>
      </div>
    </div>
  );
}
