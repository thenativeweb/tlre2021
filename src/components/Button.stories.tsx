import { Button } from './Button';
import { ComponentMeta } from '@storybook/react';
import { ReactElement } from 'react';

export default {
  title: 'UI/Button',
  component: Button
} as ComponentMeta<typeof Button>;

export const PrimaryButton = (): ReactElement => <Button>Button label</Button>;

PrimaryButton.args = {
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  onClick (): void {}
};
