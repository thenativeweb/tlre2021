import { Button } from '../../../../components/Button';
import { Form } from '../../../../components/Form';
import { Guest } from '../../../../domain/Guest';
import { SubHeadline } from '../../../../components/SubHeadline';
import { TextInput } from '../../../../components/TextInput';
import { useTranslation } from 'react-i18next';
import React, { FormEventHandler, FunctionComponent, ReactElement, useEffect, useRef } from 'react';
import { resetForm, setCostume, setName } from './addGuestFormReducer';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';

interface AddGuestFormProps {
  partyId: number;
  onSave: (newGuest: Guest) => void;
  focus?: boolean;
}

const AddGuestForm: FunctionComponent<AddGuestFormProps> = ({ partyId, onSave, focus = false }): ReactElement => {
  const { t } = useTranslation();
  const buttonRef = useRef<HTMLInputElement>(null);

  const dispatch = useAppDispatch();
  const newGuest = useAppSelector((rootState): Guest => rootState.addGuestForm[partyId]);

  useEffect((): void => {
    dispatch(resetForm(partyId));
  }, [ dispatch, partyId ]);

  useEffect((): void => {
    if (focus) {
      buttonRef.current?.focus();
    }
  }, [ focus ]);

  const handleSave: FormEventHandler<HTMLFormElement> = (): void => {
    onSave(newGuest);

    dispatch(resetForm(partyId));
  };

  // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
  if (!newGuest) {
    // eslint-disable-next-line react/jsx-no-useless-fragment
    return <React.Fragment />;
  }

  return (
    <Form onSubmit={ handleSave }>
      <SubHeadline>{t('addGuestForm.title')}</SubHeadline>
      <TextInput
        label={ t('addGuestForm.nameInputLabel') }
        value={ newGuest.name }
        // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
        onChange={ event => dispatch(setName(partyId, event.target.value)) }
      />
      <TextInput
        label={ t('addGuestForm.costumeInputLabel') }
        value={ newGuest.costume }
        // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
        onChange={ event => dispatch(setCostume(partyId, event.target.value)) }
      />
      <Button type='submit'>{ t('addGuestForm.saveButtonLabel') }</Button>
    </Form>
  );
};

export {
  AddGuestForm
};
