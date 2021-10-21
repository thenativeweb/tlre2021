import { ApiContext } from './app/api/PartyApi/ApiContext';
import { createAppStore } from './app/redux/store';
import { createFetchPartyApi } from './app/api/PartyApi/FetchPartyApi';
import { i18n } from './app/i18n/i18nService';
import { I18nextProvider } from 'react-i18next';
import { Provider } from 'react-redux';
import { Theme } from './layout/Theme';
import { ThemeProvider } from 'styled-components';
import { FlatProviderArray, FlatProviders, providerFrom } from './utils/FlatProviders';
import { FunctionComponent, ReactElement } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';

const queryClient = new QueryClient();
const providers: FlatProviderArray = [
  providerFrom(ThemeProvider, { theme: Theme }),
  providerFrom(Provider, { store: createAppStore() }),
  providerFrom(ApiContext.Provider, { value: createFetchPartyApi() }),
  providerFrom(I18nextProvider, { i18n }),
  providerFrom(QueryClientProvider, { client: queryClient })
];

const AppProviders: FunctionComponent = ({ children }): ReactElement =>
  <FlatProviders providers={ providers }>{children}</FlatProviders>;

export {
  AppProviders
};
