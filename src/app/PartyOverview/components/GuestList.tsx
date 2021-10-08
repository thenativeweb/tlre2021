import { Guest } from '../../../domain/Guest';
import { TextContext } from '../../texts/TextContext';
import { FunctionComponent, ReactElement, useContext } from 'react';

interface GuestListProps {
  guests?: Guest[];
}

const GuestList: FunctionComponent<GuestListProps> = ({ guests }): ReactElement => {
  const texts = useContext(TextContext);

  if (!guests || guests.length === 0) {
    return (
      <p>{texts.guestList.noGuests}</p>);
  }

  const guestListItems = guests.map((guest, index): ReactElement => {
    const costumeInfo = guest.costume ?
      texts.guestList.withCostume(guest.costume) :
      texts.guestList.noCostum;

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
