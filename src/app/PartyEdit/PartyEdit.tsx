import { Party } from '../../domain/Party';
import { PartyForm } from '../PartyOverview/components/forms/PartyForm';
import { UnstoredParty } from '../../domain/UnstoredParty';
import { useFetchPartyById } from '../api/reactQuery/useFetchPartyById';
import { useHistory } from 'react-router-dom';
import { useUpdateParty } from '../api/reactQuery/useUpdateParty';
import { FunctionComponent, ReactElement } from 'react';

interface PartyEditProps {
  partyId: Party['id'];
}

const PartyEdit: FunctionComponent<PartyEditProps> = ({ partyId }): ReactElement => {
  const { data, status } = useFetchPartyById(partyId);
  const updateParty = useUpdateParty();
  const history = useHistory();

  if (status === 'loading') {
    return (<p>Lade Party...</p>);
  }

  if (status === 'error') {
    return (<p>Fehler beim Laden der Daten. Bitte versuchen Sie es später erneut...</p>);
  }

  const handlePartyUpdate = async (party: UnstoredParty): Promise<void> => {
    await updateParty.mutateAsync(party as Party);
    history.push('/');
  };

  return (
    <PartyForm party={ data } onPartySave={ handlePartyUpdate } />
  );
};

export {
  PartyEdit
};
