import { ApiContext } from '../api/PartyApi/ApiContext';
import { createInMemoryPartyApi } from '../api/PartyApi/InMemoryPartyApi';
import { createTestHost } from '../../domain/createTestHost';
import { createTestParty } from '../../domain/createTestParty';
import { defer } from '../../../test/controllabePromise';
import { Guest } from '../../domain/Guest';
import noop from 'lodash/noop';
import { Party } from '../../domain/Party';
import { PartyApi } from '../api/PartyApi/PartyApi';
import { PartyOverview } from './PartyOverview';
import { renderWithProviders } from '../../../test/renderWithProviders';
import { UnstoredParty } from '../../domain/UnstoredParty';
import userEvent from '@testing-library/user-event';
import { QueryClient, QueryClientProvider } from 'react-query';
import { RenderResult, screen, waitForElementToBeRemoved } from '@testing-library/react';

describe('PartyOverview', (): void => {
  const renderWithApi = (testApi: PartyApi): RenderResult => {
    const queryClient = new QueryClient({
      defaultOptions: {
        queries: {
          retry: 0
        }
      }
    });

    return renderWithProviders(
      <ApiContext.Provider value={ testApi }>
        <QueryClientProvider client={ queryClient }>
          <PartyOverview />
        </QueryClientProvider>
      </ApiContext.Provider>
    );
  };

  beforeEach(async (): Promise<void> => {
    // Avoid console output in tests
    jest.spyOn(console, 'error').mockImplementation(noop);
  });

  afterEach(async (): Promise<void> => {
    jest.restoreAllMocks();
  });

  // We only test the state-toggle here. All other functions are tested in the PartyOverviewContainer
  it('shows loading screen until fetchAllParties returns.', async (): Promise<void> => {
    const deferred = defer<Party[]>();
    const testApi = createInMemoryPartyApi({
      overwrites: {
        fetchAllParties: async (): Promise<Party[]> => deferred.promise
      }
    });

    renderWithApi(testApi);
    expect(screen.getByText('Lade Parties...')).toBeInTheDocument();

    deferred.resolve([]);

    expect(await screen.findByText('Lade Parties...')).not.toBeInTheDocument();
  });

  it('shows the parties returned from fetchAllParties.', async (): Promise<void> => {
    const testApi = createInMemoryPartyApi({
      initialState: [
        createTestParty({ id: 1, host: createTestHost({ name: 'Selina' }) }),
        createTestParty({ id: 2, host: createTestHost({ name: 'Bruce' }) })
      ]
    });

    renderWithApi(testApi);

    expect(await screen.findByText('Selinas Halloween-Party')).toBeInTheDocument();
    expect(await screen.findByText('Bruces Halloween-Party')).toBeInTheDocument();
  });

  it('shows an error if fetchAllParties fails.', async (): Promise<void> => {
    const testApi = createInMemoryPartyApi({
      overwrites: {
        async fetchAllParties (): Promise<Party[]> {
          throw new Error('Error while fetching...');
        }
      }
    });

    renderWithApi(testApi);

    expect(await screen.findByText('Fehler beim laden der Parties. Bitte versuchen Sie es sp??ter ernuet...')).toBeInTheDocument();
  });

  it('shows the addPartyForm after click of the toggle button.', async (): Promise<void> => {
    renderWithApi(createInMemoryPartyApi({}));

    const addPartyButton = await screen.findByText('Neue Party hinzuf??gen');

    expect(screen.queryByLabelText('Name des Gastgebers')).not.toBeInTheDocument();

    userEvent.click(addPartyButton);

    expect(await screen.findByLabelText('Name des Gastgebers')).toBeInTheDocument();
  });

  it('submits the party saved with the party form and shows it once the api returns.', async (): Promise<void> => {
    const inputParty: UnstoredParty = {
      description: 'New Party Description',
      host: createTestHost({
        name: 'Alex',
        avatarUrl: undefined
      })
    };

    const testApi = createInMemoryPartyApi({});

    renderWithApi(testApi);

    // Wait till parties were fetched
    await waitForElementToBeRemoved(screen.getByText('Lade Parties...'));
    userEvent.click(screen.getByText('Neue Party hinzuf??gen'));
    userEvent.type(screen.getByLabelText('Name des Gastgebers'), inputParty.host.name);
    userEvent.type(screen.getByLabelText('Partybeschreibung'), inputParty.description);

    userEvent.click(screen.getByText('Party speichern'));
    expect(await screen.findByText('Alexs Halloween-Party')).toBeInTheDocument();
  });

  it('when saving a new party and the api errors, shows an error message..', async (): Promise<void> => {
    const inputParty: UnstoredParty = {
      description: 'New Party Description',
      host: createTestHost({ name: 'Alex' })
    };

    const testApi = createInMemoryPartyApi({
      overwrites: { async addNewParty (): Promise<Party> {
        throw new Error('TestError');
      } }
    });

    renderWithApi(testApi);

    // Wait till parties were fetched
    await waitForElementToBeRemoved(screen.getByText('Lade Parties...'));
    userEvent.click(screen.getByText('Neue Party hinzuf??gen'));
    userEvent.type(screen.getByLabelText('Name des Gastgebers'), inputParty.host.name);
    userEvent.type(screen.getByLabelText('Partybeschreibung'), inputParty.description);

    userEvent.click(screen.getByText('Party speichern'));
    expect(await screen.findByText('Fehler beim Speichern der Party.', { exact: false })).toBeInTheDocument();
    expect(screen.queryByText('Alexs Halloween-Party')).not.toBeInTheDocument();
  });

  it('when adding a new guest, submits the updated party and shows the guest after.', async (): Promise<void> => {
    const existingParty = createTestParty({ id: 1, guests: []});
    const inputGuest: Guest = {
      name: 'New Guest',
      costume: 'New Guest Costume'
    };

    const testApi = createInMemoryPartyApi({ initialState: [ existingParty ]});

    renderWithApi(testApi);

    // Wait till parties were fetched
    await waitForElementToBeRemoved(screen.getByText('Lade Parties...'));

    userEvent.type(screen.getByLabelText('Name'), inputGuest.name);
    userEvent.type(screen.getByLabelText('Kost??m'), inputGuest.costume!);
    userEvent.click(screen.getByText('Speichern'));

    expect(await screen.findByText('New Guest kost??miert als New Guest Costume')).toBeInTheDocument();
  });

  it('on adding a new guest, when the API errors, show an error and reverts the party state.', async (): Promise<void> => {
    const existingParty = createTestParty({ id: 1, guests: []});
    const inputGuest: Guest = {
      name: 'New Guest'
    };

    const testApi = createInMemoryPartyApi(
      {
        initialState: [ existingParty ],
        overwrites: {
          async updateParty (): Promise<Party> {
            throw new Error('API Error');
          }
        }
      }
    );

    renderWithApi(testApi);

    // Wait till parties were fetched
    await waitForElementToBeRemoved(screen.getByText('Lade Parties...'));

    userEvent.type(screen.getByLabelText('Name'), inputGuest.name);
    userEvent.type(screen.getByLabelText('Kost??m'), inputGuest.costume!);
    userEvent.click(screen.getByText('Speichern'));

    expect(await screen.findByText('Fehler beim Hinzuf??gen des Gastes.', { exact: false })).toBeInTheDocument();
    expect(screen.queryByText('New Guest')).not.toBeInTheDocument();
  });
});
