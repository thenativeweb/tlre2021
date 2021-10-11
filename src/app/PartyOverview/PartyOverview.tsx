import { AddPartyAccordion } from './components/AddPartyAccordion';
import { PartyList } from './components/PartyList';
import { PartyNumbers } from './components/PartyNumbers';
import { TextContext } from '../texts/TextContext';
import { usePartyApi } from '../api/custom/usePartyApi';
import React, { FunctionComponent, ReactElement, useContext } from 'react';

const PartyOverview: FunctionComponent = (): ReactElement => {
  const texts = useContext(TextContext);
  const { apiState, parties, addParty, updateParty } = usePartyApi();

  if (apiState === 'loading') {
    return (<p>{texts.partyOverview.loading}</p>);
  }

  if (apiState === 'error') {
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
