import { Party } from '../../../domain/Party';
import { PartyApi } from './PartyApi';
import { UnstoredParty } from '../../../domain/UnstoredParty';

interface InMemoryApiArgs {
  initialState?: Party[];
  overwrites?: Partial<PartyApi>;
}

const createInMemoryPartyApi = ({
  initialState = [],
  overwrites = {}
}: InMemoryApiArgs): PartyApi => {
  let partyState: Party[] = initialState;

  return {
    async fetchAllParties (): Promise<Party[]> {
      return Promise.resolve(partyState);
    },
    async fetchPartyById (id: number): Promise<Party> {
      const party = partyState.find((searchParty): boolean => searchParty.id === id);

      if (!party) {
        throw new Error(`Party with id ${id} not found.`);
      }

      return Promise.resolve(party);
    },
    async addNewParty (unstoredParty: UnstoredParty): Promise<Party> {
      const promotedParty: Party = {
        ...unstoredParty,
        id: partyState.length + 1,
        guests: []
      };

      partyState = [ ...partyState, promotedParty ];

      return Promise.resolve(promotedParty);
    },
    async updateParty (updatedParty: Party): Promise<Party> {
      partyState = partyState.map((existingParty): Party => {
        if (existingParty.id === updatedParty.id) {
          return updatedParty;
        }

        return existingParty;
      });

      return Promise.resolve(updatedParty);
    },
    ...overwrites
  };
};

export {
  createInMemoryPartyApi
};
