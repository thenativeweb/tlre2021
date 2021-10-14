import { AvatarSelect } from './AvatarSelect';
import noop from 'lodash/noop';
import { renderWithProviders } from '../../../../../test/renderWithProviders';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

describe('<AvatarSelect />', (): void => {
  it('display select box by label.', async (): Promise<void> => {
    renderWithProviders(
      <AvatarSelect
        onChange={ noop }
      />
    );

    expect(screen.getByLabelText('Avatar auswählen')).toBeInTheDocument();
  });

  it('selects "Kein Avatar" on default when no value given.', async (): Promise<void> => {
    renderWithProviders(
      <AvatarSelect
        onChange={ noop }
      />
    );

    expect(screen.getByDisplayValue('Kein Avatar')).toBeInTheDocument();
  });

  it('selects the avatar matching the given value.', async (): Promise<void> => {
    renderWithProviders(
      <AvatarSelect
        onChange={ noop }
        value='avatare/avatar1.jpg'
      />
    );

    expect(screen.getByDisplayValue('Avatar 1')).toBeInTheDocument();
  });

  it('fires the onChange Handler with the selected value.', async (): Promise<void> => {
    const onChangeSpy = jest.fn();

    renderWithProviders(
      <AvatarSelect
        onChange={ onChangeSpy }
        value='avatare/avatar1.jpg'
      />
    );

    userEvent.selectOptions(screen.getByLabelText('Avatar auswählen'), 'Avatar 2');

    expect(onChangeSpy).toHaveBeenCalledWith('avatare/avatar2.jpg');
  });
});
