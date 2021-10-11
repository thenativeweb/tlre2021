import { ApiContext } from '../api/custom/ApiContext';
import { createTestHost } from '../../domain/createTestHost';
import { createTestParty } from '../../domain/createTestParty';
import { createTestPartyApi } from '../api/custom/TestPartyApi';
import { defer } from '../../../test/controllabePromise';
import { Guest } from '../../domain/Guest';
import noop from 'lodash/noop';
import { Party } from '../../domain/Party';
import { PartyApi } from '../api/custom/PartyApi';
import { PartyOverview } from './PartyOverview';
import { renderWithProviders } from '../../../test/renderWithProviders';
import { UnstoredParty } from '../../domain/UnstoredParty';
import userEvent from '@testing-library/user-event';
import { screen, waitForElementToBeRemoved } from '@testing-library/react';

describe('PartyOverview', (): void => {
  const renderWithApi = (testApi: PartyApi): void =>
    renderWithProviders(
      <ApiContext.Provider value={ testApi }>
        <PartyOverview />
      </ApiContext.Provider>
    );

  // We only test the state-toggle here. All other functions are tested in the PartyOverviewContainer
  it('shows loading screen until fetchAllParties returns.', async (): Promise<void> => {
    const deferred = defer<Party[]>();
    const testApi = createTestPartyApi({
      fetchAllParties: async (): Promise<Party[]> => deferred.promise
    });

    renderWithApi(testApi);
    expect(screen.getByText('Lade Parties...')).toBeInTheDocument();

    deferred.resolve([]);

    expect(await screen.findByText('Lade Parties...')).not.toBeInTheDocument();
  });

  it('shows the parties returned from fetchAllParties.', async (): Promise<void> => {
    const testApi = createTestPartyApi({
      fetchAllParties: async (): Promise<Party[]> => Promise.resolve([
        createTestParty({ id: 1, host: createTestHost({ name: 'Selina' }) }),
        createTestParty({ id: 2, host: createTestHost({ name: 'Bruce' }) })
      ])
    });

    renderWithApi(testApi);

    expect(await screen.findByText('Selinas Halloween-Party')).toBeInTheDocument();
    expect(await screen.findByText('Bruces Halloween-Party')).toBeInTheDocument();
  });

  it('shows an error if fetchAllParties fails.', async (): Promise<void> => {
    // Avoid console output in tests
    jest.spyOn(console, 'error').mockImplementation(noop);
    const testApi = createTestPartyApi({
      async fetchAllParties (): Promise<Party[]> {
        throw new Error('Error while fetching...');
      }
    });

    renderWithApi(testApi);

    expect(await screen.findByText('Fehler beim laden der Parties. Bitte versuchen Sie es später ernuet...')).toBeInTheDocument();
    jest.restoreAllMocks();
  });

  it('shows the addPartyForm after click of the toggle button.', async (): Promise<void> => {
    renderWithApi(createTestPartyApi());

    const addPartyButton = await screen.findByText('Neue Party hinzufügen');

    expect(screen.queryByLabelText('Name des Gastgebers')).not.toBeInTheDocument();

    userEvent.click(addPartyButton);

    expect(await screen.findByLabelText('Name des Gastgebers')).toBeInTheDocument();
  });

  it('submits the party saved with the party form and shows it once the api returns.', async (): Promise<void> => {
    const inputParty: UnstoredParty = {
      description: 'New Party Description',
      host: createTestHost({
        name: 'Kim',
        avatarUrl: undefined
      })
    };

    const testApi = createTestPartyApi({
      addNewParty: jest.fn().mockResolvedValue(createTestParty({
        id: 2,
        ...inputParty
      }))
    });

    renderWithApi(testApi);

    // Wait till parties were fetched
    await waitForElementToBeRemoved(screen.getByText('Lade Parties...'));
    userEvent.click(screen.getByText('Neue Party hinzufügen'));
    userEvent.type(screen.getByLabelText('Name des Gastgebers'), inputParty.host.name);
    userEvent.type(screen.getByLabelText('Partybeschreibung'), inputParty.description);

    userEvent.click(screen.getByText('Party speichern'));
    expect(await screen.findByText('Kims Halloween-Party')).toBeInTheDocument();
    expect(testApi.addNewParty).toHaveBeenCalledWith(inputParty);
  });

  it('when adding a new guest, submits the updated party and shows the guest after.', async (): Promise<void> => {
    const existingParty = createTestParty({ id: 1, guests: []});
    const inputGuest: Guest = {
      name: 'New Guest',
      costume: 'New Guest Costume'
    };

    const spiedUpdateParty = jest.fn().mockImplementation(async (updatedParty: Party): Promise<Party> => Promise.resolve(updatedParty));

    const testApi = createTestPartyApi({
      fetchAllParties: async (): Promise<Party[]> => Promise.resolve([ existingParty ]),
      updateParty: spiedUpdateParty
    });

    renderWithApi(testApi);

    // Wait till parties were fetched
    await waitForElementToBeRemoved(screen.getByText('Lade Parties...'));

    userEvent.type(screen.getByLabelText('Name'), inputGuest.name);
    userEvent.type(screen.getByLabelText('Kostüm'), inputGuest.costume!);
    userEvent.click(screen.getByText('Speichern'));

    expect(await screen.findByText('New Guest kostümiert als New Guest Costume')).toBeInTheDocument();
    const expectedParty: Party = {
      ...existingParty,
      guests: [ inputGuest ]
    };

    expect(spiedUpdateParty).toHaveBeenCalledWith(expectedParty);
  });
});
