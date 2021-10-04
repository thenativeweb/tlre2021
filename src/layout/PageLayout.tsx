import styled from 'styled-components';

const PageLayout = styled.div`
  max-width: 1024px;
  margin: auto;
  background-color: ${(props): any => props.theme.colors.background};
`;

export {
  PageLayout
};
