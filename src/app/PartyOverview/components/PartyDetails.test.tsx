import { createTestGuest } from '../../../domain/createTestGuest';
import { createTestHost } from '../../../domain/createTestHost';
import { createTestParty } from '../../../domain/createTestParty';
import { Guest } from '../../../domain/Guest';
import noop from 'lodash/noop';
import { PartyDetails } from './PartyDetails';
import { renderWithProviders } from '../../../../test/renderWithProviders';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Route, Switch } from 'react-router-dom';

describe('<PartyDetails />', (): void => {
  it('shows a headline with the Hosts name.', async (): Promise<void> => {
    const testHost = createTestHost({
      name: 'Selina'
    });

    renderWithProviders(
      <PartyDetails
        partyData={ createTestParty({
          host: testHost
        }) }
        handleNewGuest={ noop }
      />
    );

    expect(screen.getByText('Selinas Halloween-Party')).toBeInTheDocument();
  });

  it('shows the hosts name and avatar with alt text.', async (): Promise<void> => {
    const testHost = createTestHost({
      name: 'Selina',
      avatarUrl: 'path/to/avatar'
    });

    renderWithProviders(
      <PartyDetails
        partyData={ createTestParty({
          host: testHost
        }) }
        handleNewGuest={ noop }
      />
    );

    expect(screen.getByText('Selina')).toBeInTheDocument();
    expect(screen.getByAltText('Avatar von Selina')).toBeInTheDocument();
  });

  it('shows the party description.', async (): Promise<void> => {
    renderWithProviders(
      <PartyDetails
        partyData={ createTestParty({
          description: 'Test Party Description'
        }) }
        handleNewGuest={ noop }
      />
    );

    expect(screen.getByText('Test Party Description')).toBeInTheDocument();
  });

  it('shows the guests.', async (): Promise<void> => {
    const guests = [
      createTestGuest({ name: 'Selina', costume: 'Catwoman' })
    ];

    renderWithProviders(
      <PartyDetails
        partyData={ createTestParty({
          guests
        }) }
        handleNewGuest={ noop }
      />
    );

    expect(screen.getByText('Selina kostümiert als Catwoman')).toBeInTheDocument();
  });

  it('when adding a new guest in the AddGuestForm, passes the guest data.', async (): Promise<void> => {
    const handleNewGuestSpy = jest.fn();

    renderWithProviders(
      <PartyDetails
        partyData={ createTestParty() }
        handleNewGuest={ handleNewGuestSpy }
      />
    );

    userEvent.type(screen.getByLabelText('Name'), 'New Guest');
    userEvent.type(screen.getByLabelText('Kostüm'), 'Costume');
    userEvent.click(screen.getByText('Speichern'));

    const expectedGuest: Guest = {
      name: 'New Guest',
      costume: 'Costume'
    };

    expect(handleNewGuestSpy).toHaveBeenCalledWith(expectedGuest);
  });

  it('navigates to the edit page of the party when the edit-link is clicked.', async (): Promise<void> => {
    const testParty = createTestParty({ id: 1 });

    renderWithProviders(
      <Switch>
        <Route exact={ true } path='/'>
          <PartyDetails partyData={ testParty } handleNewGuest={ noop } />
        </Route>
        <Route path='/edit/1'>
          <p data-testid='editpage' />
        </Route>
      </Switch>
    );

    userEvent.click(screen.getByText('Party bearbeiten'));

    expect(await screen.findByTestId('editpage')).toBeInTheDocument();
  });
});
