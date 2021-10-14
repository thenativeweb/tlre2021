import { ApiContext } from '../PartyApi/ApiContext';
import { Party } from '../../../domain/Party';
import { PartyApi } from '../PartyApi/PartyApi';
import { PartyStateKey } from './PartyStateKey';
import { useContext } from 'react';
import { useQuery, UseQueryResult } from 'react-query';

type UseFetchPartyByIdHook = UseQueryResult<Party>;

const useFetchPartyById = (id: Party['id']): UseFetchPartyByIdHook => {
  const partyApi: PartyApi = useContext(ApiContext);

  const result = useQuery<Party>(
    [ PartyStateKey, id ],
    async (): Promise<Party> => partyApi.fetchPartyById(id)
  );

  return result;
};

export {
  useFetchPartyById
};
