import styled from 'styled-components';

interface ColProps {
  size: number;
}

const FlexCardCol = styled.div<ColProps>`
  flex: ${(props): any => props.size};
  border: 1px solid ${(props): any => props.theme.colors.text};
  padding: 0.5em;
`;

export {
  FlexCardCol
};
