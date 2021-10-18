import { ApiContext } from './app/api/PartyApi/ApiContext';
import { createFetchPartyApi } from './app/api/PartyApi/FetchPartyApi';
import { i18n } from './app/i18n/i18nService';
import { I18nextProvider } from 'react-i18next';
import { Theme } from './layout/Theme';
import { ThemeProvider } from 'styled-components';
import { FunctionComponent, ReactElement } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';

const queryClient = new QueryClient();

const AppProviders: FunctionComponent = ({ children }): ReactElement => (
  <ThemeProvider theme={ Theme }>
    <ApiContext.Provider value={ createFetchPartyApi() }>
      <I18nextProvider i18n={ i18n }>
        <QueryClientProvider client={ queryClient }>
          {children}
        </QueryClientProvider>
      </I18nextProvider>
    </ApiContext.Provider>
  </ThemeProvider>
);

export {
  AppProviders
};
