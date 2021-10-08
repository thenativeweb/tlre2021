import { Button } from '../../../../components/Button';
import { Form } from '../../../../components/Form';
import { Guest } from '../../../../domain/Guest';
import { SubHeadline } from '../../../../components/SubHeadline';
import { TextContext } from '../../../texts/TextContext';
import { TextInput } from '../../../../components/TextInput';
import { ChangeEventHandler, FormEventHandler, FunctionComponent, ReactElement, useContext, useState } from 'react';

const createEmptyGuest = (): Guest => ({
  name: '',
  costume: ''
});

interface AddGuestFormProps {
  onSave: (newGuest: Guest) => void;
}

const AddGuestForm: FunctionComponent<AddGuestFormProps> = ({ onSave }): ReactElement => {
  const [ newGuest, setNewGuest ] = useState<Guest>(createEmptyGuest());
  const texts = useContext(TextContext);

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
    <Form onSubmit={ handleSave }>
      <SubHeadline>{texts.addGuestForm.title}</SubHeadline>
      <TextInput
        label={ texts.addGuestForm.nameInputLabel }
        value={ newGuest.name }
        onChange={ createEventHandlerFor('name') }
      />
      <TextInput
        label={ texts.addGuestForm.costumeInputLabel }
        value={ newGuest.costume }
        onChange={ createEventHandlerFor('costume') }
      />
      <Button type='submit'>{texts.addGuestForm.saveButtonLabel}</Button>
    </Form>
  );
};

export {
  AddGuestForm
};
