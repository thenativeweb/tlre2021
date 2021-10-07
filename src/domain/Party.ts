import { Guest } from './Guest';
import { Host } from './Host';

interface Party {
  id: number;
  host: Host;
  guests: Guest[];
  description: string;
}

export type {
  Party
};
