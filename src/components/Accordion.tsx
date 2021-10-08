import isFunction from 'lodash/isFunction';
import React, { FunctionComponent, ReactElement, useState } from 'react';

type AccordionStatus = 'open' | 'closed';

interface AccordionTriggerProps {
  status: AccordionStatus;
  onClick: () => void;
}

interface AccordionContentProps {
  closeContent: () => void;
}

type ContentComponent = FunctionComponent<AccordionContentProps>;
interface AccordtionProps {
  trigger: FunctionComponent<AccordionTriggerProps>;
  content: ReactElement | ContentComponent;
  initialState?: boolean;
}

const getStatus = (isOpen: boolean): AccordionStatus => isOpen ? 'open' : 'closed';
const isFunctionComponent = (content: ReactElement | ContentComponent): content is ContentComponent => isFunction(content);

const Accordion: FunctionComponent<AccordtionProps> = ({
  trigger,
  content,
  initialState = false
}): ReactElement => {
  const [ isOpen, setIsOpen ] = useState<boolean>(initialState);

  const onClick = (): void => {
    setIsOpen((currentState): boolean => !currentState);
  };

  const renderedTrigger = trigger({
    onClick,
    status: getStatus(isOpen)
  });

  const getContent = (): ReactElement | null => {
    if (isFunctionComponent(content)) {
      return content({
        closeContent: (): void => setIsOpen(false)
      });
    }

    return content;
  };

  return (
    <React.Fragment>
      {renderedTrigger}
      { isOpen && getContent()}
    </React.Fragment>
  );
};

export {
  Accordion
};

export type {
  AccordionTriggerProps,
  AccordionContentProps,
  AccordionStatus
};
