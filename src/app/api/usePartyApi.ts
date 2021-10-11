import { ApiContext } from './ApiContext';
import { Party } from '../../domain/Party';
import { PartyApi } from './PartyApi';
import { UnstoredParty } from '../../domain/UnstoredParty';
import { addPartyToList, updatePartyInList } from '../partyStateService';
import { useContext, useEffect, useState } from 'react';

type ApiState = 'loading' | 'success' | 'error';

interface PartyApiHook {
  apiState: ApiState;
  error?: Error;
  parties: Party[];
  addParty: (newParty: UnstoredParty) => void;
  updateParty: (updatedParty: Party) => void;
}

const usePartyApi = (): PartyApiHook => {
  const partyApi: PartyApi = useContext(ApiContext);
  const [ parties, setParties ] = useState<Party[]>([]);
  const [ apiState, setApiState ] = useState<ApiState>('loading');
  const [ error, setError ] = useState<undefined | Error>();

  const handleApiError = (ex: Error): void => {
    setApiState('error');
    setError(ex);
  };

  useEffect((): void => {
    partyApi.fetchAllParties().
      then((loadedParties): void => {
        setParties(loadedParties);
        setApiState('success');
      }).
      catch(handleApiError);
  }, [ partyApi ]);

  const addParty = async (newParty: UnstoredParty): Promise<void> => {
    partyApi.addNewParty(newParty).
      then((storedParty): void => {
        setParties((currentParties): Party[] => addPartyToList(currentParties, storedParty));
      }).catch(handleApiError);
  };

  const updateParty = async (updatedParty: Party): Promise<void> => {
    partyApi.updateParty(updatedParty).
      then((storedUpdatedParty): void => {
        setParties(updatePartyInList(parties, storedUpdatedParty));
      }).catch(handleApiError);
  };

  return {
    parties,
    apiState,
    error,
    addParty,
    updateParty
  };
};

export {
  usePartyApi
};

export type {
  ApiState,
  PartyApiHook
};
