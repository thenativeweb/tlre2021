import { createFetchPartyApi } from './app/FetchPartyApi';
import { Headline } from './components/base/Headline';
import { PageLayout } from './layout/PageLayout';
import { PartyOverviewContainer } from './app/PartyOverviewContainer';
import { Theme } from './layout/Theme';
import { ThemeProvider } from 'styled-components';
import React, { ReactElement } from 'react';

const App = function (): ReactElement {
  return (
    <ThemeProvider theme={ Theme }>
      <PageLayout>
        <Headline>Halloween Party Planner</Headline>
        <PartyOverviewContainer partyApi={ createFetchPartyApi() } />
      </PageLayout>
    </ThemeProvider>
  );
};

export { App };
