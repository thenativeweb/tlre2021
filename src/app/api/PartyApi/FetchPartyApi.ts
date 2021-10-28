import { Party } from '../../../domain/Party';
import { PartyApi } from './PartyApi';
import { UnstoredParty } from '../../../domain/UnstoredParty';

const parseJsonResponse = async (res: Response): Promise<any> => {
  if (!res.ok) {
    throw new Error(`HTTPError, received Status ${res.status}`);
  }

  return res.json();
};

const createFetchPartyApi = (apiHost: string): PartyApi => {
  const partiesEndpoint = `${apiHost}/parties`;

  return {
    async addNewParty (newParty: UnstoredParty): Promise<Party> {
      return fetch(partiesEndpoint, {
        method: 'POST',
        body: JSON.stringify(newParty),
        headers: {
          'Content-Type': 'application/json'
        }
      }).then(parseJsonResponse);
    },
    async fetchAllParties (): Promise<Party[]> {
      return fetch(partiesEndpoint).then(parseJsonResponse);
    },
    async fetchPartyById (id: number): Promise<Party> {
      return fetch(`${partiesEndpoint}/${id}`).then(parseJsonResponse);
    },
    async updateParty (updatedParty: Party): Promise<Party> {
      return fetch(`${partiesEndpoint}/${updatedParty.id}`, {
        method: 'PUT',
        body: JSON.stringify(updatedParty),
        headers: {
          'Content-Type': 'application/json'
        }
      }).then(parseJsonResponse);
    }
  };
};

export {
  createFetchPartyApi
};
