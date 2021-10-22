import { Button } from './Button';
import { ComponentMeta } from '@storybook/react';
import { ReactElement } from 'react';

export default {
  title: 'UI/Button',
  component: Button
} as ComponentMeta<typeof Button>;

export const NormalButton = (): ReactElement => <Button>Button label</Button>;
