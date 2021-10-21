/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @typescript-eslint/no-unnecessary-condition */
/* eslint-disable @typescript-eslint/explicit-function-return-type */

// Jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';
import '../src/app/i18n/i18nService';

// Allow party-js plugin to work properly in tests
window.matchMedia = window.matchMedia || function () {
  return {
    matches: false,
    addListener (): void {},
    removeListener (): void {}
  };
};

/* eslint-enable @typescript-eslint/explicit-function-return-type */
/* eslint-enable @typescript-eslint/no-unnecessary-condition */
/* eslint-enable @typescript-eslint/no-empty-function */
