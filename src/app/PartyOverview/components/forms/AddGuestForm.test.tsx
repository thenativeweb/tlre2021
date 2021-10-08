import { AddGuestForm } from './AddGuestForm';
import { Guest } from '../../../../domain/Guest';
import noop from 'lodash/noop';
import { renderWithProviders } from '../../../../../test/renderWithProviders';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

describe('<AddGuestForm />', (): void => {
  it('lets the user input a name.', async (): Promise<void> => {
    renderWithProviders(<AddGuestForm onSave={ noop } />);

    userEvent.type(screen.getByLabelText('Name'), 'New Guest Name');

    expect(screen.getByDisplayValue('New Guest Name')).toBeInTheDocument();
  });

  it('lets the user input a costum.', async (): Promise<void> => {
    renderWithProviders(<AddGuestForm onSave={ noop } />);

    userEvent.type(screen.getByLabelText('Kostüm'), 'New Costume Name');

    expect(screen.getByDisplayValue('New Costume Name')).toBeInTheDocument();
  });

  it('passes the guests data on submit.', async (): Promise<void> => {
    const onSaveSpy = jest.fn();

    renderWithProviders(<AddGuestForm onSave={ onSaveSpy } />);

    userEvent.type(screen.getByLabelText('Name'), 'New Guest Name');
    userEvent.type(screen.getByLabelText('Kostüm'), 'New Costume Name');
    userEvent.click(screen.getByText('Speichern'));

    const expectedGuest: Guest = {
      name: 'New Guest Name',
      costume: 'New Costume Name'
    };

    expect(onSaveSpy).toHaveBeenCalledWith(expectedGuest);
  });
});
