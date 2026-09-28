import React, { forwardRef, memo, useCallback, useEffect, useImperativeHandle, useMemo, useRef, useState } from 'react';

type StyleOrClass = React.CSSProperties | string;

export interface OtpInputProps {
  className?: string;
  containerStyle?: StyleOrClass;
  disabledStyle?: StyleOrClass;
  errorStyle?: StyleOrClass;
  focusStyle?: StyleOrClass;
  inputStyle?: StyleOrClass;
  hasErrored?: boolean;
  isDisabled?: boolean;
  isInputNum?: boolean;
  isInputSecure?: boolean;
  numInputs?: number;
  onChange: (otp: string) => void;
  placeholder?: string;
  separator?: React.ReactNode;
  shouldAutoFocus?: boolean;
  value?: string | number;
  'data-testid'?: string;
  'data-cy'?: string;
}

export type OtpInputHandle = {
  focusInput: (index: number) => void;
};

interface SingleOtpInputProps {
  index: number;
  value: string;
  placeholder: string;
  isFocused: boolean;
  isLastChild: boolean;
  isDisabled: boolean;
  hasErrored?: boolean;
  isInputNum?: boolean;
  isInputSecure?: boolean;
  separator?: React.ReactNode;
  className?: string;
  inputStyle?: StyleOrClass;
  focusStyle?: StyleOrClass;
  disabledStyle?: StyleOrClass;
  errorStyle?: StyleOrClass;
  dataCy?: string;
  dataTestId?: string;
  inputRef: (index: number, el: HTMLInputElement | null) => void;
  onChange: (index: number, e: React.ChangeEvent<HTMLInputElement>) => void;
  onKeyDown: (index: number, e: React.KeyboardEvent<HTMLInputElement>) => void;
  onPaste: (index: number, e: React.ClipboardEvent<HTMLInputElement>) => void;
  onFocus: (index: number, e: React.FocusEvent<HTMLInputElement>) => void;
  onBlur: () => void;
}

const isStyleObject = (obj: unknown): obj is React.CSSProperties => typeof obj === 'object' && obj !== null;

const getClassName = (...classes: Array<StyleOrClass | false | undefined>) =>
  classes.filter((c): c is string => typeof c === 'string' && c.length > 0).join(' ') || undefined;

const getStyle = (...styles: Array<StyleOrClass | false | undefined>): React.CSSProperties =>
  Object.assign({ width: '1em', textAlign: 'center' }, ...styles.filter(isStyleObject));

const isValidChar = (char: string, isInputNum?: boolean) => (isInputNum ? /^\d$/.test(char) : char.trim().length === 1);

const SingleOtpInput = memo((props: SingleOtpInputProps) => {
  const {
    index,
    value,
    placeholder,
    isFocused,
    isLastChild,
    isDisabled,
    hasErrored,
    isInputNum,
    isInputSecure,
    separator,
    className,
    inputStyle,
    focusStyle,
    disabledStyle,
    errorStyle,
    dataCy,
    dataTestId,
    inputRef,
    onChange,
    onKeyDown,
    onPaste,
    onFocus,
    onBlur,
  } = props;

  const activeStyles = [
    inputStyle,
    isFocused && focusStyle,
    isDisabled && disabledStyle,
    hasErrored && errorStyle,
  ] as const;

  return (
    <div className={className} style={{ display: 'flex', alignItems: 'center' }}>
      <input
        ref={(el) => inputRef(index, el)}
        aria-label={`${index === 0 ? 'Please enter verification code. ' : ''}${isInputNum ? 'Digit' : 'Character'} ${
          index + 1
        }`}
        // Let iOS / Android suggest the SMS code on any input; the whole code is then spread across all inputs
        autoComplete="one-time-code"
        type={isInputSecure ? 'password' : isInputNum ? 'tel' : 'text'}
        inputMode={isInputNum ? 'numeric' : 'text'}
        pattern={isInputNum ? '[0-9]*' : undefined}
        style={getStyle(...activeStyles)}
        className={getClassName(...activeStyles)}
        placeholder={placeholder}
        disabled={isDisabled}
        value={value}
        data-cy={dataCy}
        data-testid={dataTestId}
        onChange={(e) => onChange(index, e)}
        onKeyDown={(e) => onKeyDown(index, e)}
        onPaste={(e) => onPaste(index, e)}
        onFocus={(e) => onFocus(index, e)}
        onBlur={onBlur}
      />
      {!isLastChild && separator}
    </div>
  );
});

