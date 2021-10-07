import styled from 'styled-components';
import { ChangeEventHandler, FunctionComponent, ReactElement } from 'react';

const Container = styled.div`
  display: inline-block;
`;

const Label = styled.label`
  display: block;
  text-align: left;
`;

const StyledTextInput = styled.input`
  padding: 8px 16px;
  margin: 2px;
  display: block;
`;

interface TextInputProps {
  value: any;
  onChange: ChangeEventHandler<HTMLInputElement>;
  label: string;
}
const TextInput: FunctionComponent<TextInputProps> = ({
  value,
  onChange,
  label
}): ReactElement => (
  <Container>
    <Label>
      {label}
      <StyledTextInput
        type='text'
        onChange={ onChange }
        value={ value }
      />
    </Label>
  </Container>
);

export {
  TextInput
};
