<p align="center">
<a href="https://www.npmjs.com/package/reactjs-otp-input" target="_blank" rel="noopener noreferrer">
<img src="https://api.iconify.design/teenyicons:otp-outline.svg?color=%23fdb4e2" alt="logo" width='100'/></a>
</p>

<h1 align="center">reactjs-otp-input</h1>

<p align="center">
  A fully customizable, accessible one-time password input for React.
</p>

<p align="center">
  <a href="https://www.npmjs.com/package/reactjs-otp-input" target="_blank" rel="noopener noreferrer"><img src="https://img.shields.io/npm/v/reactjs-otp-input.svg" alt="NPM Version" /></a>
  <a href="https://www.npmjs.com/package/reactjs-otp-input" target="_blank" rel="noopener noreferrer"><img src="https://img.shields.io/npm/dt/reactjs-otp-input.svg?logo=npm" alt="NPM Downloads" /></a>
  <a href="https://bundlephobia.com/result?p=reactjs-otp-input" target="_blank" rel="noopener noreferrer"><img src="https://img.shields.io/bundlephobia/minzip/reactjs-otp-input" alt="Minzip" /></a>
  <a href="https://github.com/hunghg255/reactjs-otp-input/graphs/contributors" target="_blank" rel="noopener noreferrer"><img src="https://img.shields.io/badge/all_contributors-1-orange.svg" alt="Contributors" /></a>
  <a href="https://github.com/hunghg255/reactjs-otp-input/blob/main/LICENSE" target="_blank" rel="noopener noreferrer"><img src="https://badgen.net/github/license/hunghg255/reactjs-otp-input" alt="License" /></a>
</p>

<p align="center">
  <a href="https://reactjs-otp-input-demo.vercel.app/">Live demo</a>
</p>

