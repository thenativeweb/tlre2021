import styled from 'styled-components';

const Form = styled.form`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 10px;
  
  /* Make buttons bet more or less centered - I am sure there are better ways ;) */
  button {
    margin-top: 20px;
  }
`;

export {
  Form
};
