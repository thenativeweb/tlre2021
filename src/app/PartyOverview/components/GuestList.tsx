import { Guest } from '../../../domain/Guest';
import { FunctionComponent, ReactElement } from 'react';

interface GuestListProps {
  guests?: Guest[];
}

const GuestList: FunctionComponent<GuestListProps> = ({ guests }): ReactElement => {
  if (!guests || guests.length === 0) {
    return (
      <p>Bisher haben sich noch keine Gäste angemeldet :(</p>);
  }

  const guestListItems = guests.map((guest, index): ReactElement => {
    const costumeInfo = guest.costume ?
      `kostümiert als ${guest.costume}` :
      'kommt unverkleidet';

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
