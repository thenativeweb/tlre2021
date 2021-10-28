import { ProfiledApp } from './App';
import React from 'react';
import ReactDOM from 'react-dom';
import './types/hppWindow.d.ts';

ReactDOM.render(
  <React.StrictMode>
    <ProfiledApp />
  </React.StrictMode>,
  document.getElementById('root')
);

// eslint-disable-next-line no-process-env
if (process.env.NODE_ENV !== 'production') {
  // eslint-disable-next-line @typescript-eslint/no-floating-promises
  (async (): Promise<void> => {
    const { default: axe } = await import('@axe-core/react');

    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    axe(React, ReactDOM, 1_000);
  })();
}
