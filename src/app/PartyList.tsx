import { addGuestToParty } from './partyStateService';
import { Button } from '../components/base/Button';
import { Guest } from '../domain/Guest';
import { Party } from '../domain/Party';
import { PartyDetails } from './PartyDetails';
import { PartyForm } from '../components/party/PartyForm';
import { PartyOverview } from '../components/party/PartyOverview';
import styled from 'styled-components';
import { UnstoredParty } from '../domain/UnstoredParty';
import React, { FunctionComponent, ReactElement, useState } from 'react';

const StyledPartyList = styled.ul`
  list-style-type: none;
  
  li {
    margin-bottom: 10px;
  }
`;

interface PartyListProps {
  parties: Party[];
  onAddParty: (newParty: UnstoredParty) => void;
  onUpdateParty: (updatedParty: Party) => void;
}

const PartyList: FunctionComponent<PartyListProps> = ({ parties, onAddParty, onUpdateParty }): ReactElement => {
  const [ showPartyForm, setShowPartyForm ] = useState<boolean>(false);

  const toggleShowPartyForm = (): void => {
    setShowPartyForm((currentState): boolean => !currentState);
  };

  const handleNewGuestFor = async (party: Party, newGuest: Guest): Promise<void> => {
    const updatedParty = addGuestToParty(party, newGuest);

    onUpdateParty(updatedParty);
  };

  const handleNewParty = async (newParty: UnstoredParty): Promise<void> => {
    toggleShowPartyForm();
    onAddParty(newParty);
  };

  const partyDetails = parties.map((party): ReactElement => (
    <li key={ party.id }>
      <PartyDetails
        partyData={ party }
        handleNewGuest={ (newGuest: Guest): void => {
          // eslint-disable-next-line @typescript-eslint/no-floating-promises
          handleNewGuestFor(party, newGuest);
        } }
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
