import { ApiContext } from '../PartyApi/ApiContext';
import { loadParties } from './partiesThunk';
import { PartyApi } from '../PartyApi/PartyApi';
import { PartyState } from './partiesReducer';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { useContext, useEffect } from 'react';

const useReduxFetchParties = (): PartyState => {
  const partyApi: PartyApi = useContext(ApiContext);
  const dispatch = useAppDispatch();
  const partyState = useAppSelector((rootState): PartyState => rootState.parties);

  useEffect((): void => {
    // @ts-expect-error this is allowed - but not correctly inferred
    dispatch(loadParties(partyApi));
  }, [ dispatch, partyApi ]);

  return partyState;
};

export {
  useReduxFetchParties
};
