import { PartyEdit } from './PartyEdit';
import { useParams } from 'react-router-dom';
import { FunctionComponent, ReactElement } from 'react';

const PartyEditPage: FunctionComponent = (): ReactElement => {
  const { id } = useParams<{ id: string }>();

  return (
    <PartyEdit partyId={ Number(id) } />
  );
};

export {
  PartyEditPage
};
