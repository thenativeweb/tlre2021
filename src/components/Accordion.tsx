import { generateId } from '../app/generateId';
import isFunction from 'lodash/isFunction';
import React, { FunctionComponent, ReactElement, useState } from 'react';

type AccordionStatus = 'open' | 'closed';

interface AccordionTriggerProps {
  id: string;
  status: AccordionStatus;
  onClick: () => void;
  'aria-expanded': boolean;
  'aria-controls': string;
}

interface AccordionContentProps {
  closeContent: () => void;
}

type ContentComponent = FunctionComponent<AccordionContentProps>;
interface AccordtionProps {
  trigger: FunctionComponent<AccordionTriggerProps>;
  content: ReactElement | ContentComponent;
  initiallyOpened?: boolean;
}

const getStatus = (isOpen: boolean): AccordionStatus => isOpen ? 'open' : 'closed';
const isFunctionComponent = (content: ReactElement | ContentComponent): content is ContentComponent => isFunction(content);

const Accordion: FunctionComponent<AccordtionProps> = ({
  trigger,
  content,
  initiallyOpened = false
}): ReactElement => {
  const [ isOpen, setIsOpen ] = useState<boolean>(initiallyOpened);

  const onClick = (): void => {
    setIsOpen((currentState): boolean => !currentState);
  };

  const contentId = generateId('accordion-content');
  const triggerId = generateId('accordion-trigger');

  const renderedTrigger = trigger({
    id: triggerId,
    onClick,
    status: getStatus(isOpen),
    'aria-expanded': isOpen,
    'aria-controls': contentId
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
      { isOpen &&
        <div id={ contentId } role='region' aria-labelledby={ triggerId }>
          { getContent() }
        </div>}
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
