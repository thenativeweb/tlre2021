import { ComponentMeta } from '@storybook/react';
import { Headline } from './Headline';
import { ReactElement } from 'react';

export default {
  title: 'UI/Headline',
  component: Headline
} as ComponentMeta<typeof Headline>;

export const PrimaryButton = (): ReactElement => <Headline>This is a creepy Headline!</Headline>;
