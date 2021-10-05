import { Button } from '../base/Button';
import { Guest } from '../../domain/Guest';
import { TextInput } from '../base/TextInput';
import { ChangeEventHandler, FormEventHandler, FunctionComponent, ReactElement, useState } from 'react';

const createEmptyGuest = (): Guest => ({
  name: '',
  costume: ''
});

interface AddGuestFormProps {
  onSave: (newGuest: Guest) => void;
}

const AddGuestForm: FunctionComponent<AddGuestFormProps> = ({ onSave }): ReactElement => {
  const [ newGuest, setNewGuest ] = useState<Guest>(createEmptyGuest());

  const createEventHandlerFor =
  (property: keyof Guest): ChangeEventHandler<HTMLInputElement> =>
    (event): void => {
      setNewGuest({
        ...newGuest,
        [property]: event.target.value
      });
    };

  const handleSave: FormEventHandler<HTMLFormElement> = (event): void => {
    event.preventDefault();
    onSave(newGuest);

    setNewGuest(createEmptyGuest());
  };

  return (
    <form onSubmit={ handleSave }>
      <span>Sei dabei: </span>
      <TextInput
        placeholder='Name'
        aria-label='Name'
        value={ newGuest.name }
        onChange={ createEventHandlerFor('name') }
      />
      <TextInput
        placeholder='Kostüm'
        aria-label='Kostüm'
        value={ newGuest.costume }
        onChange={ createEventHandlerFor('costume') }
      />
      <Button type='submit'>Speichern</Button>
    </form>
  );
};

export {
  AddGuestForm
};
