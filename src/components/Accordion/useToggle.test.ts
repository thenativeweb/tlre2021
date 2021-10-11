import { act, renderHook } from '@testing-library/react-hooks';
import { UseToggle, useToggle } from './useToggle';

describe('useToggle', (): void => {
  it('sets toggleState to false as default initial state.', async (): Promise<void> => {
    const { result } = renderHook((): UseToggle => useToggle());

    expect(result.current.toggleState).toBe(false);
  });

  it('sets toggleState to true if initial value is true.', async (): Promise<void> => {
    const { result } = renderHook((): UseToggle => useToggle(true));

    expect(result.current.toggleState).toBe(true);
  });

  it('calling toggle() toggles the value to true when it was false.', async (): Promise<void> => {
    const { result } = renderHook((): UseToggle => useToggle(false));

    act((): void => result.current.toggle());

    expect(result.current.toggleState).toBe(true);
  });

  it('calling toggle() toggles the value to false when it was true.', async (): Promise<void> => {
    const { result } = renderHook((): UseToggle => useToggle(true));

    act((): void => result.current.toggle());

    expect(result.current.toggleState).toBe(false);
  });

  it('sets the value to false when explicitly set to false.', async (): Promise<void> => {
    const { result } = renderHook((): UseToggle => useToggle(true));

    act((): void => result.current.setToggleState(false));

    expect(result.current.toggleState).toBe(false);
  });
});
