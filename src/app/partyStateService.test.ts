import { createTestGuest } from '../domain/createTestGuest';
import { createTestParty } from '../domain/createTestParty';
import { addGuestToParty, addPartyToList, sumOfGuests, updateParty } from './partyStateService';

describe('partyStateService', (): void => {
  describe('.addGuestToParty()', (): void => {
    it('adds the given guest to the list of guests.', async (): Promise<void> => {
      const party = createTestParty({
        guests: [ createTestGuest() ]
      });
      const newGuest = createTestGuest({ name: 'New Guest' });

      const result = addGuestToParty(party, newGuest);

      expect(result.guests).toHaveLength(2);
      expect(result.guests[1].name).toEqual('New Guest');
    });

    it('does not mutate the original party and guests.', async (): Promise<void> => {
      const originalGuests = [ createTestGuest() ];
      const originalParty = createTestParty({ guests: originalGuests });
      const newGuest = createTestGuest({ name: 'New Guest' });

      const returnedParty = addGuestToParty(originalParty, newGuest);

      expect(returnedParty).not.toBe(originalParty);
      expect(returnedParty.guests).not.toBe(originalGuests);
    });
  });

  describe('.addPartyToList()', (): void => {
    it('adds the given Party to the end of the list.', async (): Promise<void> => {
      const existingParty = createTestParty({ id: 1 });
      const newParty = createTestParty({ id: 2 });

      const resultArray = addPartyToList([ existingParty ], newParty);

      expect(resultArray).toHaveLength(2);
      expect(resultArray[1].id).toEqual(2);
    });

    it('does not mutate the original party array.', async (): Promise<void> => {
      const originalArray = [ createTestParty({ id: 1 }) ];
      const newParty = createTestParty({ id: 2 });

      const resultArray = addPartyToList(originalArray, newParty);

      expect(resultArray).not.toBe(originalArray);
      expect(originalArray).toHaveLength(1);
    });
  });

  describe('.updateParty()', (): void => {
    it('replaces the party with the same id.', async (): Promise<void> => {
      const existingParty1 = createTestParty({ id: 1 });
      const existingParty2 = createTestParty({ id: 2, description: 'Old Description' });
      const updatedParty = createTestParty({ id: 2, description: 'New Description' });

      const resultArray = updateParty([ existingParty1, existingParty2 ], updatedParty);

      expect(resultArray).toEqual([ existingParty1, updatedParty ]);
    });

    it('does not mutate the original array.', async (): Promise<void> => {
      const originalArray = [ createTestParty({ id: 1 }) ];

      const resultArray = updateParty(originalArray, createTestParty({ id: 1 }));

      expect(resultArray).not.toBe(originalArray);
    });
  });

  describe('.sumOfGuests()', (): void => {
    it('returns 0 when no parties given.', async (): Promise<void> => {
      expect(sumOfGuests([])).toEqual(0);
    });

    it('returns 2 for a party with 2 guests.', async (): Promise<void> => {
      const partyWithTwoGuests = createTestParty({
        guests: [ createTestGuest(), createTestGuest() ]
      });

      expect(sumOfGuests([ partyWithTwoGuests ])).toEqual(2);
    });

    it('returns 3 for a party with 2 and another with 1 guest.', async (): Promise<void> => {
      const partyWithTwoGuests = createTestParty({
        guests: [ createTestGuest(), createTestGuest() ]
      });
      const partyWithOneGuest = createTestParty({
        guests: [ createTestGuest() ]
      });

      expect(sumOfGuests([ partyWithTwoGuests, partyWithOneGuest ])).toEqual(3);
    });
  });
});
