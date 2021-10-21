import { createAppStore } from '../src/app/redux/store';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { ReactElement } from 'react';
import { Theme } from '../src/layout/Theme';
import { ThemeProvider } from 'styled-components';
import { FlatProviderArray, FlatProviders, providerFrom } from '../src/utils/FlatProviders';
import { QueryClient, QueryClientProvider } from 'react-query';
import { render, RenderResult } from '@testing-library/react';

const renderWithProviders = (component: ReactElement): RenderResult => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: 0
      },
      mutations: {
        retry: 0
      }
    }
  });

  const store = createAppStore();
  const providers: FlatProviderArray = [
    providerFrom(ThemeProvider, { theme: Theme }),
    providerFrom(Provider, { store }),
    providerFrom(QueryClientProvider, { client: queryClient }),
    providerFrom(MemoryRouter)
  ];

  return render(
    <FlatProviders providers={ providers }>
      {component}
    </FlatProviders>
  );
};

export {
  renderWithProviders
};
