import { addPartyToList } from '../../partyStateService';
import { ApiContext } from '../PartyApi/ApiContext';
import { Party } from '../../../domain/Party';
import { PartyApi } from '../PartyApi/PartyApi';
import { PartyStateKey } from './PartyStateKey';
import { UnstoredParty } from '../../../domain/UnstoredParty';
import { useContext } from 'react';
import { useMutation, useQueryClient } from 'react-query';

type AddParty = (addedParty: UnstoredParty) => void;

const useAddParty = (): AddParty => {
  const partyApi: PartyApi = useContext(ApiContext);
  const queryClient = useQueryClient();

  const mutation = useMutation(partyApi.addNewParty, {
    onMutate (addedParty: UnstoredParty): void {
      const previousParties = queryClient.getQueryData<Party[]>(PartyStateKey);

      if (previousParties) {
        const optimisticAddedParty: Party = {
          ...addedParty,
          id: previousParties.length + 1,
          guests: []
        };

        queryClient.setQueryData(PartyStateKey, addPartyToList(previousParties, optimisticAddedParty));
      }
    },
    onSettled (): void {
      // eslint-disable-next-line @typescript-eslint/no-floating-promises
      queryClient.invalidateQueries(PartyStateKey);
    }
  });

  return mutation.mutate;
};

export {
  useAddParty
};
