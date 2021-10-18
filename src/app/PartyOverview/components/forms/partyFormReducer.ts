import { Party } from '../../../../domain/Party';
import { UnstoredParty } from '../../../../domain/UnstoredParty';

type PartyFormActionTypes = 'partyForm/SET_DESCRIPTION' | 'partyForm/SET_HOST_NAME' | 'partyForm/SET_AVATAR' ;

type PartyFormAction = {
  type: PartyFormActionTypes;
  payload: string;
} | { type: 'partyForm/RESET_FORM' } | { type: 'partyForm/PREFILL_FORM'; payload: Party };

type PartyFormState = UnstoredParty;

const initialState: PartyFormState = {
  description: '',
  host: {
    name: ''
  }
};

const prefillForm = (party: Party): PartyFormAction => ({
  type: 'partyForm/PREFILL_FORM',
  payload: party
});

const setDescription = (description: string): PartyFormAction => ({
  type: 'partyForm/SET_DESCRIPTION',
  payload: description
});

const setHostName = (hostName: string): PartyFormAction => ({
  type: 'partyForm/SET_HOST_NAME',
  payload: hostName
});

const setAvatar = (avatarUrl: string): PartyFormAction => ({
  type: 'partyForm/SET_AVATAR',
  payload: avatarUrl
});

const resetForm = (): PartyFormAction => ({
  type: 'partyForm/RESET_FORM'
});

// eslint-disable-next-line @typescript-eslint/default-param-last
const partyFormReducer = (state: PartyFormState = initialState, action: PartyFormAction): PartyFormState => {
  switch (action.type) {
    case 'partyForm/PREFILL_FORM':
      return {
        ...state,
        ...action.payload
      };
    case 'partyForm/SET_DESCRIPTION':
      return {
        ...state,
        description: action.payload
      };
    case 'partyForm/SET_HOST_NAME':
      return {
        ...state,
        host: {
          ...state.host,
          name: action.payload
        }
      };
    case 'partyForm/SET_AVATAR':
      return {
        ...state,
        host: {
          ...state.host,
          avatarUrl: action.payload
        }
      };
    case 'partyForm/RESET_FORM':
      return initialState;
    default:
      return state;
  }
};

export {
  partyFormReducer,
  initialState,
  resetForm,
  setAvatar,
  setDescription,
  setHostName,
  prefillForm
};

export type {
  PartyFormState,
  PartyFormAction
};
