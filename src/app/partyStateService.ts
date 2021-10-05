import { Guest } from '../domain/Guest';
import { Party } from '../domain/Party';
import { UnstoredParty } from '../domain/UnstoredParty';

const addGuestToParty = (party: Party, guest: Guest): Party => ({
  ...party,
  guests: [
    ...party.guests,
    guest
  ]
});

const addParty = (parties: Party[], newParty: UnstoredParty): Party[] => [
  ...parties,
  {
    ...newParty,
    id: parties.length,
    guests: []
  }
];

const updateParty = (parties: Party[], updatedParty: Party): Party[] =>
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
  addParty,
  updateParty,
  sumOfGuests
};
