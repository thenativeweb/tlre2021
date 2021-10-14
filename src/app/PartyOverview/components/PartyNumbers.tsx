import { Party } from '../../../domain/Party';
import { sumOfGuests } from '../../partyStateService';
import { useText } from '../../texts/useText';
import { FunctionComponent, ReactElement, useMemo } from 'react';

interface PartyNumbersProps {
  parties: Party[];
}

const PartyNumbers: FunctionComponent<PartyNumbersProps> = ({ parties }): ReactElement => {
  const { texts } = useText();

  const numberOfGuests = useMemo((): number => sumOfGuests(parties), [ parties ]);

  const htmlText = texts.partyOverview.partyNumbers(parties.length, numberOfGuests);

  return (
    <p dangerouslySetInnerHTML={{ __html: htmlText }} />
  );
};

export {
  PartyNumbers
};
