import React, { FunctionComponent, ReactElement } from 'react';

interface HostInfoProps {
  name: string;
  avatarUrl?: string;
}

const HostInfo: FunctionComponent<HostInfoProps> = function ({ name, avatarUrl }): ReactElement {
  return (
    <React.Fragment>
      { avatarUrl && <img src={ avatarUrl } width='100px' alt={ `Avatar von ${name}` } /> }
      <br />
      <span><strong>{name}</strong></span>
    </React.Fragment>
  );
};

export {
  HostInfo
};
