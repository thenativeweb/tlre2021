import { Party } from './Party';

type UnstoredParty = Pick<Party, 'description' | 'host'>;

export type {
  UnstoredParty
};
