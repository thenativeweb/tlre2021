import styled from 'styled-components';

const Headline = styled.h1`
  color: ${(props): any => props.theme.colors.primary};
  font-family: ${(props): any => props.theme.fonts.headlines};
  font-weight: 400;
  font-size: 2.5em;
`;

export {
  Headline
};
