import { Guest } from '../domain/Guest';
import { Party } from '../domain/Party';

const addGuestToParty = (party: Party, guest: Guest): Party => ({
  ...party,
  guests: [
    ...party.guests,
    guest
  ]
});

const addPartyToList = (parties: Party[], newParty: Party): Party[] => [
  ...parties,
  newParty
];

const updatePartyInList = (parties: Party[], updatedParty: Party): Party[] =>
  parties.map((party): Party => {
    if (party.id === updatedParty.id) {
      return updatedParty;
    }

    return party;
  });

const sumOfGuests = (parties: Party[]): number =>
  parties.reduce((guestCount, party): number => guestCount + party.guests.length, 0);

export {
  addGuestToParty,
  addPartyToList,
  updatePartyInList,
  sumOfGuests
};
