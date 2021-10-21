import { addGuestToParty } from '../../partyStateService';
import { Guest } from '../../../domain/Guest';
import { Party } from '../../../domain/Party';
import { PartyDetails } from './PartyDetails';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import React, { FunctionComponent, ReactElement, useCallback } from 'react';

const StyledPartyList = styled.ul`
  list-style-type: none;
  padding: 0px;
  
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
  const { t } = useTranslation();

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
    <StyledPartyList aria-label={ t('partyList.listLabel') }>
      {partyDetails}
    </StyledPartyList>
  );
};

export {
  PartyList
};
