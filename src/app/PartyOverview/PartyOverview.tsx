import { AddPartyAccordion } from './components/AddPartyAccordion';
import { PartyList } from './components/PartyList';
import { PartyNumbers } from './components/PartyNumbers';
import { TextContext } from '../texts/TextContext';
import { useAddParty } from '../api/reactQuery/useAddParty';
import { useFetchParties } from '../api/reactQuery/useFetchParties';
import { useUpdateParty } from '../api/reactQuery/useUpdateParty';
import React, { FunctionComponent, ReactElement, useContext } from 'react';

// API HOOKS: CUSTOM
// import { usePartyApi } from '../api/customHooks/usePartyApi';
// API HOOKS: CUSTOM

const PartyOverview: FunctionComponent = (): ReactElement => {
  const texts = useContext(TextContext);

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
  const addParty = useAddParty();

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
      <PartyList parties={ parties } onUpdateParty={ updateParty } />
    </React.Fragment>
  );
};

export {
  PartyOverview

};
