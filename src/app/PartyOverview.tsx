import { Button } from '../components/base/Button';
import { Party } from '../domain/Party';
import { PartyForm } from '../components/party/PartyForm';
import { PartyList } from '../components/party/PartyList';
import { PartyNumbers } from '../components/party/PartyNumbers';
import { UnstoredParty } from '../domain/UnstoredParty';
import React, { FunctionComponent, ReactElement, useState } from 'react';

interface PartyOverviewProps {
  parties: Party[];
  onAddParty: (newParty: UnstoredParty) => void;
  onUpdateParty: (updatedParty: Party) => void;
}

const PartyOverview: FunctionComponent<PartyOverviewProps> = ({ parties, onAddParty, onUpdateParty }): ReactElement => {
  const [ showPartyForm, setShowPartyForm ] = useState<boolean>(false);

  const toggleShowPartyForm = (): void => {
    setShowPartyForm((currentState): boolean => !currentState);
  };

  const handleNewParty = async (newParty: UnstoredParty): Promise<void> => {
    toggleShowPartyForm();
    onAddParty(newParty);
  };

  return (
    <React.Fragment>
      <PartyNumbers parties={ parties } />
      <Button onClick={ toggleShowPartyForm }>Neue Party hinzufügen</Button>
      {showPartyForm && <PartyForm onPartySave={ handleNewParty } />}
      <PartyList parties={ parties } onUpdateParty={ onUpdateParty } />
    </React.Fragment>
  );
};

export {
  PartyOverview
};
