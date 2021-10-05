import { Button } from '../components/base/Button';
import { Guest } from '../domain/Guest';
import { Party } from '../domain/Party';
import { PartyDetails } from './PartyDetails';
import { PartyForm } from '../components/party/PartyForm';
import { PartyOverview } from '../components/party/PartyOverview';
import styled from 'styled-components';
import { UnstoredParty } from '../domain/UnstoredParty';
import { addGuestToParty, addParty, updateParty } from './partyStateService';
import React, { FunctionComponent, ReactElement, useState } from 'react';

const StyledPartyList = styled.ul`
  list-style-type: none;
  
  li {
    margin-bottom: 10px;
  }
`;

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

const PartyList: FunctionComponent = (): ReactElement => {
  const [ parties, setParties ] = useState<Party[]>(mockParties);
  const [ showPartyForm, setShowPartyForm ] = useState<boolean>(true);

  const handleNewGuestFor = (party: Party, newGuest: Guest): void => {
    setParties(updateParty(parties, addGuestToParty(party, newGuest)));
  };

  const toggleShowPartyForm = (): void => {
    setShowPartyForm((currentState): boolean => !currentState);
  };

  const handleNewParty = (newParty: UnstoredParty): void => {
    setParties((currentParties): Party[] => addParty(currentParties, newParty));
    toggleShowPartyForm();
  };

  const partyDetails = parties.map((party): ReactElement => (
    <li key={ party.id }>
      <PartyDetails
        partyData={ party }
        handleNewGuest={ (newGuest: Guest): void => handleNewGuestFor(party, newGuest) }
      />
    </li>
  ));

  return (
    <React.Fragment>
      <PartyOverview parties={ parties } />
      <Button onClick={ toggleShowPartyForm }>Neue Party hinzufügen</Button>
      {showPartyForm && <PartyForm onPartySave={ handleNewParty } />}
      <StyledPartyList>
        {partyDetails}
      </StyledPartyList>
    </React.Fragment>
  );
};

export {
  PartyList
};
