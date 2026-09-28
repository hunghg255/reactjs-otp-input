import { useState } from 'react';

export const CodeBlock = ({ code, lang = 'tsx' }: { code: string; lang?: string }) => {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {}
  };

  return (
    <div className="code">
      <div className="code__bar">
        <span>{lang}</span>
        <button type="button" className="code__copy" onClick={copy}>
          {copied ? 'Copied' : 'Copy'}
        </button>
      </div>
      <pre>
        <code>{code}</code>
      </pre>
    </div>
  );
};
