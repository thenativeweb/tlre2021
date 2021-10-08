import { ApiContext } from './app/api/ApiContext';
import { createFetchPartyApi } from './app/api/FetchPartyApi';
import { defaultTextContext } from './app/texts/defaultTextContent';
import { TextContext } from './app/texts/TextContext';
import { Theme } from './layout/Theme';
import { ThemeProvider } from 'styled-components';
import { FunctionComponent, ReactElement } from 'react';

const AppProviders: FunctionComponent = ({ children }): ReactElement => (
  <ThemeProvider theme={ Theme }>
    <TextContext.Provider value={ defaultTextContext }>
      <ApiContext.Provider value={ createFetchPartyApi() }>
        {children}
      </ApiContext.Provider>
    </TextContext.Provider>
  </ThemeProvider>
);

export {
  AppProviders
};
