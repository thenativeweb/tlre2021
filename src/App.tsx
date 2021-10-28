import { AppProviders } from './AppProviders';
import { createBrowserHistory } from 'history';
import { createGlobalStyle } from 'styled-components';
import { Integrations } from '@sentry/tracing';
import { PageLayout } from './layout/PageLayout';
import { PartyEditPage } from './app/PartyEdit/PartyEditPage';
import { PartyOverview } from './app/PartyOverview/PartyOverview';
import { ReactElement } from 'react';
import { routes } from './app/routes';
import {
  Route,
  Router,
  Switch
} from 'react-router-dom';
import * as Sentry from '@sentry/react';

const GlobalStyles = createGlobalStyle`
  body {
    margin: 0;
  };
`;

/* eslint-disable no-process-env */
/* eslint-disable @typescript-eslint/naming-convention */
const { NODE_ENV, REACT_APP_SENTRY_DSN } = process.env;
const useSentry: boolean = NODE_ENV === 'production' && Boolean(REACT_APP_SENTRY_DSN);
const history = createBrowserHistory();
/* eslint-enable @typescript-eslint/naming-convention */
/* eslint-enable no-process-env */

Sentry.init({
  enabled: useSentry,
  dsn: REACT_APP_SENTRY_DSN,
  integrations: [ new Integrations.BrowserTracing({
    tracingOrigins: [ 'localhost', /^\//u ],
    routingInstrumentation: Sentry.reactRouterV5Instrumentation(history)
  }) ],
  release: 'reactober@1.0.0',

  // Set tracesSampleRate to 1.0 to capture 100%
  // of transactions for performance monitoring.
  // We recommend adjusting this value in production
  tracesSampleRate: 1
});

const SentryRoute = Sentry.withSentryRouting(Route);

const App = function (): ReactElement {
  return (
    <AppProviders>
      <GlobalStyles />
      <Router history={ history }>
        <PageLayout title='Halloween Party Planner'>
          <Switch>
            <SentryRoute exact={ true } path='/' component={ PartyOverview } />
            <SentryRoute path={ routes.editParty.routerUrl } component={ PartyEditPage } />
          </Switch>
        </PageLayout>
      </Router>
      <button
        onClick={ (): void => {
          throw new Error('This appears in Sentry!');
        } }
      >Send Error to Sentry and crash the App!
      </button>
    </AppProviders>
  );
};

const ProfiledApp = Sentry.withProfiler(App);

export { ProfiledApp };
