import { Party } from '../../../domain/Party';
import { PartyApi } from '../PartyApi/PartyApi';
import { RootState } from '../../redux/store';
import { ThunkAction } from 'redux-thunk';
import { loadingParties, PartyAction, setError, setParties } from './partiesReducer';

const loadParties = (api: PartyApi): ThunkAction<void, RootState, void, PartyAction> => (dispatch): void => {
  dispatch(loadingParties());
  api.
    fetchAllParties().
    then((parties: Party[]): void => {
      dispatch(setParties(parties));
    }).
    catch((ex): void => {
      dispatch(setError(ex));
    });
};

export {
  loadParties
};
