import { ApiContext } from '../PartyApi/ApiContext';
import { Party } from '../../../domain/Party';
import { PartyApi } from '../PartyApi/PartyApi';
import { PartyStateKey } from './PartyStateKey';
import { updatePartyInList } from '../../partyStateService';
import { useContext } from 'react';
import { useMutation, useQueryClient } from 'react-query';

type UpdateParty = (updatedParty: Party) => void;

const useUpdateParty = (): UpdateParty => {
  const partyApi: PartyApi = useContext(ApiContext);
  const queryClient = useQueryClient();

  const mutation = useMutation(partyApi.updateParty, {
    onSuccess (returnedUpdatedParty: Party): void {
      const previousParties = queryClient.getQueryData<Party[]>(PartyStateKey);

      queryClient.setQueryData(PartyStateKey, updatePartyInList(previousParties!, returnedUpdatedParty));
    },
    onMutate (updatedParty: Party): void {
      const previousParties = queryClient.getQueryData<Party[]>(PartyStateKey);

      queryClient.setQueryData(PartyStateKey, updatePartyInList(previousParties!, updatedParty));
    }
  });

  return mutation.mutate;
};

export {
  useUpdateParty
};
