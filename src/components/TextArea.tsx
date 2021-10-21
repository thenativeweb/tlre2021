import styled from 'styled-components';
import { ChangeEventHandler, FunctionComponent, ReactElement, useRef } from 'react';

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
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const { label } = props;

  const onClick = (): void => {
    inputRef.current?.focus();
  };

  return (
    <Container>
      <Label>
        { label }
        <StyledTextArea ref={ inputRef } { ...props }>TextArea</StyledTextArea>
      </Label>
      <button type='button' onClick={ onClick }>Fokus</button>
    </Container>
  );
};

export {
  TextArea
};
