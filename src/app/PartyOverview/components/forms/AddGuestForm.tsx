import { Button } from '../../../../components/Button';
import { Form } from '../../../../components/Form';
import { Guest } from '../../../../domain/Guest';
import party from 'party-js';
import styled from 'styled-components';
import { SubHeadline } from '../../../../components/SubHeadline';
import { TextInput } from '../../../../components/TextInput';
import { useTranslation } from 'react-i18next';
import React, { FormEventHandler, FunctionComponent, ReactElement, useEffect, useRef } from 'react';
import { resetForm, setCostume, setName } from './addGuestFormReducer';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';

const ClickableHeadline = styled(SubHeadline)`
  cursor: pointer;
  :hover {
    color: ${(props): string => props.theme.colors.primary};
  }
`;

interface AddGuestFormProps {
  partyId: number;
  onSave: (newGuest: Guest) => void;
}

const AddGuestForm: FunctionComponent<AddGuestFormProps> = ({ partyId, onSave }): ReactElement => {
  const { t } = useTranslation();
  const inputRef = useRef<HTMLInputElement>(null);
  const buttonRef = useRef <HTMLButtonElement>(null);

  const dispatch = useAppDispatch();
  const newGuest = useAppSelector((rootState): Guest => rootState.addGuestForm[partyId]);

  useEffect((): void => {
    dispatch(resetForm(partyId));
  }, [ dispatch, partyId ]);

  const handleHeadlineClick = (): void => {
    inputRef.current?.focus();
  };

  const handleSave: FormEventHandler<HTMLFormElement> = (): void => {
    party.confetti(buttonRef.current!);
    onSave(newGuest);

    dispatch(resetForm(partyId));
  };

  // On initial setup, newGuest is not there yet as we only create its state in the dispatch above
  // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
  if (!newGuest) {
    // eslint-disable-next-line react/jsx-no-useless-fragment
    return <React.Fragment />;
  }

  return (
    <Form onSubmit={ handleSave }>
      <ClickableHeadline onClick={ handleHeadlineClick }>{t('addGuestForm.title')}</ClickableHeadline>
      <TextInput
        ref={ inputRef }
        label={ t('addGuestForm.nameInputLabel') }
        value={ newGuest.name }
        // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
        onChange={ event => dispatch(setName(partyId, event.target.value)) }
      />
      <TextInput
        label={ t('addGuestForm.costumeInputLabel') }
        value={ newGuest.costume ?? '' }
        // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
        onChange={ event => dispatch(setCostume(partyId, event.target.value)) }
      />
      <Button ref={ buttonRef } type='submit'>{ t('addGuestForm.saveButtonLabel') }</Button>
    </Form>
  );
};

export {
  AddGuestForm
};
