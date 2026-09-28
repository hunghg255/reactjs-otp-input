<p align="center">
<a href="https://www.npmjs.com/package/reactjs-otp-input" target="_blank" rel="noopener noreferrer">
<img src="https://api.iconify.design/teenyicons:otp-outline.svg?color=%23fdb4e2" alt="logo" width='100'/></a>
</p>

<p align="center">
  A library reactjs to create OTP input
</p>

<p align="center">
  <a href="https://www.npmjs.com/package/reactjs-otp-input" target="_blank" rel="noopener noreferrer"><img src="https://badge.fury.io/js/csvs-parsers.svg" alt="NPM Version" /></a>
  <a href="https://www.npmjs.com/package/reactjs-otp-input" target="_blank" rel="noopener noreferrer"><img src="https://img.shields.io/npm/dt/csvs-parsers.svg?logo=npm" alt="NPM Downloads" /></a>
  <a href="https://bundlephobia.com/result?p=reactjs-otp-input" target="_blank" rel="noopener noreferrer"><img src="https://img.shields.io/bundlephobia/minzip/reactjs-otp-input" alt="Minizip" /></a>
  <a href="https://github.com/hunghg255/reactjs-otp-input/graphs/contributors" target="_blank" rel="noopener noreferrer"><img src="https://img.shields.io/badge/all_contributors-1-orange.svg" alt="Contributors" /></a>
  <a href="https://github.com/hunghg255/reactjs-otp-input/blob/main/LICENSE" target="_blank" rel="noopener noreferrer"><img src="https://badgen.net/github/license/hunghg255/reactjs-otp-input" alt="License" /></a>
</p>

A fully customizable, one-time password input component for the web built with React.

![see here](https://media.giphy.com/media/lN98dFU6h3oP0wWS5x/giphy.gif)

## Support auto fill on mobile (safari, chrome....)

![see here](https://res.cloudinary.com/hunghg255/image/upload/v1690099530/react-otp-input_r7ukv1.png)

[Live Demo](https://reactjs-otp-input-demo.vercel.app/)

## Installation

[![NPM](https://nodei.co/npm/reactjs-otp-input.png?compact=true)](https://nodei.co/npm/reactjs-otp-input/)

## To install the latest stable version:

```
pnpm install reactjs-otp-input@latest
```

## Basic usage:

```jsx
import { useState } from 'react';
import { OtpInput } from 'reactjs-otp-input';

const App = () => {
  const [otp, setOtp] = useState('');

  const handleChange = (otp) => setOtp(otp);

  return <OtpInput value={otp} onChange={handleChange} numInputs={6} separator={<span>-</span>} />;
};
```

## Docs & playground

The `docs` folder is a Vite + React app with a documentation page and an interactive playground. It imports the library straight from `src`, so changes show up instantly.

```
pnpm install
pnpm docs:dev     # start the docs locally
pnpm docs:build   # build the static site into docs/dist
```

## API

<table>
  <tr>
    <th>Name<br/></th>
    <th>Type</th>
    <th>Required</th>
    <th>Default</th>
    <th>Description</th>
  </tr>
  <tr>
    <td>numInputs</td>
    <td>number</td>
    <td>false</td>
    <td>4</td>
    <td>Number of OTP inputs to be rendered.</td>
  </tr>
  <tr>
    <td>onChange</td>
    <td>(otp: string) => void</td>
    <td>true</td>
    <td>-</td>
    <td>Returns OTP code typed in inputs.</td>
  </tr>
  <tr>
    <td>value</td>
    <td>string / number</td>
    <td>false</td>
    <td>''</td>
    <td>The value of the OTP passed into the component.</td>
  </tr>
    <tr>
     <td>placeholder</td>
     <td>string</td>
     <td>false</td>
     <td>none</td>
     <td>Specify an expected value of each input. The length of this string should be equal to <code>numInputs</code>.</td>
   </tr>
  <tr>
    <td>separator</td>
    <td>component<br/></td>
    <td>false</td>
    <td>none</td>
    <td>Provide a custom separator between inputs by passing a component. For instance, <code>&lt;span&gt;-&lt;/span&gt;</code> would add <code>-</code> between each input.</td>
  </tr>
  <tr>
    <td>containerStyle</td>
    <td>style (object) / className (string)</td>
    <td>false</td>
    <td>none</td>
    <td>Style applied or class passed to container of inputs.</td>
  </tr>
  <tr>
    <td>inputStyle</td>
    <td>style (object) / className (string)</td>
    <td>false</td>
    <td>none</td>
    <td>Style applied or class passed to each input.</td>
  </tr>
  <tr>
    <td>focusStyle</td>
    <td>style (object) / className (string)</td>
    <td>false</td>
    <td>none</td>
    <td>Style applied or class passed to inputs on focus.</td>
  </tr>
  <tr>
    <td>isDisabled</td>
    <td>boolean</td>
    <td>false</td>
    <td>false</td>
    <td>Disables all the inputs.</td>
  </tr>
  <tr>
    <td>disabledStyle</td>
    <td>style (object) / className (string)</td>
    <td>false</td>
    <td>none</td>
    <td>Style applied or class passed to each input when disabled.</td>
  </tr>
  <tr>
    <td>hasErrored</td>
    <td>boolean</td>
    <td>false</td>
    <td>false</td>
    <td>Indicates there is an error in the inputs.</td>
  </tr>
  <tr>
    <td>errorStyle</td>
    <td>style (object) / className (string)</td>
    <td>false</td>
    <td>none</td>
    <td>Style applied or class passed to each input when errored.</td>
  </tr>
  <tr>
    <td>shouldAutoFocus</td>
    <td>boolean</td>
    <td>false</td>
    <td>false</td>
    <td>Auto focuses input on initial page load.</td>
  </tr>
  <tr>
    <td>isInputNum</td>
    <td>boolean</td>
    <td>false</td>
    <td>false</td>
    <td>Restrict input to only numbers.</td>
  </tr>
  <tr>
    <td>isInputSecure</td>
    <td>boolean</td>
    <td>false</td>
    <td>false</td>
    <td>Masks input characters.</td>
  </tr>
  <tr>
    <td>data-cy</td>
    <td>string</td>
    <td>false</td>
    <td>-</td>
    <td>Test attribute passed to the inputs.</td>
  </tr>
  <tr>
    <td>data-testid</td>
    <td>string</td>
    <td>false</td>
    <td>-</td>
    <td>Test attribute passed to the inputs.</td>
  </tr>
</table>

### About

<a href="https://www.buymeacoffee.com/hunghg255" target="_blank"><img src="https://cdn.buymeacoffee.com/buttons/default-orange.png" alt="Buy Me A Coffee" height="41" width="174"></a>

Gia Hung – [hung.hg](https://hung.thedev.id)
