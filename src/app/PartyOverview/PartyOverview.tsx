import { AddPartyAccordion } from './components/AddPartyAccordion';
import { ErrorCard } from '../../components/ErrorCard';
import { PartyList } from './components/PartyList';
import { PartyNumbers } from './components/PartyNumbers';
import { useAddParty } from '../api/reactQuery/useAddParty';
import { useFetchParties } from '../api/reactQuery/useFetchParties';
import { useText } from '../texts/useText';
import { useUpdateParty } from '../api/reactQuery/useUpdateParty';
import React, { FunctionComponent, ReactElement } from 'react';

// API HOOKS: CUSTOM
// import { usePartyApi } from '../api/customHooks/usePartyApi';
// API HOOKS: CUSTOM

const MemoizedPartyList = React.memo(PartyList);

const PartyOverview: FunctionComponent = (): ReactElement => {
  const { texts } = useText();

  // You can swtich between both Api Hook Implemenations "CUSTOM" or "REACT-QUERY".
  // You'll have to comment out the other method.
  // Tests will still pass.

  // API HOOKS: CUSTOM
  // const { parties, addParty, status, updateParty } = usePartyApi();

  // API HOOKS: CUSTOM

  // API HOOKS: REACT-QUERY
  const { data, status } = useFetchParties();
  const parties = data ?? [];

  const updateParty = useUpdateParty();
  const handleUpdateParty = updateParty.mutate;

  const addParty = useAddParty();
  const handleSaveParty = addParty.mutate;

  // API HOOKS: REACT-QUERY

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
