import { addPartyToList } from '../../partyStateService';
import { ApiContext } from '../PartyApi/ApiContext';
import { Party } from '../../../domain/Party';
import { PartyApi } from '../PartyApi/PartyApi';
import { PartyStateKey } from './PartyStateKey';
import { UnstoredParty } from '../../../domain/UnstoredParty';
import { useContext } from 'react';
import { useMutation, UseMutationResult, useQueryClient } from 'react-query';

interface AddPartyContext {
  previousParties: Party[];
}

const useAddParty = (): UseMutationResult<Party, unknown, UnstoredParty, AddPartyContext> => {
  const partyApi: PartyApi = useContext(ApiContext);
  const queryClient = useQueryClient();

  const mutation = useMutation<Party, unknown, UnstoredParty, AddPartyContext>(partyApi.addNewParty, {
    onMutate (addedParty: UnstoredParty): AddPartyContext {
      const previousParties = queryClient.getQueryData<Party[]>(PartyStateKey);

      if (previousParties) {
        const optimisticAddedParty: Party = {
          ...addedParty,
          id: previousParties.length + 1,
          guests: []
        };

        queryClient.setQueryData(PartyStateKey, addPartyToList(previousParties, optimisticAddedParty));

        return { previousParties };
      }

      return { previousParties: []};
    },
    onSettled (): void {
      // eslint-disable-next-line @typescript-eslint/no-floating-promises
      queryClient.invalidateQueries(PartyStateKey);
    },
    onError (error, newParty, context): void {
      if (context?.previousParties) {
        queryClient.setQueryData(PartyStateKey, context.previousParties);
      }
    }
  });

  return mutation;
};

export {
  useAddParty
};
