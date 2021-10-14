import { useState } from 'react';

interface UseToggle {
  toggleState: boolean;
  toggle: () => void;
  setToggleState: (givenToggleState: boolean) => void;
}

const useToggle = (initialState = false): UseToggle => {
  const [ toggleState, setToggleState ] = useState<boolean>(initialState);

  return {
    toggleState,
    toggle: (): void => setToggleState((currentState): boolean => !currentState),
    setToggleState: (givenToggleState: boolean): void => setToggleState(givenToggleState)
  };
};

export {
  useToggle
};

export type {
  UseToggle
};
