import { useRef, useState } from 'react';

import { OtpInput, OtpInputHandle } from 'reactjs-otp-input';

import { CodeBlock } from '../components/CodeBlock';
import { Demo } from '../components/Demo';

type PropRow = { name: string; type: string; required?: boolean; default: string; description: string };

const PROPS: PropRow[] = [
  { name: 'numInputs', type: 'number', default: '4', description: 'Number of OTP inputs to be rendered.' },
  {
    name: 'onChange',
    type: '(otp: string) => void',
    required: true,
    default: '—',
    description: 'Called with the full OTP string every time it changes.',
  },
  { name: 'value', type: 'string | number', default: '""', description: 'The value of the OTP (controlled).' },
  {
    name: 'placeholder',
    type: 'string',
    default: '—',
    description: 'One character per input. Its length must equal numInputs.',
  },
  { name: 'separator', type: 'ReactNode', default: '—', description: 'Rendered between each pair of inputs.' },
  {
    name: 'containerStyle',
    type: 'CSSProperties | string',
    default: '—',
    description: 'Style object or class name for the container.',
  },
  {
    name: 'inputStyle',
    type: 'CSSProperties | string',
    default: '—',
    description: 'Style object or class name for every input.',
  },
  {
    name: 'focusStyle',
    type: 'CSSProperties | string',
    default: '—',
    description: 'Applied to the focused input.',
  },
  { name: 'isDisabled', type: 'boolean', default: 'false', description: 'Disables all inputs.' },
  {
    name: 'disabledStyle',
    type: 'CSSProperties | string',
    default: '—',
    description: 'Applied to inputs when disabled.',
  },
  { name: 'hasErrored', type: 'boolean', default: 'false', description: 'Marks the inputs as errored.' },
  {
    name: 'errorStyle',
    type: 'CSSProperties | string',
    default: '—',
    description: 'Applied to inputs when hasErrored is true.',
  },
  { name: 'shouldAutoFocus', type: 'boolean', default: 'false', description: 'Focuses the first input on mount.' },
  {
    name: 'isInputNum',
    type: 'boolean',
    default: 'false',
    description: 'Only accept digits and show the numeric keyboard on mobile.',
  },
  { name: 'isInputSecure', type: 'boolean', default: 'false', description: 'Masks the characters.' },
  { name: 'className', type: 'string', default: '—', description: 'Class name for the wrapper of each input.' },
  { name: 'data-cy', type: 'string', default: '—', description: 'Suffixed with -index on each input.' },
  { name: 'data-testid', type: 'string', default: '—', description: 'Suffixed with -index on each input.' },
];

const SECTIONS = [
  ['installation', 'Installation'],
  ['usage', 'Basic usage'],
  ['examples', 'Examples'],
  ['styling', 'Styling'],
  ['ref', 'Imperative API'],
  ['autofill', 'SMS autofill'],
  ['api', 'Props'],
] as const;

const BasicDemo = () => {
  const [otp, setOtp] = useState('');

  return (
    <div className="stack">
      <OtpInput
        value={otp}
        onChange={setOtp}
        numInputs={6}
        separator={<span className="sep">-</span>}
        inputStyle="otp"
        focusStyle="otp--focus"
      />
      <p className="muted">
        Value: <code>{JSON.stringify(otp)}</code>
      </p>
    </div>
  );
};

const NumericDemo = () => {
  const [otp, setOtp] = useState('');

  return (
    <OtpInput
      value={otp}
      onChange={setOtp}
      numInputs={4}
      isInputNum
      placeholder="0000"
      inputStyle="otp"
      focusStyle="otp--focus"
    />
  );
};

const SecureDemo = () => {
  const [otp, setOtp] = useState('');

  return (
    <OtpInput value={otp} onChange={setOtp} numInputs={4} isInputSecure inputStyle="otp" focusStyle="otp--focus" />
  );
};

const ErrorDemo = () => {
  const [otp, setOtp] = useState('1234');
  const hasErrored = otp.length === 4 && otp !== '2468';

  return (
    <div className="stack">
      <OtpInput
        value={otp}
        onChange={setOtp}
        numInputs={4}
        isInputNum
        hasErrored={hasErrored}
        inputStyle="otp"
        focusStyle="otp--focus"
        errorStyle="otp--error"
      />
      <p className="muted">{hasErrored ? 'Wrong code — try 2468' : otp === '2468' ? 'Verified ✓' : 'Enter the code'}</p>
    </div>
  );
};

