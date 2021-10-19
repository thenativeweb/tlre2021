import { Headline } from './components/Headline';
import { PageLayout } from './layout/PageLayout';
import { Party } from './domain/Party';
import { PartyList } from './app/PartyList';
import { ReactElement } from 'react';
import { Theme } from './layout/Theme';
import { ThemeProvider } from 'styled-components';

const mockParties: Party[] = [
  {
    id: 1,
    host: {
      name: 'David',
      avatarUrl: 'avatare/avatar1.jpg'
    },
    description: 'Gruselig schaurige Party - mit ordentlich Metal und Rock Musik!',
    guests: [
      { name: 'Selina', costume: 'Catwoman' },
      { name: 'Bruce', costume: 'Batman' },
      { name: 'Kim' }
    ]
  },
  {
    id: 2,
    host: {
      name: 'Golo',
      avatarUrl: 'avatare/avatar2.jpg'
    },
    description: 'Die beste Party des Jahres! Mit den besten Elektro-Beats überhaupt!',
    guests: []
  }
];

const App = function (): ReactElement {
  return (
    <ThemeProvider theme={ Theme }>
      <PageLayout>
        <Headline>Halloween Party Planner</Headline>
        <PartyList parties={ mockParties } />
      </PageLayout>
    </ThemeProvider>
  );
};

export { App };
