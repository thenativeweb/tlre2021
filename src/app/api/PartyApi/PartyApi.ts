import { Party } from '../../../domain/Party';
import { UnstoredParty } from '../../../domain/UnstoredParty';

interface PartyApi {
  fetchAllParties: () => Promise<Party[]>;
  fetchPartyById: (id: number) => Promise<Party>;
  updateParty: (updatedParty: Party) => Promise<Party>;
  addNewParty: (newParty: UnstoredParty) => Promise<Party>;
}

export type {
  PartyApi
};
