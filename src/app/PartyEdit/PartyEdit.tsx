import { Party } from '../../domain/Party';
import { PartyForm } from '../PartyOverview/components/forms/PartyForm';
import { UnstoredParty } from '../../domain/UnstoredParty';
import { useFetchPartyById } from '../api/reactQuery/useFetchPartyById';
import { useUpdateParty } from '../api/reactQuery/useUpdateParty';
import { FunctionComponent, ReactElement } from 'react';
import { useHistory, useParams } from 'react-router-dom';

const PartyEdit: FunctionComponent = (): ReactElement => {
  const { id } = useParams<{ id: string }>();
  const { data, status } = useFetchPartyById(Number(id));
  const updateParty = useUpdateParty();
  const history = useHistory();

  if (status === 'loading') {
    return (<p>Lade Party...</p>);
  }

  if (status === 'error') {
    return (<p>Fehler beim Laden der Daten. Bitte versuchen Sie es später erneut...</p>);
  }

  const handlePartyUpdate = (party: UnstoredParty): void => {
    updateParty.mutate(party as Party);
    history.push('/');
  };

  return (
    <PartyForm party={ data } onPartySave={ handlePartyUpdate } />
  );
};

export {
  PartyEdit
};
