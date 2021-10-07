import { createTestGuest } from '../../../domain/createTestGuest';
import { GuestList } from './GuestList';
import { renderWithTheme } from '../../../../test/renderWithTheme';
import { screen } from '@testing-library/react';

describe('<GuestList />', (): void => {
  it('displays a guest with costume.', async (): Promise<void> => {
    renderWithTheme(
      <GuestList
        guests={ [
          createTestGuest({ name: 'Selina', costume: 'Catwoman' }),
          createTestGuest({ name: 'Bruce', costume: 'Batman' })
        ] }
      />
    );

    expect(screen.getByText('Selina kostümiert als Catwoman')).toBeInTheDocument();
    expect(screen.getByText('Bruce kostümiert als Batman')).toBeInTheDocument();
  });

  it('shows special message when no guests given.', async (): Promise<void> => {
    renderWithTheme(
      <GuestList
        guests={ [ ] }
      />
    );

    expect(screen.getByText('Bisher haben sich noch keine Gäste angemeldet', { exact: false })).toBeInTheDocument();
  });

  it('displays if a guest has no costume.', async (): Promise<void> => {
    renderWithTheme(
      <GuestList
        guests={ [
          createTestGuest({ name: 'Kim', costume: undefined })
        ] }
      />
    );

    expect(screen.getByText('Kim kommt unverkleidet')).toBeInTheDocument();
  });
});
