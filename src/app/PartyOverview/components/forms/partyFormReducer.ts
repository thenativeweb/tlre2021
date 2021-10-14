import { UnstoredParty } from '../../../../domain/UnstoredParty';

type PartyFormActionTypes = 'SET_DESCRIPTION' | 'SET_HOST_NAME' | 'SET_AVATAR' ;

type PartyFormAction = {
  type: PartyFormActionTypes;
  body: string;
} | { type: 'RESET_FORM' };

type PartyFormState = UnstoredParty;

const initialState: PartyFormState = {
  description: '',
  host: {
    name: ''
  }
};

const partyFormReducer = (state: PartyFormState, action: PartyFormAction): PartyFormState => {
  switch (action.type) {
    case 'SET_DESCRIPTION':
      return {
        ...state,
        description: action.body
      };
    case 'SET_HOST_NAME':
      return {
        ...state,
        host: {
          ...state.host,
          name: action.body
        }
      };
    case 'SET_AVATAR':
      return {
        ...state,
        host: {
          ...state.host,
          avatarUrl: action.body
        }
      };
    case 'RESET_FORM':
      return initialState;
    default:
      return state;
  }
};

export {
  partyFormReducer,
  initialState
};

export type {
  PartyFormState
};
