import { addDecorator } from "@storybook/react";
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createAppStore } from '../src/app/redux/store';
import { withThemesProvider } from "storybook-addon-styled-component-theme";
import { ThemeProvider } from "styled-components";
import { Theme } from '../src/layout/Theme';
import '../src/app/i18n/i18nService';

const themes = [Theme];
addDecorator(withThemesProvider(themes), ThemeProvider);

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
}

export const decorators = [
  (Story) => (
    <Provider store={createAppStore()}>
      <MemoryRouter>
        <Story />
      </MemoryRouter>
    </Provider>
  ),
]
