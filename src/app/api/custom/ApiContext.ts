import { createFetchPartyApi } from './FetchPartyApi';
import { PartyApi } from './PartyApi';
import React from 'react';

const defaultApi = createFetchPartyApi();
const ApiContext: React.Context<PartyApi> = React.createContext(defaultApi);

export {
  ApiContext
};
