import { ApiContext } from '../api/PartyApi/ApiContext';
import { AvatarData } from '../PartyOverview/components/forms/AvatarData';
import { createInMemoryPartyApi } from '../api/PartyApi/InMemoryPartyApi';
import { createMemoryHistory } from 'history';
import { createTestHost } from '../../domain/createTestHost';
import { createTestParty } from '../../domain/createTestParty';
import { defer } from '../../../test/controllabePromise';
import { Party } from '../../domain/Party';
import { PartyEdit } from './PartyEdit';
import { renderWithProviders } from '../../../test/renderWithProviders';
import userEvent from '@testing-library/user-event';
import { Route, Router, Switch } from 'react-router';
import { screen, waitForElementToBeRemoved } from '@testing-library/react';

describe('PartyEdit', (): void => {
  it('loads the party by the given api and puts it into a form.', async (): Promise<void> => {
    const partyToLoad = createTestParty({
      id: 1,
      description: 'My Description',
      host: createTestHost({
        name: 'Alex',
        avatarUrl: AvatarData.avatar2.url
      })
    });

    renderWithProviders(
      <ApiContext.Provider value={ createInMemoryPartyApi({ initialState: [ partyToLoad ]}) }>
        <PartyEdit partyId={ 1 } />
      </ApiContext.Provider>
    );

    await waitForElementToBeRemoved(screen.getByText('Lade Party...'));

    expect(screen.getByDisplayValue('My Description')).toBeInTheDocument();
    expect(screen.getByDisplayValue('Alex')).toBeInTheDocument();
    expect(screen.getByDisplayValue(AvatarData.avatar2.name)).toBeInTheDocument();
  });

  it('shows a loading indicator while party is loading.', async (): Promise<void> => {
    const deferred = defer<Party>();
    const testApi = createInMemoryPartyApi({
      overwrites: {
        fetchPartyById: async (): Promise<Party> => deferred.promise
      }
    });

    renderWithProviders(
      <ApiContext.Provider value={ testApi }>
        <PartyEdit partyId={ 1 } />
      </ApiContext.Provider>
    );

    const loadingIndicator = screen.getByText('Lade Party...');

    expect(loadingIndicator).toBeInTheDocument();
    deferred.resolve(createTestParty());
    await waitForElementToBeRemoved(loadingIndicator);
    expect(loadingIndicator).not.toBeInTheDocument();
  });

  it('on save, updates the given party and then redirects back to the main page.', async (): Promise<void> => {
    const partyToLoad = createTestParty({
      id: 1,
      description: 'My Description'
    });
    const testApi = createInMemoryPartyApi({ initialState: [ partyToLoad ]});

    const history = createMemoryHistory({
      initialEntries: [ '/edit' ]
    });

    renderWithProviders(
      <Router history={ history }>
        <ApiContext.Provider value={ testApi }>
          <Switch>
            <Route exact={ true } path='/'>
              <p data-testid='redirect-page'>This is rendered once the redirect was loaded.</p>
            </Route>
            <Route path='/edit'>
              <PartyEdit partyId={ 1 } />
            </Route>
          </Switch>
        </ApiContext.Provider>
      </Router>
    );

    const descriptionInput = await screen.findByDisplayValue('My Description');

    userEvent.clear(descriptionInput);
    userEvent.type(descriptionInput, 'New Description');
    userEvent.click(screen.getByText('Party speichern'));

    expect(await screen.findByTestId('redirect-page')).toBeInTheDocument();

    const updatedParty = await testApi.fetchPartyById(1);

    expect(updatedParty.description).toEqual('New Description');
  });
});
