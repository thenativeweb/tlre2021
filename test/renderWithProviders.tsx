import { defaultTextContext } from '../src/app/texts/defaultTextContent';
import { ReactElement } from 'react';
import { TextContext } from '../src/app/texts/TextContext';
import { Theme } from '../src/layout/Theme';
import { ThemeProvider } from 'styled-components';
import { render, RenderResult } from '@testing-library/react';

const renderWithProviders = (component: ReactElement): RenderResult => render(
  <ThemeProvider theme={ Theme }>
    <TextContext.Provider value={ defaultTextContext }>
      {component}
    </TextContext.Provider>
  </ThemeProvider>
);

export {
  renderWithProviders
};
