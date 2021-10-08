import { Party } from '../../../domain/Party';
import { sumOfGuests } from '../../partyStateService';
import { TextContext } from '../../texts/TextContext';
import { FunctionComponent, ReactElement, useContext } from 'react';

interface PartyNumbersProps {
  parties: Party[];
}

const PartyNumbers: FunctionComponent<PartyNumbersProps> = ({ parties }): ReactElement => {
  const texts = useContext(TextContext);

  const htmlText = texts.partyOverview.partyNumbers(parties.length, sumOfGuests(parties));

  return (
    <p dangerouslySetInnerHTML={{ __html: htmlText }} />
  );
};

export {
  PartyNumbers
};
