import { Select } from '../../../../components/Select';
import { TextContext } from '../../../texts/TextContext';
import { ChangeEventHandler, FunctionComponent, ReactElement, useContext } from 'react';

interface AvatarSelectProps {
  onChange: (selectedAvatarUrl: string) => void;
  value?: string;
}

const AvatarSelect: FunctionComponent<AvatarSelectProps> = ({
  onChange,
  value
}): ReactElement => {
  const texts = useContext(TextContext);
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
      <option value='avatare/avatar1.jpg'>Avatar 1</option>
      <option value='avatare/avatar2.jpg'>Avatar 2</option>
      <option value='avatare/avatar3.jpg'>Avatar 3</option>
    </Select>
  );
};

export {
  AvatarSelect
};
