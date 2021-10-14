import { ApiContext } from '../PartyApi/ApiContext';
import { Party } from '../../../domain/Party';
import { PartyApi } from '../PartyApi/PartyApi';
import { UnstoredParty } from '../../../domain/UnstoredParty';
import { addPartyToList, updatePartyInList } from '../../partyStateService';
import { useContext, useEffect, useState } from 'react';

type ApiStatus = 'loading' | 'success' | 'error';

interface PartyApiHook {
  status: ApiStatus;
  error?: Error;
  parties: Party[];
  addParty: (newParty: UnstoredParty) => void;
  updateParty: (updatedParty: Party) => void;
}

const usePartyApi = (): PartyApiHook => {
  const partyApi: PartyApi = useContext(ApiContext);
  const [ parties, setParties ] = useState<Party[]>([]);
  const [ status, setStatus ] = useState<ApiStatus>('loading');
  const [ error, setError ] = useState<undefined | Error>();

  const handleApiError = (ex: Error): void => {
    setStatus('error');
    setError(ex);
  };

  useEffect((): void => {
    partyApi.fetchAllParties().
      then((loadedParties): void => {
        setParties(loadedParties);
        setStatus('success');
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
    status,
    error,
    addParty,
    updateParty
  };
};

export {
  usePartyApi
};

export type {
  ApiStatus,
  PartyApiHook
};
