import { AvatarSelect } from './AvatarSelect';
import { Button } from '../../../../components/Button';
import { Form } from '../../../../components/Form';
import { TextArea } from '../../../../components/TextArea';
import { TextInput } from '../../../../components/TextInput';
import { UnstoredParty } from '../../../../domain/UnstoredParty';
import { useText } from '../../../texts/useText';
import { ChangeEventHandler, FunctionComponent, ReactElement, useReducer } from 'react';
import { initialState, partyFormReducer } from './partyFormReducer';

interface PartyFormProps {
  onPartySave: (newParty: UnstoredParty) => void;
}

const PartyForm: FunctionComponent<PartyFormProps> = ({ onPartySave }): ReactElement => {
  const { texts } = useText();
  const [ state, dispatch ] = useReducer(partyFormReducer, initialState);

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
        label={ texts.addPartyForm.hostNameInputLabel }
        value={ state.host.name }
        onChange={ handleHostNameChange }
      />
      <AvatarSelect
        onChange={ handleAvatarChange }
        value={ state.host.avatarUrl }
      />
      <TextArea
        label={ texts.addPartyForm.descriptionLabel }
        value={ state.description }
        onChange={ handleDescriptionChange }
      />
      <Button type='button' onClick={ handlePartySave }>{texts.addPartyForm.saveButtonLabel}</Button>
    </Form>
  );
};

export {
  PartyForm
};
