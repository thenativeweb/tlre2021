import styled from 'styled-components';
import React, { FunctionComponent, ReactElement } from 'react';

const StyledParagraph = styled.p`
  color: red;
`;

interface ErrorCardProps {
  message: string;
  displayWhen?: boolean;
}

const ErrorCard: FunctionComponent<ErrorCardProps> = ({ message, displayWhen = true }): ReactElement => {
  if (!displayWhen) {
    // eslint-disable-next-line react/jsx-no-useless-fragment
    return <React.Fragment />;
  }

  return (
    <StyledParagraph>{message}</StyledParagraph>
  );
};

export {
  ErrorCard
};
