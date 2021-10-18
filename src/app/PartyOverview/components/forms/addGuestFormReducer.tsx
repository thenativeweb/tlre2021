import { Guest } from '../../../../domain/Guest';

type AddGuestFormBasicActionType = 'addGuest/SET_NAME' | 'addGuest/SET_COSTUME';

type AddGuestFormAction = {
  type: AddGuestFormBasicActionType;
  payload: string;
} | { type: 'addGuest/RESET_FORM' };

type AddGuestFormState = Guest;

const createEmptyGuest = (): Guest => ({
  name: '',
  costume: ''
});

const setName = (name: string): AddGuestFormAction => ({
  type: 'addGuest/SET_NAME',
  payload: name
});

const setCostume = (costume: string): AddGuestFormAction => ({
  type: 'addGuest/SET_COSTUME',
  payload: costume
});

const resetForm = (): AddGuestFormAction => ({
  type: 'addGuest/RESET_FORM'
});

// eslint-disable-next-line @typescript-eslint/default-param-last
const addGuestFormReducer = (state: AddGuestFormState = createEmptyGuest(), action: AddGuestFormAction): AddGuestFormState => {
  switch (action.type) {
    case 'addGuest/SET_NAME': {
      return {
        ...state,
        name: action.payload
      };
    }
    case 'addGuest/SET_COSTUME': {
      return {
        ...state,
        costume: action.payload
      };
    }
    case 'addGuest/RESET_FORM': {
      return createEmptyGuest();
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
