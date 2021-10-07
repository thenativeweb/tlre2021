import noop from 'lodash/noop';
import { PartyForm } from './PartyForm';
import { renderWithTheme } from '../../../test/renderWithTheme';
import { screen } from '@testing-library/react';
import { UnstoredParty } from '../../domain/UnstoredParty';
import userEvent from '@testing-library/user-event';

describe('<PartyFormTest />', (): void => {
  it('lets the user input a host name.', async (): Promise<void> => {
    renderWithTheme(<PartyForm onPartySave={ noop } />);

    userEvent.type(screen.getByLabelText('Name des Gastgebers'), 'New Host Name');

    expect(screen.getByDisplayValue('New Host Name')).toBeInTheDocument();
  });

  it('lets the user select an avatar.', async (): Promise<void> => {
    renderWithTheme(<PartyForm onPartySave={ noop } />);

    userEvent.selectOptions(screen.getByLabelText('Avatar auswählen'), 'Avatar 2');

    expect(screen.getByDisplayValue('Avatar 2')).toBeInTheDocument();
  });

  it('lest the user input a party description.', async (): Promise<void> => {
    renderWithTheme(<PartyForm onPartySave={ noop } />);

    userEvent.type(screen.getByLabelText('Partybeschreibung'), 'New Party Description');

    expect(screen.getByDisplayValue('New Party Description')).toBeInTheDocument();
  });

  it('calls the onPartySave Handler with the constructed new party.', async (): Promise<void> => {
    const onPartySaveSpy = jest.fn();

    renderWithTheme(<PartyForm onPartySave={ onPartySaveSpy } />);

    userEvent.type(screen.getByLabelText('Name des Gastgebers'), 'New Host Name');
    userEvent.selectOptions(screen.getByLabelText('Avatar auswählen'), 'Avatar 2');
    userEvent.type(screen.getByLabelText('Partybeschreibung'), 'New Party Description');
    userEvent.click(screen.getByText('Party speichern'));

    const exptectedParty: UnstoredParty = {
      host: {
        name: 'New Host Name',
        avatarUrl: 'avatare/avatar2.jpg'
      },
      description: 'New Party Description'
    };

    expect(onPartySaveSpy).toHaveBeenCalledWith(exptectedParty);
  });
});
