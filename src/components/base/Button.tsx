import styled from 'styled-components';

const Button = styled.button`
  background-color: ${(props): any => props.theme.colors.primary};
  color: ${(props): any => props.theme.colors.text};
  padding: 10px 32px;
  border-radius: 4px;
  border: none;
  
  :hover {
    background-color: ${(props): any => props.theme.colors.secondary};
    color: white;
  }
`;

export {
  Button
};
