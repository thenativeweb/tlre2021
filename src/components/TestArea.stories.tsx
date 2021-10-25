import { TextArea } from './TextArea';
import { ComponentMeta, Story } from '@storybook/react';
import { ComponentProps, ReactElement } from 'react';

export default {
  title: 'UI/TextArea',
  component: TextArea,
  args: {
    label: 'initial label value'
  }
} as ComponentMeta<typeof TextArea>;

const Template: Story<ComponentProps<typeof TextArea>> = (args): ReactElement => <TextArea { ...args } />;

export const DefaultTextArea = Template.bind({});
