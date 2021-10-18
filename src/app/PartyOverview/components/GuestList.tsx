import { Guest } from '../../../domain/Guest';
import { useTranslation } from 'react-i18next';
import { FunctionComponent, ReactElement } from 'react';

interface GuestListProps {
  guests?: Guest[];
}

const GuestList: FunctionComponent<GuestListProps> = ({ guests }): ReactElement => {
  const { t } = useTranslation();

  if (!guests || guests.length === 0) {
    return (
      <p>{ t('guestList.noGuests') }</p>);
  }

  const guestListItems = guests.map((guest, index): ReactElement => {
    const costumeInfo = guest.costume ?
      t('guestList.withCostume', { guest }) :
      t('guestList.noCostume');

    return (
      // eslint-disable-next-line react/no-array-index-key
      <li key={ index }>
        {guest.name} {costumeInfo}
      </li>
    );
  });

  return (
    <ul>
      { guestListItems }
    </ul>
  );
};

export {
  GuestList
};
