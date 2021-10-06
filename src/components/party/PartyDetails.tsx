import { AddGuestForm } from './AddGuestForm';
import { Col } from '../../layout/Col';
import { Guest } from '../../domain/Guest';
import { GuestList } from './GuestList';
import { Headline } from '../base/Headline';
import { HostInfo } from './HostInfo';
import { Party } from '../../domain/Party';
import { PartyDescription } from './PartyDescription';
import { Row } from '../../layout/Row';
import styled from 'styled-components';
import { SubHeadline } from '../base/SubHeadline';
import { FunctionComponent, ReactElement } from 'react';

const StyledDiv = styled.div`
  background-color: ${(props): any => props.theme.colors.background};
`;

interface PartyDetailsProps {
  partyData: Party;
  handleNewGuest: (newGuest: Guest) => void;
}

const PartyDetails: FunctionComponent<PartyDetailsProps> = ({ partyData, handleNewGuest }): ReactElement => (
  <StyledDiv>
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
  </StyledDiv>
);

export {
  PartyDetails
};
