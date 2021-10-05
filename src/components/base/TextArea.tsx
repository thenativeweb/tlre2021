import styled from 'styled-components';
import { ChangeEventHandler, FunctionComponent, ReactElement } from 'react';

const Container = styled.div`
  display: inline-block;
`;

const Label = styled.label`
  display: block;
  text-align: left;
`;

const StyledTextArea = styled.textarea`
  padding: 10px 10px;
  display: block;
`;

interface TextAreaProps {
  value: any;
  onChange: ChangeEventHandler<HTMLTextAreaElement>;
  label: string;
}

const TextArea: FunctionComponent<TextAreaProps> = (props): ReactElement => {
  const { label } = props;

  return (
    <Container>
      <Label>
        { label }
        <StyledTextArea { ...props }>TextArea</StyledTextArea>
      </Label>
    </Container>
  );
};

export {
  TextArea
};
