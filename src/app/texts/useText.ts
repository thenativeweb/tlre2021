import { defaultTextContext } from './defaultTextContent';
import { TextContext } from './TextContext';
import { useContext } from 'react';

interface UseTextHook {
  texts: typeof defaultTextContext;
}

const useText = (): UseTextHook => {
  const texts = useContext(TextContext);

  return {
    texts
  };
};

export {
  useText
};
