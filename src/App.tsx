import { Headline } from './components/base/Headline';
import { Party } from './domain/Party';
import { PartyDetails } from './app/PartyDetails';
import { Theme } from './layout/Theme';
import React, { ReactElement } from 'react';
import styled, { createGlobalStyle, ThemeProvider } from 'styled-components';

const partyData: Party = {
  host: {
    name: 'David',
    avatarUrl: 'david_avatar.jpg'
  },
  description: 'Es herrscht Kostüm-Pflicht! Bitte bringe eine Kleinigkeit zu Essen mit (Salat, Fingerfoog, Nachspeise).',
  guests: [
    { name: 'Selina', costume: 'Catwoman' },
    { name: 'Bruce', costume: 'Batman' },
    { name: 'Kim' }
  ]
};

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
  }
`;

const AppContainer = styled.div`
  text-align: center;
  font-family: ${(props): any => props.theme.fonts.text};
`;

const App = function (): ReactElement {
  return (
    <React.Fragment>
      <GlobalStyle />
      <ThemeProvider theme={ Theme }>
        <AppContainer>
          <Headline>Halloween Party Planner</Headline>
          <PartyDetails partyData={ partyData } />
        </AppContainer>
      </ThemeProvider>
    </React.Fragment>
  );
};

export { App };
