import { Party } from '../domain/Party';
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
}
const PartyList: FunctionComponent<PartyListProps> = ({ parties }): ReactElement => {
  const partyDetails = parties.map((party): ReactElement => (
    <li key={ party.id }>
      <PartyDetails
        partyData={ party }
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
