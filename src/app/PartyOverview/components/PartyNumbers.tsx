import { Party } from '../../../domain/Party';
import { sumOfGuests } from '../../partyStateService';
import { FunctionComponent, ReactElement } from 'react';

interface PartyNumbersProps {
  parties: Party[];
}

const PartyNumbers: FunctionComponent<PartyNumbersProps> = ({ parties }): ReactElement => (
  <p>Wir haben <strong>{parties.length} Parties</strong> mit insgesamt <strong>{sumOfGuests(parties)} Gästen</strong> für Dich!</p>
);

export {
  PartyNumbers
};
