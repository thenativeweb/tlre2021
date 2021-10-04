import React, { FunctionComponent, ReactElement } from 'react';

interface PersonCardProps {
  name: string;
  avatarUrl: string;
}

const PersonCard: FunctionComponent<PersonCardProps> = function ({ name, avatarUrl }): ReactElement {
  return (
    <React.Fragment>
      { avatarUrl && <img src={ avatarUrl } width='100px' alt={ `Avatar von ${name}` } /> }
      <span>{name}</span>
    </React.Fragment>
  );
};

export {
  PersonCard
};
