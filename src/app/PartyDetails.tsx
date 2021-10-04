import { Col } from '../layout/Col';
import { GuestList } from '../components/party/GuestList';
import { Headline } from '../components/base/Headline';
import { PageLayout } from '../layout/PageLayout';
import { Party } from '../domain/Party';
import { PartyDescription } from '../components/party/PartyDescription';
import { PersonCard } from '../components/party/PersonCard';
import { Row } from '../layout/Row';
import { SubHeadline } from '../components/base/SubHeadline';
import { FunctionComponent, ReactElement } from 'react';

interface PartyDetailsProps {
  partyData: Party;
}

const PartyDetails: FunctionComponent<PartyDetailsProps> = ({ partyData }): ReactElement => (
  <PageLayout>
    <Row>
      <Col size={ 1 }>
        <Headline>{ partyData.host.name }s Halloween-Party</Headline>
      </Col>
    </Row>

    <Row>
      <Col size={ 1 }>
        <SubHeadline>Dein Gastgeber</SubHeadline>
        <PersonCard name={ partyData.host.name } avatarUrl={ partyData.host.avatarUrl } />
      </Col>
      <Col size={ 2 }>
        <SubHeadline>Alles was du zur Party wissen musst:</SubHeadline>
        <PartyDescription description={ partyData.description } />
      </Col>
    </Row>

    <Row>
      <Col size={ 3 }>
        <SubHeadline>Auf diese Gäste darfst Du dich freuen</SubHeadline>
        <GuestList guests={ partyData.guests } />
      </Col>
    </Row>
  </PageLayout>
);

export {
  PartyDetails
};