const RefDemo = () => {
  const [otp, setOtp] = useState('');
  const ref = useRef<OtpInputHandle>(null);

  return (
    <div className="stack">
      <OtpInput ref={ref} value={otp} onChange={setOtp} numInputs={5} inputStyle="otp" focusStyle="otp--focus" />
      <div className="row">
        <button type="button" className="btn" onClick={() => ref.current?.focusInput(0)}>
          Focus first
        </button>
        <button
          type="button"
          className="btn btn--ghost"
          onClick={() => {
            setOtp('');
            ref.current?.focusInput(0);
          }}
        >
          Reset
        </button>
      </div>
    </div>
  );
};

export const Docs = () => (
  <div className="docs">
    <aside className="toc">
      <p className="toc__title">On this page</p>
      {SECTIONS.map(([id, label]) => (
        <a
          key={id}
          href={'#/'}
          onClick={(e) => {
            e.preventDefault();
            document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
          }}
        >
          {label}
        </a>
      ))}
    </aside>

    <article className="content">
      <section className="hero">
        <h1>reactjs-otp-input</h1>
        <p className="lead">
          A fully customizable, accessible one-time password input for React. Tiny, dependency free, with paste,
          keyboard navigation and SMS autofill support.
        </p>
        <div className="hero__demo">
          <BasicDemo />
        </div>
        <div className="row">
          <a className="btn" href="#/playground">
            Open playground →
          </a>
          <a
            className="btn btn--ghost"
            href="https://www.npmjs.com/package/reactjs-otp-input"
            target="_blank"
            rel="noreferrer"
          >
            npm
          </a>
        </div>
      </section>

      <section id="installation">
        <h2>Installation</h2>
        <CodeBlock lang="bash" code="pnpm add reactjs-otp-input" />
      </section>

      <section id="usage">
        <h2>Basic usage</h2>
        <CodeBlock
          code={`import { useState } from 'react';
import { OtpInput } from 'reactjs-otp-input';

export const App = () => {
  const [otp, setOtp] = useState('');

  return <OtpInput value={otp} onChange={setOtp} numInputs={6} separator={<span>-</span>} />;
};`}
        />
      </section>

      <section id="examples">
        <h2>Examples</h2>

        <h3>Numbers only with placeholder</h3>
        <p>
          <code>isInputNum</code> rejects anything that isn&apos;t a digit and opens the numeric keypad on mobile.
        </p>
        <Demo code={'<OtpInput value={otp} onChange={setOtp} numInputs={4} isInputNum placeholder="0000" />'}>
          <NumericDemo />
        </Demo>

        <h3>Secure input</h3>
        <Demo code={'<OtpInput value={otp} onChange={setOtp} numInputs={4} isInputSecure />'}>
          <SecureDemo />
        </Demo>

        <h3>Error state</h3>
        <Demo
          code={`<OtpInput
  value={otp}
  onChange={setOtp}
  numInputs={4}
  isInputNum
  hasErrored={otp.length === 4 && otp !== '2468'}
  errorStyle="otp--error"
/>`}
        >
          <ErrorDemo />
        </Demo>
      </section>

      <section id="styling">
        <h2>Styling</h2>
        <p>
          Every <code>*Style</code> prop accepts either a style object or a class name. State styles (focus, disabled,
          error) are merged on top of <code>inputStyle</code>.
        </p>
        <CodeBlock
          code={`// With class names
<OtpInput inputStyle="otp" focusStyle="otp--focus" errorStyle="otp--error" ... />

// With style objects
<OtpInput
  inputStyle={{ width: 48, height: 56, borderRadius: 8, border: '1px solid #ccc' }}
  focusStyle={{ borderColor: '#6d5dfc', outline: 'none' }}
  ...
/>`}
        />
      </section>

      <section id="ref">
        <h2>Imperative API</h2>
        <p>
          Pass a ref to get access to <code>focusInput(index)</code>.
        </p>
        <Demo
          code={`const ref = useRef<OtpInputHandle>(null);

<OtpInput ref={ref} value={otp} onChange={setOtp} numInputs={5} />
<button onClick={() => ref.current?.focusInput(0)}>Focus first</button>`}
        >
          <RefDemo />
        </Demo>
      </section>

      <section id="autofill">
        <h2>SMS autofill</h2>
        <p>
          The first input uses <code>autocomplete=&quot;one-time-code&quot;</code>, so iOS and Android suggest the code
          received by SMS. When the whole code lands in one input it is spread across all of them. Pasting works the
          same way from any input.
        </p>
      </section>

      <section id="api">
        <h2>Props</h2>
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Type</th>
                <th>Default</th>
                <th>Description</th>
              </tr>
            </thead>
            <tbody>
              {PROPS.map((p) => (
                <tr key={p.name}>
                  <td>
                    <code>{p.name}</code>
                    {p.required && <span className="badge">required</span>}
                  </td>
                  <td>
                    <code className="type">{p.type}</code>
                  </td>
                  <td>
                    <code>{p.default}</code>
                  </td>
                  <td>{p.description}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </article>
  </div>
);
