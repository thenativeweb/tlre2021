import styled from 'styled-components';

interface RowProps {
  withGap?: boolean;
}

const Row = styled.div<RowProps>`
  display: flex;
  flex-flow: row wrap;
  justify-content: space-between;
  margin-bottom: ${(props): any => props.withGap ? '10px' : '0px'}
`;

export {
  Row
};
