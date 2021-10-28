import { createFetchPartyApi } from './FetchPartyApi';
import { getConfig } from '../../../getConfig';
import { PartyApi } from './PartyApi';
import React from 'react';

const defaultApi = createFetchPartyApi(getConfig().apiHost);
const ApiContext: React.Context<PartyApi> = React.createContext(defaultApi);

export {
  ApiContext
};
