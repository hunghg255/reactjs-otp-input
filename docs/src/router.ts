import { useEffect, useState } from 'react';

export type Route = 'docs' | 'playground';

const parse = (): Route => (window.location.hash.replace(/^#\/?/, '') === 'playground' ? 'playground' : 'docs');

// Tiny hash router: works on any static host without server rewrites
export const useRoute = () => {
  const [route, setRoute] = useState<Route>(parse);

  useEffect(() => {
    const onChange = () => {
      setRoute(parse());
      window.scrollTo(0, 0);
    };

    window.addEventListener('hashchange', onChange);
    return () => window.removeEventListener('hashchange', onChange);
  }, []);

  return route;
};
