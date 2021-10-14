import { defaultTextContext } from '../src/app/texts/defaultTextContent';
import { ReactElement } from 'react';
import { render } from '@testing-library/react';
import { TextContext } from '../src/app/texts/TextContext';
import { Theme } from '../src/layout/Theme';
import { ThemeProvider } from 'styled-components';

const renderWithProviders = (component: ReactElement): void => {
  render(
    <ThemeProvider theme={ Theme }>
      <TextContext.Provider value={ defaultTextContext }>
        {component}
      </TextContext.Provider>
    </ThemeProvider>
  );
};

export {
  renderWithProviders
};
