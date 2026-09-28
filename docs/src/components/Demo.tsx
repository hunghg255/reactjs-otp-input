import type { ReactNode } from 'react';

import { CodeBlock } from './CodeBlock';

export const Demo = ({ children, code }: { children: ReactNode; code: string }) => (
  <div className="demo">
    <div className="demo__preview">{children}</div>
    <CodeBlock code={code} />
  </div>
);
