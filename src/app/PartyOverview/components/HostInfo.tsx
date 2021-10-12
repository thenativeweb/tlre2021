import { useText } from '../../texts/useText';
import React, { FunctionComponent, ReactElement } from 'react';

interface HostInfoProps {
  name: string;
  avatarUrl?: string;
}

const HostInfo: FunctionComponent<HostInfoProps> = function ({ name, avatarUrl }): ReactElement {
  const { texts } = useText();

  return (
    <React.Fragment>
      { avatarUrl && <img src={ avatarUrl } width='100px' alt={ texts.hostInfo.avatarAltText(name) } /> }
      <br />
      <span><strong>{name}</strong></span>
    </React.Fragment>
  );
};

export {
  HostInfo
};
