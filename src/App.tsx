import { AppProviders } from './AppProviders';
import { createGlobalStyle } from 'styled-components';
import { PageLayout } from './layout/PageLayout';
import { PartyEdit } from './app/PartyEdit/PartyEdit';
import { PartyOverview } from './app/PartyOverview/PartyOverview';
import { ReactElement } from 'react';
import {
  Route,
  BrowserRouter as Router,
  Switch
} from 'react-router-dom';

const GlobalStyles = createGlobalStyle`
  body {
    margin: 0;
  };
`;
const App = function (): ReactElement {
  return (
    <AppProviders>
      <GlobalStyles />
      <Router>
        <PageLayout title='Halloween Party Planner'>
          <Switch>
            <Route exact={ true } path='/' component={ PartyOverview } />
            <Route path='/edit/:id' component={ PartyEdit } />
          </Switch>
        </PageLayout>
      </Router>
    </AppProviders>
  );
};

export { App };
