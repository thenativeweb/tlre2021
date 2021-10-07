import { createTestGuest } from '../../domain/createTestGuest';
import { createTestParty } from '../../domain/createTestParty';
import { PartyNumbers } from './PartyNumbers';
import { renderWithTheme } from '../../../test/renderWithTheme';
import { screen } from '@testing-library/react';

describe('<PartyNumbers />', (): void => {
  it('shows the number of the parties.', async (): Promise<void> => {
    renderWithTheme(
      <PartyNumbers parties={ [] } />
    );

    expect(screen.getByText('0 Parties', { exact: false })).toBeInTheDocument();
  });

  it('shows the accumulated number of guests accross all parties.', async (): Promise<void> => {
    const parties = [
      createTestParty({ guests: [ createTestGuest(), createTestGuest() ]}),
      createTestParty({ guests: [ createTestGuest(), createTestGuest() ]})
    ];

    renderWithTheme(
      <PartyNumbers parties={ parties } />
    );

    expect(screen.getByText('4 Gäste', { exact: false })).toBeInTheDocument();
  });
});
