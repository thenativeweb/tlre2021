import { AvatarSelect } from './AvatarSelect';
import { Button } from '../../../../components/Button';
import { Form } from '../../../../components/Form';
import { Host } from '../../../../domain/Host';
import { TextArea } from '../../../../components/TextArea';
import { TextContext } from '../../../texts/TextContext';
import { TextInput } from '../../../../components/TextInput';
import { UnstoredParty } from '../../../../domain/UnstoredParty';
import { ChangeEventHandler, FunctionComponent, ReactElement, useContext, useState } from 'react';

interface PartyFormProps {
  onPartySave: (newParty: UnstoredParty) => void;
}

const createEmptyHost = (): Host => ({
  name: ''
});

const PartyForm: FunctionComponent<PartyFormProps> = ({ onPartySave }): ReactElement => {
  const [ host, setHost ] = useState<Host>(createEmptyHost());
  const [ description, setDescription ] = useState<string>('');
  const texts = useContext(TextContext);

  const handleHostNameChange: ChangeEventHandler<HTMLInputElement> = (event): void => {
    setHost({
      ...host,
      name: event.target.value
    });
  };

  const handleAvatarChange = (newAvatar: string): void => {
    setHost({
      ...host,
      avatarUrl: newAvatar
    });
  };

  const handleDescriptionChange: ChangeEventHandler<HTMLTextAreaElement> = (event): void => {
    setDescription(event.target.value);
  };

  const handlePartySave = (): void => {
    onPartySave({
      host,
      description
    });

    setHost(createEmptyHost());
    setDescription('');
  };

  return (
    <Form>
      <TextInput
        label={ texts.addPartyForm.hostNameInputLabel }
        value={ host.name }
        onChange={ handleHostNameChange }
      />
      <AvatarSelect
        onChange={ handleAvatarChange }
        value={ host.avatarUrl }
      />
      <TextArea
        label={ texts.addPartyForm.descriptionLabel }
        value={ description }
        onChange={ handleDescriptionChange }
      />
      <Button type='button' onClick={ handlePartySave }>{texts.addPartyForm.saveButtonLabel}</Button>
    </Form>
  );
};

export {
  PartyForm
};
