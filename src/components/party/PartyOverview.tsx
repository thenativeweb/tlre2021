import { Party } from '../../domain/Party';
import { sumOfGuests } from '../../app/partyStateService';
import { FunctionComponent, ReactElement } from 'react';

interface PartyOverviewProps {
  parties: Party[];
}

const PartyOverview: FunctionComponent<PartyOverviewProps> = ({ parties }): ReactElement => (
  <p>Wir haben <strong>{parties.length} Parties</strong> mit insgesamt <strong>{sumOfGuests(parties)} Gästen</strong> für Dich!</p>
);

export {
  PartyOverview
};
