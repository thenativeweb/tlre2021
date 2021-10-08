import { createTestHost } from '../../../domain/createTestHost';
import { createTestParty } from '../../../domain/createTestParty';
import noop from 'lodash/noop';
import { Party } from '../../../domain/Party';
import { PartyList } from './PartyList';
import { renderWithProviders } from '../../../../test/renderWithProviders';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

describe('<PartyList />', (): void => {
  it('shows the party details for the given parties.', async (): Promise<void> => {
    renderWithProviders(
      <PartyList
        onUpdateParty={ noop }
        parties={ [
          createTestParty({ id: 1, host: createTestHost({ name: 'Selina' }) }),
          createTestParty({ id: 2, host: createTestHost({ name: 'Bruce' }) })
        ] }
      />
    );

    expect(screen.getByLabelText('Liste aller Parties').children).toHaveLength(2);
    expect(screen.getByText('Selinas Halloween-Party')).toBeInTheDocument();
    expect(screen.getByText('Bruces Halloween-Party')).toBeInTheDocument();
  });

  it('provides updated Party to onUpdateParty-handler when new guest is added.', async (): Promise<void> => {
    const onUpdatePartySpy = jest.fn();
    const testParty = createTestParty({
      guests: []
    });

    renderWithProviders(
      <PartyList
        onUpdateParty={ onUpdatePartySpy }
        parties={ [
          testParty
        ] }
      />
    );

    userEvent.type(screen.getByLabelText('Name'), 'New Guest Name');
    userEvent.click(screen.getByText('Speichern'));

    const expctedParty: Party = {
      ...testParty,
      guests: [{ name: 'New Guest Name', costume: '' }]
    };

    expect(onUpdatePartySpy).toHaveBeenCalledWith(expctedParty);
  });
});