![demo](https://media.giphy.com/media/lN98dFU6h3oP0wWS5x/giphy.gif)

## Features

- **Tiny, zero dependencies**: only `react` as a peer dependency.
- **Paste anywhere**: paste from the long-press menu, <kbd>Ctrl</kbd>/<kbd>⌘</kbd>+<kbd>V</kbd> or the mobile keyboard clipboard suggestion, from any input.
- **SMS autofill**: every input uses `autocomplete="one-time-code"`, so iOS and Android suggest the code from SMS.
- **Keyboard friendly**: <kbd>Backspace</kbd>, <kbd>Delete</kbd>, <kbd>←</kbd> / <kbd>→</kbd> navigation.
- **Numeric mode** that filters out non-digits and opens the numeric keypad on mobile.
- **Styling your way**: every style prop accepts a style object or a class name.
- **Accessible**: each input has a descriptive `aria-label`.
- **TypeScript** types included.

![autofill on mobile](https://res.cloudinary.com/hunghg255/image/upload/v1690099530/react-otp-input_r7ukv1.png)

## Installation

```bash
pnpm add reactjs-otp-input
# or
npm install reactjs-otp-input
# or
yarn add reactjs-otp-input
```

Requires `react` and `react-dom` 17 or newer.

## Basic usage

```tsx
import { useState } from 'react';
import { OtpInput } from 'reactjs-otp-input';

export const App = () => {
  const [otp, setOtp] = useState('');

  return <OtpInput value={otp} onChange={setOtp} numInputs={6} separator={<span>-</span>} />;
};
```

## Examples

### Numbers only

```tsx
<OtpInput value={otp} onChange={setOtp} numInputs={4} isInputNum placeholder="0000" />
```

### Secure input

```tsx
<OtpInput value={otp} onChange={setOtp} numInputs={4} isInputSecure />
```

### Error state

```tsx
<OtpInput value={otp} onChange={setOtp} numInputs={4} hasErrored={isWrongCode} errorStyle="otp--error" />
```

### Styling

Each `*Style` prop takes either a **style object** or a **class name**. Focus, disabled and error styles are merged on top of `inputStyle`.

```tsx
// Style objects
<OtpInput
  value={otp}
  onChange={setOtp}
  numInputs={6}
  containerStyle={{ gap: 8 }}
  inputStyle={{ width: 48, height: 56, fontSize: 24, borderRadius: 8, border: '1px solid #ccc' }}
  focusStyle={{ borderColor: '#6d5dfc', outline: 'none' }}
  errorStyle={{ borderColor: 'red' }}
/>

// Class names
<OtpInput
  value={otp}
  onChange={setOtp}
  numInputs={6}
  containerStyle="otp-container"
  inputStyle="otp-input"
  focusStyle="otp-input--focus"
  errorStyle="otp-input--error"
/>
```

> Each input has an inline default `width: 1em`. When sizing with a class name, use `!important` for `width` (or pass `inputStyle` as an object).

### Imperative API (ref)

```tsx
import { useRef, useState } from 'react';
import { OtpInput, OtpInputHandle } from 'reactjs-otp-input';

export const App = () => {
  const [otp, setOtp] = useState('');
  const ref = useRef<OtpInputHandle>(null);

  return (
    <>
      <OtpInput ref={ref} value={otp} onChange={setOtp} numInputs={6} />
      <button
        onClick={() => {
          setOtp('');
          ref.current?.focusInput(0);
        }}
      >
        Reset
      </button>
    </>
  );
};
```

| Method              | Description                                           |
| ------------------- | ----------------------------------------------------- |
| `focusInput(index)` | Focuses (and selects) the input at `index` (clamped). |

## Paste & autofill behavior

- A **complete code** (at least `numInputs` valid characters) always fills every input from the first one, whichever input is focused.
- A **shorter text** fills from the focused input onwards.
- Characters that are not allowed (spaces, dashes, and letters when `isInputNum` is set) are skipped, so `"Code: 482-913"` becomes `482913`.
- After pasting, focus moves to the next empty input (or the last one).

## Keyboard

| Key                         | Action                                                                                |
| --------------------------- | ------------------------------------------------------------------------------------- |
| <kbd>Backspace</kbd>        | Clears the current input, or the previous one if the current is empty, and moves back |
| <kbd>Delete</kbd>           | Clears the current input                                                              |
| <kbd>←</kbd> / <kbd>→</kbd> | Moves to the previous / next input                                                    |
| <kbd>Space</kbd>            | Ignored                                                                               |

## API

| Name              | Type                      | Required | Default | Description                                                     |
| ----------------- | ------------------------- | -------- | ------- | --------------------------------------------------------------- |
| `onChange`        | `(otp: string) => void`   | ✅       | —       | Called with the full OTP string every time it changes.          |
| `value`           | `string \| number`        |          | `''`    | The value of the OTP (controlled).                              |
| `numInputs`       | `number`                  |          | `4`     | Number of inputs to render.                                     |
| `placeholder`     | `string`                  |          | —       | One character per input. Its length must equal `numInputs`.     |
| `separator`       | `ReactNode`               |          | —       | Rendered between each pair of inputs, e.g. `<span>-</span>`.    |
| `containerStyle`  | `CSSProperties \| string` |          | —       | Style object or class name for the container.                   |
| `inputStyle`      | `CSSProperties \| string` |          | —       | Style object or class name for every input.                     |
| `focusStyle`      | `CSSProperties \| string` |          | —       | Applied to the focused input.                                   |
| `isDisabled`      | `boolean`                 |          | `false` | Disables all inputs.                                            |
| `disabledStyle`   | `CSSProperties \| string` |          | —       | Applied to inputs when disabled.                                |
| `hasErrored`      | `boolean`                 |          | `false` | Marks the inputs as errored.                                    |
| `errorStyle`      | `CSSProperties \| string` |          | —       | Applied to inputs when `hasErrored` is `true`.                  |
| `shouldAutoFocus` | `boolean`                 |          | `false` | Focuses the first input on mount.                               |
| `isInputNum`      | `boolean`                 |          | `false` | Only accepts digits and shows the numeric keypad on mobile.     |
| `isInputSecure`   | `boolean`                 |          | `false` | Masks the characters (`type="password"`).                       |
| `className`       | `string`                  |          | —       | Class name for the wrapper `div` of each input.                 |
| `data-cy`         | `string`                  |          | —       | Test attribute, set on each input as `${data-cy}-${index}`.     |
| `data-testid`     | `string`                  |          | —       | Test attribute, set on each input as `${data-testid}-${index}`. |

### TypeScript

```ts
import type { OtpInputProps, OtpInputHandle } from 'reactjs-otp-input';
```

## Docs & playground

The [`docs`](./docs) folder is a Vite + React app with a documentation page and an interactive playground. It imports the library straight from `src`, so changes show up instantly.

```bash
pnpm install
pnpm docs:dev       # start the docs locally (add --host to open it on your phone)
pnpm docs:build     # build the static site into docs/dist
pnpm docs:preview   # preview the production build
```

## Development

```bash
pnpm install
pnpm build       # build the library into dist/
pnpm typecheck   # type-check the source
pnpm lint        # lint
```

Commit messages follow the [commit convention](./.github/commit-convention.md).

## About

<a href="https://www.buymeacoffee.com/hunghg255" target="_blank"><img src="https://cdn.buymeacoffee.com/buttons/default-orange.png" alt="Buy Me A Coffee" height="41" width="174"></a>

Gia Hung – [hung.hg](https://hung.thedev.id)
