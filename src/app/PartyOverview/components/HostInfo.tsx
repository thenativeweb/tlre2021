import { useTranslation } from 'react-i18next';
import React, { FunctionComponent, ReactElement } from 'react';

interface HostInfoProps {
  name: string;
  avatarUrl?: string;
}

const HostInfo: FunctionComponent<HostInfoProps> = function ({ name, avatarUrl }): ReactElement {
  const { t } = useTranslation();

  return (
    <React.Fragment>
      { avatarUrl && <img src={ avatarUrl } width='100px' alt={ t('hostInfo.avatarAltText', { name }) } /> }
      <br />
      <span><strong>{name}</strong></span>
    </React.Fragment>
  );
};

export {
  HostInfo
};
