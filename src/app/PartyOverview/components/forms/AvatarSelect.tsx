import { AvatarData } from './AvatarData';
import { Select } from '../../../../components/Select';
import { useText } from '../../../texts/useText';
import { ChangeEventHandler, FunctionComponent, ReactElement } from 'react';

interface AvatarSelectProps {
  onChange: (selectedAvatarUrl: string) => void;
  value?: string;
}

const AvatarSelect: FunctionComponent<AvatarSelectProps> = ({
  onChange,
  value
}): ReactElement => {
  const { texts } = useText();
  const handleAvatarChange: ChangeEventHandler<HTMLSelectElement> = (event): void => {
    onChange(event.target.value);
  };

  return (
    <Select
      label={ texts.avatarSelect.label }
      onChange={ handleAvatarChange }
      value={ value }
    >
      <option value={ undefined }>{texts.avatarSelect.nullOption}</option>
      <option value={ AvatarData.avatar1.url }>{AvatarData.avatar1.name}</option>
      <option value={ AvatarData.avatar2.url }>{AvatarData.avatar2.name}</option>
      <option value={ AvatarData.avatar3.url }>{AvatarData.avatar3.name}</option>
    </Select>
  );
};

export {
  AvatarSelect
};
