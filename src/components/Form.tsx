import styled from 'styled-components';
import React, { FunctionComponent, ReactElement } from 'react';

const StyledForm = styled.form`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 10px;
  
  /* Make buttons bet more or less centered - I am sure there are better ways ;) */
  button {
    margin-top: 20px;
  }
`;

type FormProps = React.FormHTMLAttributes<HTMLFormElement>;

const Form: FunctionComponent<FormProps> = (props): ReactElement => {
  const { children, onSubmit } = props;

  let onSubmitOverwrite: React.FormEventHandler<HTMLFormElement> | undefined;

  if (onSubmit) {
    onSubmitOverwrite = (event): void => {
      event.preventDefault();
      onSubmit(event);
    };
  }

  return (
    <StyledForm
      { ...props }
      onSubmit={ onSubmitOverwrite }
    >
      {children}
    </StyledForm>

  );
};

export {
  Form
};
