import { AddPartyAccordion } from './components/AddPartyAccordion';
import { ErrorCard } from '../../components/ErrorCard';
import { PartyList } from './components/PartyList';
import { PartyNumbers } from './components/PartyNumbers';
import { useAddParty } from '../api/reactQuery/useAddParty';
import { useFetchParties } from '../api/reactQuery/useFetchParties';
import { useText } from '../texts/useText';
import { useUpdateParty } from '../api/reactQuery/useUpdateParty';
import React, { FunctionComponent, ReactElement } from 'react';

const MemoizedPartyList = React.memo(PartyList);

const PartyOverview: FunctionComponent = (): ReactElement => {
  const { texts } = useText();
  const { data, status } = useFetchParties();
  const parties = data ?? [];

  const updateParty = useUpdateParty();
  const handleUpdateParty = updateParty.mutate;

  const addParty = useAddParty();
  const handleSaveParty = addParty.mutate;

  if (status === 'loading') {
    return (<p>{texts.partyOverview.loading}</p>);
  }

  if (status === 'error') {
    return (<ErrorCard message={ texts.partyOverview.error } />);
  }

  return (
    <React.Fragment>
      <ErrorCard displayWhen={ updateParty.status === 'error' } message={ texts.partyOverview.addGuestError } />
      <ErrorCard displayWhen={ addParty.status === 'error' } message={ texts.partyOverview.savePartyError } />
      <PartyNumbers parties={ parties } />
      <AddPartyAccordion onPartySave={ handleSaveParty } />
      <MemoizedPartyList parties={ parties } onUpdateParty={ handleUpdateParty } />
    </React.Fragment>
  );
};

export {
  PartyOverview

};
