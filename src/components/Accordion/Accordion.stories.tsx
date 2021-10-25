import { Accordion } from './Accordion';
import { Button } from '../Button';
import { ComponentMeta, Story } from '@storybook/react';
import { ComponentProps, ReactElement } from 'react';

export default {
  title: 'UI/Accordion',
  component: Accordion
} as ComponentMeta<typeof Accordion>;

export const StandardAccordion = (): ReactElement => (
  <Accordion
    trigger={ (props): ReactElement => <Button { ...props }>Accordion Trigger</Button> }
    content={ <p>Accordion Content</p> }
  />
);

export const PropsControlledAccordion = (): ReactElement => (
  <Accordion
    trigger={ (props): ReactElement => <Button { ...props }>Accordion Trigger with embedded Status: {props.status}</Button> }
    // eslint-disable-next-line react/jsx-handler-names
    content={ (props): ReactElement => <Button onClick={ props.closeContent }>Accordion Content - Click me to close accordion again.</Button> }
  />
);

const Template: Story<ComponentProps<typeof Accordion>> = (args): ReactElement => <Accordion { ...args } />;

export const BlankAccordion = Template.bind({});
BlankAccordion.args = {
  trigger: (props): ReactElement => <button { ...props }>Change me</button>,
  content: (<p>Change me</p>)
};

BlankAccordion.argTypes = {
  trigger: {
    control: {
      type: 'string'
    }
  }
};
