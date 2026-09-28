import { useMemo, useRef, useState } from 'react';

import { OtpInput, OtpInputHandle } from 'reactjs-otp-input';

import { CodeBlock } from '../components/CodeBlock';

type Options = {
  numInputs: number;
  separator: string;
  placeholder: string;
  isInputNum: boolean;
  isInputSecure: boolean;
  isDisabled: boolean;
  hasErrored: boolean;
  shouldAutoFocus: boolean;
  size: number;
  radius: number;
  gap: number;
};

const DEFAULTS: Options = {
  numInputs: 6,
  separator: '-',
  placeholder: '',
  isInputNum: false,
  isInputSecure: false,
  isDisabled: false,
  hasErrored: false,
  shouldAutoFocus: false,
  size: 48,
  radius: 10,
  gap: 8,
};

const BOOLEANS = ['isInputNum', 'isInputSecure', 'isDisabled', 'hasErrored', 'shouldAutoFocus'] as const;

const buildCode = (o: Options) => {
  const lines = ['value={otp}', 'onChange={setOtp}', `numInputs={${o.numInputs}}`];

  if (o.separator) {
    lines.push(`separator={<span>${o.separator}</span>}`);
  }
  if (o.placeholder) {
    lines.push(`placeholder="${o.placeholder}"`);
  }
  BOOLEANS.forEach((key) => {
    if (o[key]) {
      lines.push(key);
    }
  });
  lines.push(`inputStyle={{ width: ${o.size}, height: ${Math.round(o.size * 1.15)}, borderRadius: ${o.radius} }}`);
  lines.push(`containerStyle={{ gap: ${o.gap} }}`);

  return `import { useState } from 'react';
import { OtpInput } from 'reactjs-otp-input';

export const App = () => {
  const [otp, setOtp] = useState('');

  return (
    <OtpInput
${lines.map((l) => `      ${l}`).join('\n')}
    />
  );
};`;
};

export const Playground = () => {
  const [options, setOptions] = useState<Options>(DEFAULTS);
  const [otp, setOtp] = useState('');
  const [log, setLog] = useState<string[]>([]);
  // Remount the preview when shouldAutoFocus is toggled so it can take effect
  const [previewKey, setPreviewKey] = useState(0);
  const ref = useRef<OtpInputHandle>(null);

  const set = <K extends keyof Options>(key: K, value: Options[K]) => {
    setOptions((prev) => ({ ...prev, [key]: value }));
    if (key === 'shouldAutoFocus' || key === 'numInputs') {
      setPreviewKey((k) => k + 1);
    }
  };

  const inputStyle = useMemo(
    () => ({ width: options.size, height: Math.round(options.size * 1.15), borderRadius: options.radius }),
    [options.size, options.radius]
  );
  const containerStyle = useMemo(() => ({ gap: options.gap, flexWrap: 'wrap' as const }), [options.gap]);
  const separator = useMemo(
    () => (options.separator ? <span className="sep">{options.separator}</span> : undefined),
    [options.separator]
  );

  const placeholderInvalid = options.placeholder.length > 0 && options.placeholder.length !== options.numInputs;

  const handleChange = (value: string) => {
    setOtp(value);
    setLog((prev) => [`onChange("${value}")`, ...prev].slice(0, 6));
  };

  return (
    <div className="playground">
      <div className="playground__head">
        <h1>Playground</h1>
        <p className="lead">Tweak the props and see the result live. Copy the generated code when you are happy.</p>
      </div>

      <div className="playground__grid">
        <form className="panel controls" onSubmit={(e) => e.preventDefault()}>
          <h2 className="panel__title">Props</h2>

          <label className="field">
            <span>
              numInputs <b>{options.numInputs}</b>
            </span>
            <input
              type="range"
              min={1}
              max={10}
              value={options.numInputs}
              onChange={(e) => set('numInputs', Number(e.target.value))}
            />
          </label>

          <label className="field">
            <span>separator</span>
            <input
              className="text"
              value={options.separator}
              maxLength={3}
              onChange={(e) => set('separator', e.target.value)}
            />
          </label>

          <label className="field">
            <span>placeholder</span>
            <input
              className={placeholderInvalid ? 'text is-invalid' : 'text'}
              value={options.placeholder}
              maxLength={10}
              placeholder={'•'.repeat(options.numInputs)}
              onChange={(e) => set('placeholder', e.target.value)}
            />
            {placeholderInvalid && <small className="hint">Must be exactly {options.numInputs} characters.</small>}
          </label>

          <div className="switches">
            {BOOLEANS.map((key) => (
              <label key={key} className="switch">
                <input type="checkbox" checked={options[key]} onChange={(e) => set(key, e.target.checked)} />
                <span className="switch__track" aria-hidden />
                <code>{key}</code>
              </label>
            ))}
          </div>

          <h2 className="panel__title">Appearance</h2>
          <label className="field">
            <span>
              size <b>{options.size}px</b>
            </span>
            <input
              type="range"
              min={32}
              max={72}
              value={options.size}
              onChange={(e) => set('size', Number(e.target.value))}
            />
          </label>
          <label className="field">
            <span>
              radius <b>{options.radius}px</b>
            </span>
            <input
              type="range"
              min={0}
              max={36}
              value={options.radius}
              onChange={(e) => set('radius', Number(e.target.value))}
            />
          </label>
          <label className="field">
            <span>
              gap <b>{options.gap}px</b>
            </span>
            <input
              type="range"
              min={0}
              max={24}
              value={options.gap}
              onChange={(e) => set('gap', Number(e.target.value))}
            />
          </label>

          <button
            type="button"
            className="btn btn--ghost"
            onClick={() => {
              setOptions(DEFAULTS);
              setOtp('');
              setLog([]);
              setPreviewKey((k) => k + 1);
            }}
          >
            Reset all
          </button>
        </form>

        <div className="playground__right">
          <div className="panel preview">
            <div className="preview__stage">
              <OtpInput
                key={previewKey}
                ref={ref}
                value={otp}
                onChange={handleChange}
                numInputs={options.numInputs}
                separator={separator}
                placeholder={placeholderInvalid ? undefined : options.placeholder || undefined}
                isInputNum={options.isInputNum}
                isInputSecure={options.isInputSecure}
                isDisabled={options.isDisabled}
                hasErrored={options.hasErrored}
                shouldAutoFocus={options.shouldAutoFocus}
                containerStyle={containerStyle}
                inputStyle={inputStyle}
                errorStyle="otp--error"
                disabledStyle="otp--disabled"
                className="pg-cell"
                data-testid="playground-otp"
              />
            </div>
            <div className="preview__meta">
              <span>
                value: <code>{JSON.stringify(otp)}</code>
              </span>
              <div className="row">
                <button type="button" className="btn btn--sm" onClick={() => ref.current?.focusInput(0)}>
                  focusInput(0)
                </button>
                <button
                  type="button"
                  className="btn btn--sm btn--ghost"
                  onClick={() => {
                    setOtp('');
                    ref.current?.focusInput(0);
                  }}
                >
                  Clear
                </button>
              </div>
            </div>
            <ul className="log" aria-label="Event log">
              {log.length === 0 ? <li className="muted">Type or paste a code to see events…</li> : null}
              {log.map((entry, i) => (
                <li key={`${entry}-${i}`}>{entry}</li>
              ))}
            </ul>
          </div>

          <CodeBlock code={buildCode(options)} />
        </div>
      </div>
    </div>
  );
};
