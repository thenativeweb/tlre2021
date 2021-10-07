import styled from 'styled-components';
import { ChangeEventHandler, FunctionComponent, ReactElement } from 'react';

const Container = styled.div`
  display: inline-block;
`;

const Label = styled.label`
  display: block;
  text-align: left;
`;

const StyledSelect = styled.select`
  padding: 8px 32px;
  background-color: ${(props): string => props.theme.colors.background};
  display: block;

  option {
    color: ${(props): string => props.theme.colors.secondary}
  }
`;

interface SelectProps {
  onChange: ChangeEventHandler<HTMLSelectElement>;
  value: any;
  label: string;
}

const Select: FunctionComponent<SelectProps> = ({
  children,
  label,
  onChange,
  value
}): ReactElement => (
  <Container>
    <Label>
      { label }
      <StyledSelect
        onChange={ onChange }
        value={ value }
      >
        { children }
      </StyledSelect>
    </Label>
  </Container>
);

export {
  Select
};
