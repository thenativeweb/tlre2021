import { Accordion } from '../../../components/Accordion';
import { Button } from '../../../components/Button';
import { PartyForm } from './forms/PartyForm';
import { UnstoredParty } from '../../../domain/UnstoredParty';
import { FunctionComponent, ReactElement } from 'react';

interface AddPartyAccordionProps {
  onPartySave: (newParty: UnstoredParty) => void;
}

const AddPartyAccordion: FunctionComponent<AddPartyAccordionProps> = ({ onPartySave }): ReactElement => (
  <Accordion
    trigger={ (props): ReactElement => <Button { ...props }>Neue Party hinzufügen</Button> }
    content={ (props): ReactElement => (
      <PartyForm
        onPartySave={ (newParty): void => {
          onPartySave(newParty);
          props.closeContent();
        } }
      />
    ) }
  />
);

export {
  AddPartyAccordion
};
