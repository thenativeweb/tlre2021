import { ApiContext } from '../PartyApi/ApiContext';
import { Party } from '../../../domain/Party';
import { PartyApi } from '../PartyApi/PartyApi';
import { PartyStateKey } from './PartyStateKey';
import { updatePartyInList } from '../../partyStateService';
import { useContext } from 'react';
import { useMutation, UseMutationResult, useQueryClient } from 'react-query';

interface UpdatePartyContext {
  previousParties: Party[];
}

const useUpdateParty = (): UseMutationResult<Party, unknown, Party, UpdatePartyContext> => {
  const partyApi: PartyApi = useContext(ApiContext);
  const queryClient = useQueryClient();

  const mutation = useMutation<Party, unknown, Party, UpdatePartyContext>(partyApi.updateParty, {
    onSuccess (returnedUpdatedParty: Party): void {
      const previousParties = queryClient.getQueryData<Party[]>(PartyStateKey);

      if (previousParties) {
        queryClient.setQueryData(PartyStateKey, updatePartyInList(previousParties, returnedUpdatedParty));
      }
    },
    onMutate (updatedParty: Party): UpdatePartyContext {
      const previousParties = queryClient.getQueryData<Party[]>(PartyStateKey);

      if (previousParties) {
        queryClient.setQueryData(PartyStateKey, updatePartyInList(previousParties, updatedParty));

        return { previousParties };
      }

      return { previousParties: []};
    },
    onError (error, updatedParty, context): void {
      if (context?.previousParties) {
        queryClient.setQueryData(PartyStateKey, context.previousParties);
      }
    }
  });

  return mutation;
};

export {
  useUpdateParty
};
