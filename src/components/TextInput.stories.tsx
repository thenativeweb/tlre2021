import { TextInput } from './TextInput';
import { ComponentMeta, Story } from '@storybook/react';
import { ComponentProps, ReactElement, useState } from 'react';

export default {
  title: 'UI/TextInput',
  component: TextInput
} as ComponentMeta<typeof TextInput>;

// Handle values yourself
export const DefaultTextInput = (): ReactElement => {
  const [ value, setValue ] = useState('Initial value');

  return <TextInput label='Label' value={ value } onChange={ (event): void => setValue(event.target.value) } />;
};

// Let Storybook handle values and action bindings for you
const Template: Story<ComponentProps<typeof TextInput>> = (args): ReactElement => <TextInput { ...args } />;

export const ControlableInput = Template.bind({ });
ControlableInput.args = {
  label: 'Initial Label value'
};
