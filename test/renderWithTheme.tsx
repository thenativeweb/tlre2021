import { ReactElement } from 'react';
import { render } from '@testing-library/react';
import { Theme } from '../src/layout/Theme';
import { DefaultTheme, ThemeProvider } from 'styled-components';

const renderWithTheme = (component: ReactElement, theme: DefaultTheme = Theme): void => {
  render(
    <ThemeProvider theme={ theme }>
      {component}
    </ThemeProvider>
  );
};

export {
  renderWithTheme
};
