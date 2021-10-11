import { addGuestToParty } from '../../partyStateService';
import { Guest } from '../../../domain/Guest';
import { Party } from '../../../domain/Party';
import { PartyDetails } from './PartyDetails';
import styled from 'styled-components';
import { TextContext } from '../../texts/TextContext';
import React, { FunctionComponent, ReactElement, useCallback, useContext } from 'react';

const StyledPartyList = styled.ul`
  list-style-type: none;
  
  li {
    margin-bottom: 10px;
  }
`;

const MemoizedDetails = React.memo(
  PartyDetails,
  (prevProps, nextProps): boolean => prevProps.partyData === nextProps.partyData
);

interface PartyListProps {
  parties: Party[];
  onUpdateParty: (party: Party) => void;
}
const PartyList: FunctionComponent<PartyListProps> = ({ parties, onUpdateParty }): ReactElement => {
  const texts = useContext(TextContext);
  const handleNewGuestFor = useCallback((party: Party, newGuest: Guest): void => {
    const updatedParty = addGuestToParty(party, newGuest);

    onUpdateParty(updatedParty);
  }, [ onUpdateParty ]);

  const partyDetails = parties.map((party): ReactElement => (
    <li key={ party.id }>
      <MemoizedDetails
        partyData={ party }
        handleNewGuest={ (newGuest: Guest): void => {
          handleNewGuestFor(party, newGuest);
        } }
      />
    </li>
  ));

  return (
    <StyledPartyList aria-label={ texts.partyList.listLabel }>
      {partyDetails}
    </StyledPartyList>
  );
};

export {
  PartyList
};
