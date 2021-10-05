import styled from 'styled-components';

const Select = styled.select`
  padding: 8px 32px;
  background-color: ${(props): string => props.theme.colors.background};

  option {
    color: ${(props): string => props.theme.colors.secondary}

  }
`;

export {
  Select
};
