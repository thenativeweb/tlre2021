import { AddPartyAccordion } from './components/AddPartyAccordion';
import { Party } from '../../domain/Party';
import { PartyApi } from '../api/PartyApi';
import { PartyList } from './components/PartyList';
import { PartyNumbers } from './components/PartyNumbers';
import { TextContext } from '../texts/TextContext';
import { UnstoredParty } from '../../domain/UnstoredParty';
import { addPartyToList, updateParty } from '../partyStateService';
import React, { FunctionComponent, ReactElement, useContext, useEffect, useState } from 'react';

interface PartyListContainerProps {
  partyApi: PartyApi;
}

type ApiState = 'loading' | 'success' | 'error';

const PartyOverview: FunctionComponent<PartyListContainerProps> = ({ partyApi }): ReactElement => {
  const [ parties, setParties ] = useState<Party[]>([]);
  const [ apiState, setApiState ] = useState<ApiState>('loading');
  const texts = useContext(TextContext);

  useEffect((): void => {
    partyApi.fetchAllParties().
      then((loadedParties): void => {
        setParties(loadedParties);
        setApiState('success');
      }).
      catch((ex): void => {
        setApiState('error');
        // eslint-disable-next-line no-console
        console.error('Error while fetching Parties.', ex);
      });
  }, [ partyApi ]);

  const handlePartyUpdate = async (updatedParty: Party): Promise<void> => {
    const storedUpdatedParty = await partyApi.updateParty(updatedParty);

    setParties(updateParty(parties, storedUpdatedParty));
  };

  const handleNewParty = async (newParty: UnstoredParty): Promise<void> => {
    const storedParty = await partyApi.addNewParty(newParty);

    setParties((currentParties): Party[] => addPartyToList(currentParties, storedParty));
  };

  if (apiState === 'loading') {
    return (<p>{texts.partyOverview.loading}</p>);
  }

  if (apiState === 'error') {
    return (<p>{texts.partyOverview.error}</p>);
  }

  return (
    <React.Fragment>
      <PartyNumbers parties={ parties } />
      <AddPartyAccordion onPartySave={ handleNewParty } />
      <PartyList parties={ parties } onUpdateParty={ handlePartyUpdate } />
    </React.Fragment>
  );
};

export {
  PartyOverview

};
