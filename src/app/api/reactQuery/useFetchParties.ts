import { ApiContext } from '../PartyApi/ApiContext';
import { Party } from '../../../domain/Party';
import { PartyApi } from '../PartyApi/PartyApi';
import { PartyStateKey } from './PartyStateKey';
import { useContext } from 'react';
import { useQuery, UseQueryResult } from 'react-query';

type UseFetchPartiesHook = UseQueryResult<Party[]>;

const useFetchParties = (): UseFetchPartiesHook => {
  const partyApi: PartyApi = useContext(ApiContext);

  const result = useQuery<Party[]>(
    PartyStateKey,
    partyApi.fetchAllParties,
    {
      refetchInterval: 1_000
    }
  );

  return result;
};

export {
  useFetchParties
};
