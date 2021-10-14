import { AddPartyAccordion } from './components/AddPartyAccordion';
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
  const updateParty = useUpdateParty();
  const addParty = useAddParty();
  const parties = data ?? [];

  // API HOOKS: REACT-QUERY

  if (status === 'loading') {
    return (<p>{texts.partyOverview.loading}</p>);
  }

  if (status === 'error') {
    return (<p>{texts.partyOverview.error}</p>);
  }

  return (
    <React.Fragment>
      <PartyNumbers parties={ parties } />
      <AddPartyAccordion onPartySave={ addParty } />
      <MemoizedPartyList parties={ parties } onUpdateParty={ updateParty } />
    </React.Fragment>
  );
};

export {
  PartyOverview

};