const OtpInput = forwardRef<OtpInputHandle, OtpInputProps>((props, ref) => {
  const {
    numInputs = 4,
    onChange,
    isDisabled = false,
    shouldAutoFocus = false,
    value = '',
    isInputSecure = false,
    placeholder,
    isInputNum,
    containerStyle,
    inputStyle,
    focusStyle,
    separator,
    disabledStyle,
    hasErrored,
    errorStyle,
    className,
  } = props;
  const dataCy = props['data-cy'];
  const dataTestId = props['data-testid'];

  const [activeInput, setActiveInput] = useState(-1);
  const inputRefs = useRef<Array<HTMLInputElement | null>>([]);

  const otp = useMemo(() => value.toString().slice(0, numInputs).split(''), [value, numInputs]);

  const placeholders = useMemo(() => {
    if (!placeholder) {
      return '';
    }

    if (placeholder.length !== numInputs) {
      // eslint-disable-next-line no-console
      console.error('Length of the placeholder should be equal to the number of inputs.');
      return '';
    }

    return placeholder;
  }, [numInputs, placeholder]);

  // Keep the latest values in a ref so event handlers can stay referentially stable,
  // which lets the memoized inputs skip re-rendering when nothing relevant changed.
  const latest = useRef({ otp, numInputs, isDisabled, isInputNum, onChange });
  latest.current = { otp, numInputs, isDisabled, isInputNum, onChange };

  const focusInput = useCallback((index: number) => {
    const target = inputRefs.current[Math.max(Math.min(latest.current.numInputs - 1, index), 0)];

    if (target) {
      target.focus();
      target.select();
    }
  }, []);

  useImperativeHandle(ref, () => ({ focusInput }), [focusInput]);

  useEffect(() => {
    if (shouldAutoFocus) {
      focusInput(0);
    }
    // Only on first render
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const emitChange = useCallback((nextOtp: string[]) => {
    latest.current.onChange(nextOtp.join(''));
  }, []);

  const updateAt = useCallback(
    (index: number, char: string) => {
      const nextOtp = latest.current.otp.slice();

      nextOtp[index] = char;
      // Fill holes so `join` keeps characters in their position
      for (let i = 0; i < index; i++) {
        nextOtp[i] = nextOtp[i] ?? '';
      }
      emitChange(nextOtp);
    },
    [emitChange]
  );

  // Spread `text` over the inputs starting at `index` (paste, keyboard clipboard, SMS autofill).
  // A complete code always starts from the first input, wherever the user was.
  const insertText = useCallback(
    (index: number, text: string) => {
      const { numInputs, isInputNum, otp } = latest.current;
      const chars = text.split('').filter((c) => isValidChar(c, isInputNum));

      if (chars.length === 0) {
        return;
      }

      const start = chars.length >= numInputs ? 0 : index;
      const nextOtp = Array.from({ length: numInputs }, (_, i) => otp[i] ?? '');

      chars.slice(0, numInputs - start).forEach((c, i) => {
        nextOtp[start + i] = c;
      });
      emitChange(nextOtp);
      focusInput(start + chars.length);
    },
    [emitChange, focusInput]
  );

  const handleChange = useCallback(
    (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
      const { value: inputValue } = e.target;
      const { otp, isInputNum } = latest.current;
      const current = otp[index] ?? '';

      // Android keyboards often fire keyCode 229 instead of Backspace, so the deletion arrives here
      if (inputValue === '') {
        updateAt(index, '');
        focusInput(index - 1);
        return;
      }

      // The input can hold more than one character when the previous one wasn't selected
      // (caret before/after it) or when text is inserted without a paste event
      // (mobile keyboard clipboard suggestion, SMS autofill). Drop the previous character first.
      let inserted = inputValue;

      if (current && inputValue.length > 1) {
        // The caret sits right after the inserted text, which tells us on which side the old character is
        const caretAtEnd = (e.target.selectionStart ?? inputValue.length) === inputValue.length;

        if (caretAtEnd && inputValue.startsWith(current)) {
          inserted = inputValue.slice(1);
        } else if (inputValue.endsWith(current)) {
          inserted = inputValue.slice(0, -1);
        } else if (inputValue.startsWith(current)) {
          inserted = inputValue.slice(1);
        }
      }

      if (inserted.length > 1) {
        insertText(index, inserted);
        return;
      }

      if (isValidChar(inserted, isInputNum)) {
        updateAt(index, inserted);
        focusInput(index + 1);
      }
    },
    [focusInput, insertText, updateAt]
  );

  const handleKeyDown = useCallback(
    (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
      const { otp } = latest.current;

      if (e.key === 'Backspace') {
        e.preventDefault();
        // Clear the current input, or the previous one when the current is already empty
        if (otp[index]) {
          updateAt(index, '');
        } else if (index > 0) {
          updateAt(index - 1, '');
        }
        focusInput(index - 1);
      } else if (e.key === 'Delete') {
        e.preventDefault();
        updateAt(index, '');
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        focusInput(index - 1);
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        focusInput(index + 1);
      } else if (e.key === ' ' || e.key === 'Spacebar') {
        e.preventDefault();
      } else if (e.key === otp[index] && !e.ctrlKey && !e.metaKey && !e.altKey) {
        // Same character typed again: the input value won't change, so move on manually
        e.preventDefault();
        focusInput(index + 1);
      }
    },
    [focusInput, updateAt]
  );

  const handlePaste = useCallback(
    (index: number, e: React.ClipboardEvent<HTMLInputElement>) => {
      e.preventDefault();

      if (latest.current.isDisabled) {
        return;
      }

      insertText(index, e.clipboardData.getData('text/plain'));
    },
    [insertText]
  );

  const handleFocus = useCallback((index: number, e: React.FocusEvent<HTMLInputElement>) => {
    setActiveInput(index);
    e.target.select();
  }, []);

  const handleBlur = useCallback(() => setActiveInput(-1), []);

  const setInputRef = useCallback((index: number, el: HTMLInputElement | null) => {
    inputRefs.current[index] = el;
  }, []);

  return (
    <div
      style={Object.assign({ display: 'flex' }, isStyleObject(containerStyle) && containerStyle)}
      className={typeof containerStyle === 'string' ? containerStyle : undefined}
    >
      {Array.from({ length: numInputs }, (_, i) => (
        <SingleOtpInput
          key={i}
          index={i}
          value={otp[i] ?? ''}
          placeholder={placeholders[i] ?? ''}
          isFocused={activeInput === i}
          isLastChild={i === numInputs - 1}
          isDisabled={isDisabled}
          hasErrored={hasErrored}
          isInputNum={isInputNum}
          isInputSecure={isInputSecure}
          separator={separator}
          className={className}
          inputStyle={inputStyle}
          focusStyle={focusStyle}
          disabledStyle={disabledStyle}
          errorStyle={errorStyle}
          dataCy={dataCy && `${dataCy}-${i}`}
          dataTestId={dataTestId && `${dataTestId}-${i}`}
          inputRef={setInputRef}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          onPaste={handlePaste}
          onFocus={handleFocus}
          onBlur={handleBlur}
        />
      ))}
    </div>
  );
});

export { OtpInput };
