import { FunctionComponent, ReactElement } from 'react';

interface PartyDescriptionProps {
  description: string;
}

const PartyDescription: FunctionComponent<PartyDescriptionProps> = ({ description }): ReactElement => (
  <section>
    { description }
  </section>
);

export {
  PartyDescription
};
