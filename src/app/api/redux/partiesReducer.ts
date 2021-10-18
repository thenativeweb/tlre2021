import { Party } from '../../../domain/Party';

interface PartyState {
  parties: Party[];
  status: 'loading' | 'error' | 'success';
  error?: Error;
}

type PartyAction =
{ type: 'parties/SET_PARTIES'; payload: Party[] }
| { type: 'parties/LOADING' }
| { type: 'parties/ERROR'; payload: Error };

const setParties = (parties: Party[]): PartyAction => ({
  type: 'parties/SET_PARTIES',
  payload: parties
});

const loadingParties = (): PartyAction => ({
  type: 'parties/LOADING'
});

const setError = (error: Error): PartyAction => ({
  type: 'parties/ERROR',
  payload: error
});

const initialState: PartyState = {
  parties: [],
  status: 'loading'
};

// eslint-disable-next-line @typescript-eslint/default-param-last
const partiesReducer = (state: PartyState = initialState, action: PartyAction): PartyState => {
  switch (action.type) {
    case 'parties/LOADING': {
      return {
        ...state,
        status: 'loading'
      };
    }
    case 'parties/SET_PARTIES': {
      return {
        ...state,
        status: 'success',
        parties: action.payload,
        error: undefined
      };
    }
    case 'parties/ERROR': {
      return {
        ...state,
        status: 'error',
        error: action.payload
      };
    }
    default:
      return state;
  }
};

export {
  partiesReducer,
  setError,
  loadingParties,
  setParties
};

export type {
  PartyState,
  PartyAction
};
