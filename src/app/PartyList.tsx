import { Party } from '../domain/Party';
import { PartyDetails } from './PartyDetails';
import styled from 'styled-components';
import React, { FunctionComponent, ReactElement } from 'react';

const StyledPartyList = styled.ul`
  list-style-type: none;
  
  li {
    margin-bottom: 10px;
  }
`;

const parties: Party[] = [
  {
    id: 1,
    host: {
      name: 'David',
      avatarUrl: 'david_avatar.jpg'
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
      avatarUrl: 'golo_avatar.jpg'
    },
    description: 'Die beste Party des Jahres! Mit den besten Elektro-Beats überhaupt!',
    guests: []
  }
];

const PartyList: FunctionComponent = (): ReactElement => {
  const allParties = parties.map((party): ReactElement => (
    <li key={ party.id }>
      <PartyDetails key={ party.id } partyData={ party } />
    </li>
  ));

  return (
    <StyledPartyList>
      {allParties}
    </StyledPartyList>
  );
};

export {
  PartyList
};
