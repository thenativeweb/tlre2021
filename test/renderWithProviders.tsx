import { createAppStore } from '../src/app/redux/store';
import { Provider } from 'react-redux';
import { ReactElement } from 'react';
import { Theme } from '../src/layout/Theme';
import { ThemeProvider } from 'styled-components';
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

  return render(
    <ThemeProvider theme={ Theme }>
      <Provider store={ store }>
        <QueryClientProvider client={ queryClient }>
          {component}
        </QueryClientProvider>
      </Provider>
    </ThemeProvider>

  );
};

export {
  renderWithProviders
};
