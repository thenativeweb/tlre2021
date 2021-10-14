import { ApiContext } from './app/api/PartyApi/ApiContext';
import { createFetchPartyApi } from './app/api/PartyApi/FetchPartyApi';
import { defaultTextContext } from './app/texts/defaultTextContent';
import { TextContext } from './app/texts/TextContext';
import { Theme } from './layout/Theme';
import { ThemeProvider } from 'styled-components';
import { FunctionComponent, ReactElement } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';

const queryClient = new QueryClient();

const AppProviders: FunctionComponent = ({ children }): ReactElement => (
  <ThemeProvider theme={ Theme }>
    <TextContext.Provider value={ defaultTextContext }>
      <ApiContext.Provider value={ createFetchPartyApi() }>
        <QueryClientProvider client={ queryClient }>
          {children}
        </QueryClientProvider>
      </ApiContext.Provider>
    </TextContext.Provider>
  </ThemeProvider>
);

export {
  AppProviders
};
