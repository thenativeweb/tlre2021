import { createFetchPartyApi } from './app/api/FetchPartyApi';
import { PageLayout } from './layout/PageLayout';
import { PartyOverviewContainer } from './app/PartyOverview/PartyOverviewContainer';
import { ReactElement } from 'react';
import { Theme } from './layout/Theme';
import { createGlobalStyle, ThemeProvider } from 'styled-components';

const GlobalStyles = createGlobalStyle`
  body {
    margin: 0;
  };
`;
const App = function (): ReactElement {
  return (
    <ThemeProvider theme={ Theme }>
      <GlobalStyles />
      <PageLayout title='Halloween Party Planner'>
        <PartyOverviewContainer partyApi={ createFetchPartyApi() } />
      </PageLayout>
    </ThemeProvider>
  );
};

export { App };
