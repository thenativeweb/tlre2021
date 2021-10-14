import { generateId } from '../../app/generateId';
import isFunction from 'lodash/isFunction';
import { useToggle } from './useToggle';
import React, { FunctionComponent, ReactElement } from 'react';

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
  const { setToggleState, toggle, toggleState } = useToggle(initiallyOpened);

  const onClick = (): void => {
    toggle();
  };

  const contentId = generateId('accordion-content');
  const triggerId = generateId('accordion-trigger');

  const renderedTrigger = trigger({
    id: triggerId,
    onClick,
    status: getStatus(toggleState),
    'aria-expanded': toggleState,
    'aria-controls': contentId
  });

  const getContent = (): ReactElement | null => {
    if (isFunctionComponent(content)) {
      return content({
        closeContent: (): void => setToggleState(false)
      });
    }

    return content;
  };

  return (
    <React.Fragment>
      {renderedTrigger}
      { toggleState &&
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
