import { Party } from '../src/domain/Party';

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

export {
  mockParties
};
