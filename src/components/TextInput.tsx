import styled from 'styled-components';
import React, { ChangeEventHandler, ReactElement } from 'react';

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
  value: string;
  onChange: ChangeEventHandler<HTMLInputElement>;
  label: string;
}

const TextInput = React.forwardRef<HTMLInputElement, TextInputProps>(({
  value,
  onChange,
  label
}, ref): ReactElement => (
  <Container>
    <Label>
      {label}
      <StyledTextInput
        ref={ ref }
        type='text'
        onChange={ onChange }
        value={ value }
      />
    </Label>
  </Container>
));

export {
  TextInput
};
