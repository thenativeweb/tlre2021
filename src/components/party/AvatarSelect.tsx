import { Select } from '../base/Select';
import { ChangeEventHandler, FunctionComponent, ReactElement } from 'react';

interface AvatarSelectProps {
  onChange: (selectedAvatarUrl: string) => void;
}

const AvatarSelect: FunctionComponent<AvatarSelectProps> = ({ onChange }): ReactElement => {
  const handleAvatarChange: ChangeEventHandler<HTMLSelectElement> = (event): void => {
    onChange(event.target.value);
  };

  return (
    <Select onChange={ handleAvatarChange }>
      <option value='avatare/avatar1.jpg'>Avatar 1</option>
      <option value='avatare/avatar2.jpg'>Avatar 2</option>
      <option value='avatare/avatar3.jpg'>Avatar 3</option>
    </Select>
  );
};

export {
  AvatarSelect
};
