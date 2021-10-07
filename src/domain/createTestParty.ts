import { createTestGuest } from './createTestGuest';
import { createTestHost } from './createTestHost';
import { Party } from './Party';

const defaultParty: Party = {
  description: 'Party Description',
  guests: [
    createTestGuest()
  ],
  host: createTestHost(),
  id: 1
};

const createTestParty = (overwrites: Partial<Party> = {}): Party => ({
  ...defaultParty,
  ...overwrites
});

export {
  createTestParty
};
