import { Guest } from '../../../../domain/Guest';

type AddGuestFormBasicActionType = 'addGuest/SET_NAME' | 'addGuest/SET_COSTUME';

type AddGuestFormAction = {
  type: 'addGuest/INIT_FORM';
  payload: number;
} | {
  type: AddGuestFormBasicActionType;
  payload: { id: number; value: string };
} | { type: 'addGuest/RESET_FORM'; payload: number };

type SingleFormState = Guest;

type AddGuestFormState = Record<number, SingleFormState>;

const createEmptyGuest = (): Guest => ({
  name: '',
  costume: ''
});

const setName = (id: number, name: string): AddGuestFormAction => ({
  type: 'addGuest/SET_NAME',
  payload: { id, value: name }
});

const setCostume = (id: number, costume: string): AddGuestFormAction => ({
  type: 'addGuest/SET_COSTUME',
  payload: { id, value: costume }
});

const resetForm = (id: number): AddGuestFormAction => ({
  type: 'addGuest/RESET_FORM',
  payload: id
});

// eslint-disable-next-line @typescript-eslint/default-param-last
const addGuestFormReducer = (state: AddGuestFormState = {}, action: AddGuestFormAction): AddGuestFormState => {
  switch (action.type) {
    case 'addGuest/SET_NAME': {
      return {
        ...state,
        [action.payload.id]: {
          ...state[action.payload.id],
          name: action.payload.value
        }
      };
    }
    case 'addGuest/SET_COSTUME': {
      return {
        ...state,
        [action.payload.id]: {
          ...state[action.payload.id],
          costume: action.payload.value
        }
      };
    }
    case 'addGuest/RESET_FORM': {
      return {
        ...state,
        [action.payload]: createEmptyGuest()
      };
    }
    case 'addGuest/INIT_FORM': {
      return {
        ...state,
        [action.payload]: createEmptyGuest()
      };
    }

    default:
      return state;
  }
};

export {
  addGuestFormReducer,
  setName,
  setCostume,
  resetForm
};
