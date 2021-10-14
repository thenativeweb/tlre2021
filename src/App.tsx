import { AppProviders } from './AppProviders';
import { createGlobalStyle } from 'styled-components';
import { PageLayout } from './layout/PageLayout';
import { PartyOverview } from './app/PartyOverview/PartyOverview';
import { ReactElement } from 'react';

const GlobalStyles = createGlobalStyle`
  body {
    margin: 0;
  };
`;
const App = function (): ReactElement {
  return (
    <AppProviders>
      <GlobalStyles />
      <PageLayout title='Halloween Party Planner'>
        <PartyOverview />
      </PageLayout>
    </AppProviders>
  );
};

export { App };
