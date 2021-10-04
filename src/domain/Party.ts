import { Guest } from './Guest';
import { Host } from './Host';

interface Party {
  host: Host;
  guests: Guest[];
  description: string;
}

export type {
  Party
};
