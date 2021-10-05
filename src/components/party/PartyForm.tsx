import { AvatarSelect } from './AvatarSelect';
import { Button } from '../base/Button';
import { Form } from '../base/Form';
import { Host } from '../../domain/Host';
import { TextArea } from '../base/TextArea';
import { TextInput } from '../base/TextInput';
import { UnstoredParty } from '../../domain/UnstoredParty';
import { ChangeEventHandler, FunctionComponent, ReactElement, useState } from 'react';

interface PartyFormProps {
  onPartySave: (newParty: UnstoredParty) => void;
}

const createEmptyHost = (): Host => ({
  avatarUrl: 'avatare/avatar1.jpg',
  name: ''
});

const PartyForm: FunctionComponent<PartyFormProps> = ({ onPartySave }): ReactElement => {
  const [ host, setHost ] = useState<Host>(createEmptyHost());
  const [ description, setDescription ] = useState<string>('');

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
        label='Name des Gastgebers'
        value={ host.name }
        onChange={ handleHostNameChange }
      />
      <AvatarSelect
        onChange={ handleAvatarChange }
        value={ host.avatarUrl }
      />
      <TextArea
        label='Partybeschreibung'
        value={ description }
        onChange={ handleDescriptionChange }
      />
      <Button type='button' onClick={ handlePartySave }>Party speichern</Button>
    </Form>
  );
};

export {
  PartyForm
};
