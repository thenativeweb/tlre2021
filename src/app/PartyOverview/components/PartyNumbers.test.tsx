import { createTestGuest } from '../../../domain/createTestGuest';
import { createTestParty } from '../../../domain/createTestParty';
import { PartyNumbers } from './PartyNumbers';
import { renderWithProviders } from '../../../../test/renderWithProviders';
import { screen } from '@testing-library/react';

describe('<PartyNumbers />', (): void => {
  it('when only one party, shows a special text.', async (): Promise<void> => {
    renderWithProviders(
      <PartyNumbers parties={ [ createTestParty() ] } />
    );

    expect(screen.getByText('eine Party', { exact: false })).toBeInTheDocument();
  });

  it('when many parties, shows the number of parties in plural.', async (): Promise<void> => {
    renderWithProviders(
      <PartyNumbers
        parties={ [
          createTestParty(),
          createTestParty()
        ] }
      />
    );

    expect(screen.getByText('2 Partys', { exact: false })).toBeInTheDocument();
  });

  it('shows the accumulated number of guests accross all parties.', async (): Promise<void> => {
    const parties = [
      createTestParty({ guests: [ createTestGuest(), createTestGuest() ]}),
      createTestParty({ guests: [ createTestGuest(), createTestGuest() ]})
    ];

    renderWithProviders(
      <PartyNumbers parties={ parties } />
    );

    expect(screen.getByText('4 Gäste', { exact: false })).toBeInTheDocument();
  });

  it('shows a special message when there is no party at all.', async (): Promise<void> => {
    renderWithProviders(
      <PartyNumbers parties={ [] } />
    );

    expect(screen.getByText('Aktuell sind keine Partys eingetragen.')).toBeInTheDocument();
  });
});
