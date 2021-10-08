import { createFetchPartyApi } from './app/api/FetchPartyApi';
import { defaultTextContext } from './app/texts/defaultTextContent';
import { PageLayout } from './layout/PageLayout';
import { PartyOverview } from './app/PartyOverview/PartyOverview';
import { ReactElement } from 'react';
import { TextContext } from './app/texts/TextContext';
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
      <TextContext.Provider value={ defaultTextContext }>
        <GlobalStyles />
        <PageLayout title='Halloween Party Planner'>
          <PartyOverview partyApi={ createFetchPartyApi() } />
        </PageLayout>
      </TextContext.Provider>
    </ThemeProvider>
  );
};

export { App };
