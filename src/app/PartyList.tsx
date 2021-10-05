import { Button } from '../components/base/Button';
import { Guest } from '../domain/Guest';
import { Party } from '../domain/Party';
import { PartyDetails } from './PartyDetails';
import { PartyForm } from '../components/party/PartyForm';
import { PartyOverview } from '../components/party/PartyOverview';
import styled from 'styled-components';
import { UnstoredParty } from '../domain/UnstoredParty';
import { addGuestToParty, addParty, updateParty } from './partyStateService';
import React, { FunctionComponent, ReactElement, useEffect, useState } from 'react';

const StyledPartyList = styled.ul`
  list-style-type: none;
  
  li {
    margin-bottom: 10px;
  }
`;

type ApiState = 'loading' | 'success' | 'error';

const PartyList: FunctionComponent = (): ReactElement => {
  const [ parties, setParties ] = useState<Party[]>([]);
  const [ apiState, setApiState ] = useState<ApiState>('loading');
  const [ showPartyForm, setShowPartyForm ] = useState<boolean>(true);

  useEffect((): void => {
    fetch('http://localhost:3001/parties').
      then(async (res): Promise<Party[]> => {
        if (!res.ok) {
          throw new Error('Error on API Call');
        }

        return res.json();
      }).
      then((loadedParties): void => {
        setParties(loadedParties);
        setApiState('success');
      }).
      catch((ex): void => {
        setApiState('error');
        // eslint-disable-next-line no-console
        console.error('Error while fetching Parties.', ex);
      });
  }, []);

  if (apiState === 'loading') {
    return (<p>Lade Parties...</p>);
  }

  if (apiState === 'error') {
    return (<p>Fehler beim laden der Parties. Bitte versuchen Sie es später ernuet...</p>);
  }

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
