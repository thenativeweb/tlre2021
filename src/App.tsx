import { Headline } from './components/base/Headline';
import { PartyList } from './app/PartyList';
import { Theme } from './layout/Theme';
import React, { ReactElement } from 'react';
import styled, { createGlobalStyle, ThemeProvider } from 'styled-components';

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
          <PartyList />
        </AppContainer>
      </ThemeProvider>
    </React.Fragment>
  );
};

export { App };
