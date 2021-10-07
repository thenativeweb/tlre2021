import { createTestParty } from '../domain/createTestParty';
import { Party } from '../domain/Party';
import { PartyApi } from './PartyApi';
import { UnstoredParty } from '../domain/UnstoredParty';

const defaultTestPartyApi: PartyApi = {
  addNewParty: async (newParty: UnstoredParty): Promise<Party> => Promise.resolve(createTestParty(newParty)),
  fetchAllParties: async (): Promise<Party[]> => Promise.resolve([ createTestParty() ]),
  updateParty: async (updatedParty: Party): Promise<Party> => Promise.resolve(updatedParty)
};

const createTestPartyApi = (overwrites: Partial<PartyApi> = {}): PartyApi => ({
  ...defaultTestPartyApi,
  ...overwrites
});

export {
  createTestPartyApi
};
