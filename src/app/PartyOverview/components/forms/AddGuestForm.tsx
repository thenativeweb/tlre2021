import { Button } from '../../../../components/Button';
import { Form } from '../../../../components/Form';
import { Guest } from '../../../../domain/Guest';
import { SubHeadline } from '../../../../components/SubHeadline';
import { TextInput } from '../../../../components/TextInput';
import { useTranslation } from 'react-i18next';
import { FormEventHandler, FunctionComponent, ReactElement } from 'react';
import { resetForm, setCostume, setName } from './addGuestFormReducer';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';

interface AddGuestFormProps {
  onSave: (newGuest: Guest) => void;
}

const AddGuestForm: FunctionComponent<AddGuestFormProps> = ({ onSave }): ReactElement => {
  const { t } = useTranslation();

  const dispatch = useAppDispatch();
  const newGuest = useAppSelector((rootState): Guest => rootState.addGuestForm);

  const handleSave: FormEventHandler<HTMLFormElement> = (): void => {
    onSave(newGuest);

    dispatch(resetForm());
  };

  return (
    <Form onSubmit={ handleSave }>
      <SubHeadline>{t('addGuestForm.title')}</SubHeadline>
      <TextInput
        label={ t('addGuestForm.nameInputLabel') }
        value={ newGuest.name }
        // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
        onChange={ event => dispatch(setName(event.target.value)) }
      />
      <TextInput
        label={ t('addGuestForm.costumeInputLabel') }
        value={ newGuest.costume }
        // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
        onChange={ event => dispatch(setCostume(event.target.value)) }
      />
      <Button type='submit'>{ t('addGuestForm.saveButtonLabel') }</Button>
    </Form>
  );
};

export {
  AddGuestForm
};
