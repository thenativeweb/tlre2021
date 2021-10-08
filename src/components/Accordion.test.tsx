import { ReactElement } from 'react';
import userEvent from '@testing-library/user-event';
import { Accordion, AccordionContentProps, AccordionStatus, AccordionTriggerProps } from './Accordion';
import { render, screen } from '@testing-library/react';

describe('Accordion', (): void => {
  const testTrigger = (props: AccordionTriggerProps): ReactElement => (<button { ...props } data-testid='trigger'>Trigger</button>);
  const testContent = (<p data-testid='content'>Content</p>);

  it('does display the toggle trigger.', async (): Promise<void> => {
    render(
      <Accordion
        trigger={ testTrigger }
        content={ testContent }
      />
    );

    expect(screen.getByTestId('trigger')).toBeInTheDocument();
  });

  it('displays the content on click.', async (): Promise<void> => {
    render(
      <Accordion
        trigger={ testTrigger }
        content={ testContent }
      />
    );

    expect(screen.queryByTestId('content')).not.toBeInTheDocument();
    userEvent.click(screen.getByTestId('trigger'));
    expect(screen.getByTestId('content')).toBeInTheDocument();
  });

  it('does not display the content by default.', async (): Promise<void> => {
    render(
      <Accordion
        trigger={ testTrigger }
        content={ (testContent) }
      />
    );

    expect(screen.queryByTestId('content')).not.toBeInTheDocument();
  });

  it('displays the content when initialState is set to true.', async (): Promise<void> => {
    render(
      <Accordion
        trigger={ testTrigger }
        content={ testContent }
        initialState={ true }
      />
    );

    expect(screen.getByTestId('content')).toBeInTheDocument();
  });

  it('renders the content when passed as component.', async (): Promise<void> => {
    render(
      <Accordion
        trigger={ testTrigger }
        content={ (): ReactElement => testContent }
        initialState={ true }
      />
    );

    expect(screen.getByTestId('content')).toBeInTheDocument();
  });

  it('closes the content when "closeContent()" is called from within it.', async (): Promise<void> => {
    const contentComponent = (props: AccordionContentProps): ReactElement => (
      <button
        data-testid='content'
        onClick={ (): void => props.closeContent() }
      >
        Close
      </button>);

    render(
      <Accordion
        trigger={ testTrigger }
        content={ contentComponent }
        initialState={ true }
      />
    );

    userEvent.click(screen.getByTestId('content'));

    expect(screen.queryByTestId('content')).not.toBeInTheDocument();
  });

  it('when closed, passes "closed" status to the trigger- and content component.', async (): Promise<void> => {
    render(
      <Accordion
        trigger={ (props: AccordionTriggerProps): ReactElement => (<button data-testid='trigger'>{ props.status }</button>) }
        content={ testContent }
        initialState={ false }
      />
    );

    const trigger = screen.getByTestId('trigger');

    const closedStatus: AccordionStatus = 'closed';

    expect(trigger.textContent).toEqual(closedStatus);
  });

  it('when opened, passes "open" status to the trigger component.', async (): Promise<void> => {
    render(
      <Accordion
        trigger={ (props: AccordionTriggerProps): ReactElement => (<button data-testid='trigger'>{ props.status }</button>) }
        content={ testContent }
      />
    );

    const trigger = screen.getByTestId('trigger');

    const closedStatus: AccordionStatus = 'closed';

    expect(trigger.textContent).toEqual(closedStatus);
    userEvent.click(trigger);
  });
});
