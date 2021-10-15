import { PartyForm } from './forms/PartyForm';
import { UnstoredParty } from '../../../domain/UnstoredParty';
import { useToggle } from '../../../components/Accordion/useToggle';
import { Accordion, AccordionDetails, AccordionSummary } from '@mui/material';
import { FunctionComponent, ReactElement } from 'react';

interface AddPartyAccordionProps {
  onPartySave: (newParty: UnstoredParty) => void;
}

const AddPartyAccordion: FunctionComponent<AddPartyAccordionProps> = ({ onPartySave }): ReactElement => {
  const { toggleState, toggle, setToggleState } = useToggle(false);

  return (
    <Accordion
      sx={
        {
          color: 'orange',
          bgcolor: 'background.default'
        }
      }
      expanded={ toggleState } onChange={ toggle } TransitionProps={{ unmountOnExit: true }}
    >
      <AccordionSummary>
        Neue Party hinzufügen
      </AccordionSummary>
      <AccordionDetails>
        <PartyForm
          onPartySave={ (newParty): void => {
            onPartySave(newParty);
            setToggleState(false);
          } }
        />
      </AccordionDetails>
    </Accordion>
  );
};

export {
  AddPartyAccordion
};
