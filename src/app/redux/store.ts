import { addGuestFormReducer } from '../PartyOverview/components/forms/addGuestFormReducer';
import { partiesReducer } from '../api/redux/partiesReducer';
import { partyFormReducer } from '../PartyOverview/components/forms/partyFormReducer';
import thunk from 'redux-thunk';
import { applyMiddleware, combineReducers, createStore } from 'redux';

const combinedReducer = combineReducers({
  partyForm: partyFormReducer,
  addGuestForm: addGuestFormReducer,
  parties: partiesReducer
});

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const createAppStore = () => createStore(
  combinedReducer,
  applyMiddleware(thunk)
);

// Infer the `RootState` and `AppDispatch` types from the store itself
type StoreType = ReturnType<typeof createAppStore>;
type RootState = ReturnType<StoreType['getState']>;
type AppDispatch = StoreType['dispatch'];

export {
  createAppStore
};

export type {
  AppDispatch,
  RootState
};
