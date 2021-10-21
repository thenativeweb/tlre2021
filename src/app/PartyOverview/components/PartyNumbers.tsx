import { Party } from '../../../domain/Party';
import { sumOfGuests } from '../../partyStateService';
import { FunctionComponent, ReactElement, useMemo } from 'react';
import { Trans, useTranslation } from 'react-i18next';

interface PartyNumbersProps {
  parties: Party[];
}

const PartyNumbers: FunctionComponent<PartyNumbersProps> = ({ parties }): ReactElement => {
  const { t } = useTranslation();
  const numberOfGuests = useMemo((): number => sumOfGuests(parties), [ parties ]);
  const numberOfParties = parties.length;

  const partyText = t('partyNumbers.party', { count: numberOfParties });
  const guestText = t('partyNumbers.guest', { count: numberOfGuests });

  return (
    <Trans i18nKey='partyNumbers.fullText' values={{ partyText, guestText, context: numberOfParties }}>
      Wir haben <strong>{{ partyText }}</strong> mit insgesamt <strong>{{ guestText }}</strong> für Dich!
    </Trans>

  );
};

export {
  PartyNumbers
};
