import { useEffect, useState } from 'react';

import { Docs } from './pages/Docs';
import { Playground } from './pages/Playground';
import { useRoute } from './router';

type Theme = 'light' | 'dark';

const getInitialTheme = (): Theme => {
  try {
    const saved = localStorage.getItem('theme');

    if (saved === 'light' || saved === 'dark') {
      return saved;
    }
  } catch {}

  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
};

export const App = () => {
  const route = useRoute();
  const [theme, setTheme] = useState<Theme>(getInitialTheme);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    try {
      localStorage.setItem('theme', theme);
    } catch {}
  }, [theme]);

  return (
    <>
      <header className="header">
        <div className="header__inner">
          <a href="#/" className="brand">
            <span className="brand__logo" aria-hidden>
              ••
            </span>
            <span className="brand__name">reactjs-otp-input</span>
          </a>
          <nav className="nav">
            <a href="#/" className={route === 'docs' ? 'nav__link is-active' : 'nav__link'}>
              Docs
            </a>
            <a href="#/playground" className={route === 'playground' ? 'nav__link is-active' : 'nav__link'}>
              Playground
            </a>
            <a
              href="https://github.com/hunghg255/reactjs-otp-input"
              target="_blank"
              rel="noreferrer"
              className="nav__link nav__link--external"
            >
              GitHub
            </a>
            <button
              type="button"
              className="icon-btn"
              aria-label="Toggle color theme"
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            >
              {theme === 'dark' ? '☀' : '☾'}
            </button>
          </nav>
        </div>
      </header>
      <main className="main">{route === 'playground' ? <Playground /> : <Docs />}</main>
      <footer className="footer">
        MIT Licensed · Made by <a href="https://github.com/hunghg255">hunghg255</a>
      </footer>
    </>
  );
};
