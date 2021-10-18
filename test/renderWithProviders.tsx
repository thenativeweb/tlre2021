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

  return render(
    <ThemeProvider theme={ Theme }>
      <QueryClientProvider client={ queryClient }>
        {component}
      </QueryClientProvider>
    </ThemeProvider>

  );
};

export {
  renderWithProviders
};
