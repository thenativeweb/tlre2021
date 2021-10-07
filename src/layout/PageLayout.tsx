import styled from 'styled-components';

const PageLayout = styled.main.attrs((): any => ({
  role: 'main'
}))`
  max-width: 1024px;
  margin: auto;
  text-align: center;
  font-family: ${(props): any => props.theme.fonts.text};
`;

export {
  PageLayout
};
