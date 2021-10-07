import { addGuestToParty } from '../../partyStateService';
import { Guest } from '../../../domain/Guest';
import { Party } from '../../../domain/Party';
import { PartyDetails } from './PartyDetails';
import styled from 'styled-components';
import { FunctionComponent, ReactElement } from 'react';

const StyledPartyList = styled.ul`
  list-style-type: none;
  
  li {
    margin-bottom: 10px;
  }
`;

interface PartyListProps {
  parties: Party[];
  onUpdateParty: (party: Party) => void;
}
const PartyList: FunctionComponent<PartyListProps> = ({ parties, onUpdateParty }): ReactElement => {
  const handleNewGuestFor = async (party: Party, newGuest: Guest): Promise<void> => {
    const updatedParty = addGuestToParty(party, newGuest);

    onUpdateParty(updatedParty);
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
    <StyledPartyList aria-label='Liste aller Parties'>
      {partyDetails}
    </StyledPartyList>
  );
};

export {
  PartyList
};
