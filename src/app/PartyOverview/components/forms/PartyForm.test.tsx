import { createTestParty } from '../../../../domain/createTestParty';
import noop from 'lodash/noop';
import { PartyForm } from './PartyForm';
import { renderWithProviders } from '../../../../../test/renderWithProviders';
import { screen } from '@testing-library/react';
import { UnstoredParty } from '../../../../domain/UnstoredParty';
import userEvent from '@testing-library/user-event';

describe('<PartyFormTest />', (): void => {
  it('lets the user input a host name.', async (): Promise<void> => {
    renderWithProviders(<PartyForm onPartySave={ noop } />);

    userEvent.type(screen.getByLabelText('Name des Gastgebers'), 'New Host Name');

    expect(screen.getByDisplayValue('New Host Name')).toBeInTheDocument();
  });

  it('lets the user select an avatar.', async (): Promise<void> => {
    renderWithProviders(<PartyForm onPartySave={ noop } />);

    userEvent.selectOptions(screen.getByLabelText('Avatar auswählen'), 'Avatar 2');

    expect(screen.getByDisplayValue('Avatar 2')).toBeInTheDocument();
  });

  it('lets the user input a party description.', async (): Promise<void> => {
    renderWithProviders(<PartyForm onPartySave={ noop } />);

    userEvent.type(screen.getByLabelText('Partybeschreibung'), 'New Party Description');

    expect(screen.getByDisplayValue('New Party Description')).toBeInTheDocument();
  });

  it('calls the onPartySave Handler with the constructed new party.', async (): Promise<void> => {
    const onPartySaveSpy = jest.fn();

    renderWithProviders(<PartyForm onPartySave={ onPartySaveSpy } />);

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

  it('given an existing party, fills the form with its initial values.', async (): Promise<void> => {
    const existingParty = createTestParty({
      id: 1,
      description: 'Existing Party',
      host: {
        name: 'Existing Host',
        avatarUrl: 'avatare/avatar2.jpg'
      }
    });

    renderWithProviders(<PartyForm party={ existingParty } onPartySave={ noop } />);

    expect(screen.getByDisplayValue('Existing Party')).toBeInTheDocument();
    expect(screen.getByDisplayValue('Existing Host')).toBeInTheDocument();
    expect(screen.getByDisplayValue('Avatar 2')).toBeInTheDocument();
  });

  it('given an existing party, onPartySave returns the full updated party.', async (): Promise<void> => {
    const existingParty = createTestParty({
      id: 1,
      description: 'Existing Party',
      host: {
        name: 'Existing Host',
        avatarUrl: 'avatare/avatar2.jpg'
      }
    });
    const onPartySaveSpy = jest.fn();

    renderWithProviders(<PartyForm party={ existingParty } onPartySave={ onPartySaveSpy } />);

    const descriptionInput = screen.getByLabelText('Partybeschreibung');

    userEvent.clear(descriptionInput);
    userEvent.type(descriptionInput, 'New Description');
    userEvent.click(screen.getByText('Party speichern'));

    expect(onPartySaveSpy).toHaveBeenCalled();

    const expectedParty = {
      ...existingParty,
      description: 'New Description'
    };

    expect(onPartySaveSpy).toHaveBeenCalledWith(expectedParty);
  });
});
