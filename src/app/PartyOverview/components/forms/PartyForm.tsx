import { AvatarSelect } from './AvatarSelect';
import { Button } from '../../../../components/Button';
import { Form } from '../../../../components/Form';
import { Party } from '../../../../domain/Party';
import { TextArea } from '../../../../components/TextArea';
import { TextInput } from '../../../../components/TextInput';
import { UnstoredParty } from '../../../../domain/UnstoredParty';
import { useTranslation } from 'react-i18next';
import { ChangeEventHandler, FunctionComponent, ReactElement, useEffect, useRef } from 'react';
import { prefillForm, resetForm, setAvatar, setDescription, setHostName } from './partyFormReducer';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';

interface PartyFormProps {
  onPartySave: (newParty: UnstoredParty) => void;
  party?: Party;
}

const PartyForm: FunctionComponent<PartyFormProps> = ({ onPartySave, party }): ReactElement => {
  const inputRef = useRef<HTMLInputElement>(null);
  const dispatch = useAppDispatch();
  const state = useAppSelector((rootState): UnstoredParty => rootState.partyForm);

  const { t } = useTranslation();

  useEffect((): void => {
    if (party) {
      dispatch(prefillForm(party));
    }
  }, [ party, dispatch ]);

  useEffect((): void => {
    inputRef.current?.focus();
  }, [ inputRef ]);

  const handleHostNameChange: ChangeEventHandler<HTMLInputElement> = (event): void => {
    dispatch(setHostName(event.target.value));
  };

  const handleAvatarChange = (newAvatar: string): void => {
    dispatch(setAvatar(newAvatar));
  };

  const handleDescriptionChange: ChangeEventHandler<HTMLTextAreaElement> = (event): void => {
    dispatch(setDescription(event.target.value));
  };

  const handlePartySave = (): void => {
    onPartySave(state);
    dispatch(resetForm());
  };

  return (
    <Form>
      <TextInput
        ref={ inputRef }
        label={ t('addPartyForm.hostNameInputLabel') }
        value={ state.host.name }
        onChange={ handleHostNameChange }
      />
      <AvatarSelect
        onChange={ handleAvatarChange }
        value={ state.host.avatarUrl }
      />
      <TextArea
        label={ t('addPartyForm.descriptionLabel') }
        value={ state.description }
        onChange={ handleDescriptionChange }
      />
      <Button type='button' onClick={ handlePartySave }>{ t('addPartyForm.saveButtonLabel') }</Button>
    </Form>
  );
};

export {
  PartyForm
};
