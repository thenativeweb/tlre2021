import { Button } from '../../../../components/Button';
import { Form } from '../../../../components/Form';
import { Guest } from '../../../../domain/Guest';
import { SubHeadline } from '../../../../components/SubHeadline';
import { TextInput } from '../../../../components/TextInput';
import { useTranslation } from 'react-i18next';
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
  const { t } = useTranslation();

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
      <SubHeadline>{t('addGuestForm.title')}</SubHeadline>
      <TextInput
        label={ t('addGuestForm.nameInputLabel') }
        value={ newGuest.name }
        onChange={ createEventHandlerFor('name') }
      />
      <TextInput
        label={ t('addGuestForm.costumeInputLabel') }
        value={ newGuest.costume }
        onChange={ createEventHandlerFor('costume') }
      />
      <Button type='submit'>{ t('addGuestForm.saveButtonLabel') }</Button>
    </Form>
  );
};

export {
  AddGuestForm
};
