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
import { FunctionComponent, ReactElement } from 'react';

interface PartyDetailsProps {
  partyData: Party;
  handleNewGuest: (newGuest: Guest) => void;
}

const PartyDetails: FunctionComponent<PartyDetailsProps> = ({ partyData, handleNewGuest }): ReactElement => (
  <FlexCard>
    <FlexCardRow>
      <FlexCardCol size={ 1 }>
        <Headline>{ partyData.host.name }s Halloween-Party</Headline>
      </FlexCardCol>
    </FlexCardRow>

    <FlexCardRow>
      <FlexCardCol size={ 1 }>
        <SubHeadline>Dein Gastgeber</SubHeadline>
        <HostInfo name={ partyData.host.name } avatarUrl={ partyData.host.avatarUrl } />
      </FlexCardCol>
      <FlexCardCol size={ 2 }>
        <SubHeadline>Alles was du zur Party wissen musst:</SubHeadline>
        <PartyDescription description={ partyData.description } />
      </FlexCardCol>
    </FlexCardRow>

    <FlexCardRow>
      <FlexCardCol size={ 3 }>
        <SubHeadline>Auf diese {partyData.guests.length} Gäste darfst Du dich freuen</SubHeadline>
        <GuestList guests={ partyData.guests } />
        <AddGuestForm onSave={ handleNewGuest } />
      </FlexCardCol>
    </FlexCardRow>
  </FlexCard>
);

export {
  PartyDetails
};
