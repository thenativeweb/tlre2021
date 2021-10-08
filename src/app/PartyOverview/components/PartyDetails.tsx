import { AddGuestForm } from './forms/AddGuestForm';
import { FlexCard } from '../../../layout/FlexCard/FlexCard';
import { FlexCardCol } from '../../../layout/FlexCard/FlexCardCol';
import { FlexCardRow } from '../../../layout/FlexCard/FlexCardRow';
import { Guest } from '../../../domain/Guest';
import { GuestList } from './GuestList';
import { Headline } from '../../../components/Headline';
import { HostInfo } from './HostInfo';
import { Party } from '../../../domain/Party';
import { PartyDescription } from './PartyDescription';
import { SubHeadline } from '../../../components/SubHeadline';
import { TextContext } from '../../texts/TextContext';
import { FunctionComponent, ReactElement, useContext } from 'react';

interface PartyDetailsProps {
  partyData: Party;
  handleNewGuest: (newGuest: Guest) => void;
}

const PartyDetails: FunctionComponent<PartyDetailsProps> = ({ partyData, handleNewGuest }): ReactElement => {
  const texts = useContext(TextContext);

  return (
    <FlexCard>
      <FlexCardRow>
        <FlexCardCol size={ 1 }>
          <Headline>{texts.partyDetails.title(partyData.host.name)}</Headline>
        </FlexCardCol>
      </FlexCardRow>

      <FlexCardRow>
        <FlexCardCol size={ 1 }>
          <SubHeadline>{texts.partyDetails.hostTitle}</SubHeadline>
          <HostInfo name={ partyData.host.name } avatarUrl={ partyData.host.avatarUrl } />
        </FlexCardCol>
        <FlexCardCol size={ 2 }>
          <SubHeadline>{texts.partyDetails.descriptionTitle}</SubHeadline>
          <PartyDescription description={ partyData.description } />
        </FlexCardCol>
      </FlexCardRow>

      <FlexCardRow>
        <FlexCardCol size={ 3 }>
          <SubHeadline>{texts.partyDetails.guestHeadline(partyData.guests.length)}</SubHeadline>
          <GuestList guests={ partyData.guests } />
          <AddGuestForm onSave={ handleNewGuest } />
        </FlexCardCol>
      </FlexCardRow>
    </FlexCard>
  );
};

export {
  PartyDetails
};
