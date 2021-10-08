import { ReactElement } from 'react';
import userEvent from '@testing-library/user-event';
import { Accordion, AccordionContentProps, AccordionStatus, AccordionTriggerProps } from './Accordion';
import { render, screen } from '@testing-library/react';

describe('Accordion', (): void => {
  const simpleTestTrigger = (props: AccordionTriggerProps): ReactElement => (<button { ...props } data-testid='trigger'>Trigger</button>);
  const simpleTestContent = (<p data-testid='content'>Content</p>);

  it('does display the toggle trigger.', async (): Promise<void> => {
    render(
      <Accordion
        trigger={ simpleTestTrigger }
        content={ simpleTestContent }
      />
    );

    expect(screen.getByTestId('trigger')).toBeInTheDocument();
  });

  it('displays the content on click.', async (): Promise<void> => {
    render(
      <Accordion
        trigger={ simpleTestTrigger }
        content={ simpleTestContent }
      />
    );

    expect(screen.queryByTestId('content')).not.toBeInTheDocument();
    userEvent.click(screen.getByTestId('trigger'));
    expect(screen.getByTestId('content')).toBeInTheDocument();
  });

  it('does not display the content by default.', async (): Promise<void> => {
    render(
      <Accordion
        trigger={ simpleTestTrigger }
        content={ (simpleTestContent) }
      />
    );

    expect(screen.queryByTestId('content')).not.toBeInTheDocument();
  });

  it('displays the content when initialState is set to true.', async (): Promise<void> => {
    render(
      <Accordion
        trigger={ simpleTestTrigger }
        content={ simpleTestContent }
        initiallyOpened={ true }
      />
    );

    expect(screen.getByTestId('content')).toBeInTheDocument();
  });

  it('renders the content when passed as component.', async (): Promise<void> => {
    render(
      <Accordion
        trigger={ simpleTestTrigger }
        content={ (): ReactElement => simpleTestContent }
        initiallyOpened={ true }
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
        trigger={ simpleTestTrigger }
        content={ contentComponent }
        initiallyOpened={ true }
      />
    );

    userEvent.click(screen.getByTestId('content'));

    expect(screen.queryByTestId('content')).not.toBeInTheDocument();
  });

  it('when closed, passes "closed" status to the trigger- and content component.', async (): Promise<void> => {
    render(
      <Accordion
        trigger={ (props: AccordionTriggerProps): ReactElement => (<button data-testid='trigger'>{ props.status }</button>) }
        content={ simpleTestContent }
        initiallyOpened={ false }
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
        content={ simpleTestContent }
      />
    );

    const trigger = screen.getByTestId('trigger');

    const closedStatus: AccordionStatus = 'closed';

    expect(trigger.textContent).toEqual(closedStatus);
    userEvent.click(trigger);
  });

  it('sets aria-expanded to false if closed.', async (): Promise<void> => {
    render(
      <Accordion
        trigger={ simpleTestTrigger }
        content={ simpleTestContent }
      />
    );

    expect(screen.getByTestId('trigger').getAttribute('aria-expanded')).toEqual('false');
  });

  it('sets aria-expanded to true if opened.', async (): Promise<void> => {
    render(
      <Accordion
        trigger={ simpleTestTrigger }
        content={ simpleTestContent }
        initiallyOpened={ true }
      />
    );

    expect(screen.getByTestId('trigger').getAttribute('aria-expanded')).toEqual('true');
  });

  it('generates ids for content and trigger and sets them as ar-acontrols and aria-labelledby.', async (): Promise<void> => {
    render(
      <Accordion
        trigger={ simpleTestTrigger }
        content={ simpleTestContent }
        initiallyOpened={ true }
      />
    );
    const trigger = screen.getByTestId('trigger');
    const contentWrapper = screen.getByRole('region');

    expect(trigger.getAttribute('aria-controls')).toEqual(contentWrapper.id);
    expect(contentWrapper.getAttribute('aria-labelledby')).toEqual(trigger.id);
  });
});
