import { Party } from '../domain/Party';
import { PartyApi } from './PartyApi';
import { PartyList } from './PartyList';
import { UnstoredParty } from '../domain/UnstoredParty';
import { addPartyToList, updateParty } from './partyStateService';
import { FunctionComponent, ReactElement, useEffect, useState } from 'react';

interface PartyListContainerProps {
  partyApi: PartyApi;
}

type ApiState = 'loading' | 'success' | 'error';

const PartyListContainer: FunctionComponent<PartyListContainerProps> = ({ partyApi }): ReactElement => {
  const [ parties, setParties ] = useState<Party[]>([]);
  const [ apiState, setApiState ] = useState<ApiState>('loading');

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
  }, []);

  const handlePartyUpdate = async (updatedParty: Party): Promise<void> => {
    const storedUpdatedParty = await partyApi.updateParty(updatedParty);

    setParties(updateParty(parties, storedUpdatedParty));
  };

  const handleNewParty = async (newParty: UnstoredParty): Promise<void> => {
    const storedParty = await partyApi.addNewParty(newParty);

    setParties((currentParties): Party[] => addPartyToList(currentParties, storedParty));
  };

  if (apiState === 'loading') {
    return (<p>Lade Parties...</p>);
  }

  if (apiState === 'error') {
    return (<p>Fehler beim laden der Parties. Bitte versuchen Sie es später ernuet...</p>);
  }

  return (
    <PartyList
      parties={ parties }
      onAddParty={ handleNewParty }
      onUpdateParty={ handlePartyUpdate }
    />
  );
};

export {
  PartyListContainer

};
