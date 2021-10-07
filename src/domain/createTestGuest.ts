import { Guest } from './Guest';

const defaultGuest: Guest = {
  name: 'Guest Name',
  costume: 'Guest Costume'
};

const createTestGuest = (overwrites: Partial<Guest> = {}): Guest => ({
  ...defaultGuest,
  ...overwrites
});

export {
  createTestGuest
};
