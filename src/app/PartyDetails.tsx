import { AddGuestForm } from '../components/party/AddGuestForm';
import { Col } from '../layout/Col';
import { Guest } from '../domain/Guest';
import { GuestList } from '../components/party/GuestList';
import { Headline } from '../components/base/Headline';
import { HostInfo } from '../components/party/HostInfo';
import { PageLayout } from '../layout/PageLayout';
import { Party } from '../domain/Party';
import { PartyDescription } from '../components/party/PartyDescription';
import { Row } from '../layout/Row';
import { SubHeadline } from '../components/base/SubHeadline';
import { FunctionComponent, ReactElement } from 'react';

interface PartyDetailsProps {
  partyData: Party;
  handleNewGuest: (newGuest: Guest) => void;
}

const PartyDetails: FunctionComponent<PartyDetailsProps> = ({ partyData, handleNewGuest }): ReactElement => (
  <PageLayout>
    <Row>
      <Col size={ 1 }>
        <Headline>{ partyData.host.name }s Halloween-Party</Headline>
      </Col>
    </Row>

    <Row>
      <Col size={ 1 }>
        <SubHeadline>Dein Gastgeber</SubHeadline>
        <HostInfo name={ partyData.host.name } avatarUrl={ partyData.host.avatarUrl } />
      </Col>
      <Col size={ 2 }>
        <SubHeadline>Alles was du zur Party wissen musst:</SubHeadline>
        <PartyDescription description={ partyData.description } />
      </Col>
    </Row>

    <Row>
      <Col size={ 3 }>
        <SubHeadline>Auf diese {partyData.guests.length} Gäste darfst Du dich freuen</SubHeadline>
        <GuestList guests={ partyData.guests } />
        <AddGuestForm onSave={ handleNewGuest } />
      </Col>
    </Row>
  </PageLayout>
);

export {
  PartyDetails
};
