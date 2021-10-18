import { AvatarSelect } from './AvatarSelect';
import { Button } from '../../../../components/Button';
import { Form } from '../../../../components/Form';
import { Party } from '../../../../domain/Party';
import { TextArea } from '../../../../components/TextArea';
import { TextInput } from '../../../../components/TextInput';
import { UnstoredParty } from '../../../../domain/UnstoredParty';
import { useTranslation } from 'react-i18next';
import { ChangeEventHandler, FunctionComponent, ReactElement, useReducer } from 'react';
import { newParty, partyFormReducer } from './partyFormReducer';

interface PartyFormProps {
  onPartySave: (newParty: UnstoredParty) => void;
  party?: Party;
}

const PartyForm: FunctionComponent<PartyFormProps> = ({ onPartySave, party }): ReactElement => {
  const { t } = useTranslation();
  const [ state, dispatch ] = useReducer(partyFormReducer, party ?? newParty);

  const handleHostNameChange: ChangeEventHandler<HTMLInputElement> = (event): void => {
    dispatch({ type: 'SET_HOST_NAME', body: event.target.value });
  };

  const handleAvatarChange = (newAvatar: string): void => {
    dispatch({ type: 'SET_AVATAR', body: newAvatar });
  };

  const handleDescriptionChange: ChangeEventHandler<HTMLTextAreaElement> = (event): void => {
    dispatch({ type: 'SET_DESCRIPTION', body: event.target.value });
  };

  const handlePartySave = (): void => {
    onPartySave(state);
    dispatch({ type: 'RESET_FORM' });
  };

  return (
    <Form>
      <TextInput
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
