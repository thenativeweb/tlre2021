import { ApiContext } from '../PartyApi/ApiContext';
import { createTestHost } from '../../../domain/createTestHost';
import { createTestParty } from '../../../domain/createTestParty';
import { createTestPartyApi } from '../PartyApi/TestPartyApi';
import { Party } from '../../../domain/Party';
import { PartyApi } from '../PartyApi/PartyApi';
import { UnstoredParty } from '../../../domain/UnstoredParty';
import { act, renderHook } from '@testing-library/react-hooks';
import { ApiStatus, PartyApiHook, usePartyApi } from './usePartyApi';
import { FunctionComponent, ReactElement } from 'react';

const createWrapper = (testApi: PartyApi): FunctionComponent => ({ children }): ReactElement => (<ApiContext.Provider value={ testApi }>{children}</ApiContext.Provider>);

describe('usePartyApi', (): void => {
  it('initially fetches all parties from the PartyApi and adds them as party.', async (): Promise<void> => {
    const testParty = createTestParty();
    const wrapper = createWrapper(createTestPartyApi({
      fetchAllParties: async (): Promise<Party[]> => Promise.resolve([ testParty ])
    }));
    const { result, waitForNextUpdate } = renderHook((): PartyApiHook => usePartyApi(), { wrapper });

    await waitForNextUpdate();

    expect(result.current.parties).toEqual([ testParty ]);
  });

  it('has apiState to "loading" until initial arties were fetched.', async (): Promise<void> => {
    const wrapper = createWrapper(createTestPartyApi({
      fetchAllParties: async (): Promise<Party[]> => Promise.resolve([])
    }));
    const { result, waitForNextUpdate } = renderHook((): PartyApiHook => usePartyApi(), { wrapper });

    const expectedApiState: ApiStatus = 'loading';

    expect(result.current.status).toEqual(expectedApiState);

    // Cleanly wait for the useEffect hook to finish to avoid errors in tests
    await waitForNextUpdate();
  });

  it('sets the apiState to "success" once the api returned.', async (): Promise<void> => {
    const testParty = createTestParty();
    const wrapper = createWrapper(createTestPartyApi({
      fetchAllParties: async (): Promise<Party[]> => Promise.resolve([ testParty ])
    }));
    const { result, waitForNextUpdate } = renderHook((): PartyApiHook => usePartyApi(), { wrapper });

    await waitForNextUpdate();

    const expectedApiState: ApiStatus = 'success';

    expect(result.current.status).toEqual(expectedApiState);
  });

  it('on addParty, updates the parties with the new party as soon as the api returns.', async (): Promise<void> => {
    const addedParty: UnstoredParty = {
      description: 'New Description',
      host: createTestHost()
    };
    const returnedParty = createTestParty();
    const addPartySpy = jest.fn().mockResolvedValue(returnedParty);

    const wrapper = createWrapper(createTestPartyApi({
      fetchAllParties: async (): Promise<Party[]> => Promise.resolve([ ]),
      addNewParty: addPartySpy
    }));

    const { result, waitForNextUpdate } = renderHook((): PartyApiHook => usePartyApi(), { wrapper });

    await waitForNextUpdate();

    act((): void => {
      result.current.addParty(addedParty);
    });

    expect(addPartySpy).toHaveBeenCalledWith(addedParty);

    await waitForNextUpdate();

    expect(result.current.parties).toHaveLength(1);
    expect(result.current.parties).toEqual([ returnedParty ]);
  });

  it('on updateParty, sets the new values in the parties-arry when the api returns.', async (): Promise<void> => {
    const initialParty = createTestParty();
    const updatedParty = {
      ...initialParty,
      description: 'New Description'
    };
    const updatePartySpy = jest.fn().mockResolvedValue(updatedParty);
    const wrapper = createWrapper(createTestPartyApi({
      fetchAllParties: async (): Promise<Party[]> => Promise.resolve([ initialParty ]),
      updateParty: updatePartySpy
    }));

    const { result, waitForNextUpdate } = renderHook((): PartyApiHook => usePartyApi(), { wrapper });

    await waitForNextUpdate();

    act((): void => {
      result.current.updateParty(updatedParty);
    });
    expect(updatePartySpy).toHaveBeenCalledWith(updatedParty);

    await waitForNextUpdate();

    expect(result.current.parties).toEqual([ updatedParty ]);
  });

  it('on error during initial fetch, sets the error and apiState to error.', async (): Promise<void> => {
    const error = new Error('ApiError');
    const wrapper = createWrapper(createTestPartyApi({
      async fetchAllParties (): Promise<Party[]> {
        throw error;
      }
    }));
    const { result, waitForNextUpdate } = renderHook((): PartyApiHook => usePartyApi(), { wrapper });

    await waitForNextUpdate();

    const expectedApiState: ApiStatus = 'error';

    expect(result.current.status).toEqual(expectedApiState);
    expect(result.current.error).toEqual(error);
  });

  it('on error during addParty, sets the error and apiState to error.', async (): Promise<void> => {
    const error = new Error('ApiError');
    const wrapper = createWrapper(createTestPartyApi({
      async addNewParty (): Promise<Party> {
        throw error;
      }
    }));
    const { result, waitForNextUpdate } = renderHook((): PartyApiHook => usePartyApi(), { wrapper });

    await waitForNextUpdate();

    act((): void => {
      result.current.addParty({ description: 'test', host: createTestHost() });
    });

    await waitForNextUpdate();

    const expectedApiState: ApiStatus = 'error';

    expect(result.current.status).toEqual(expectedApiState);
    expect(result.current.error).toEqual(error);
  });

  it('on error during updatedParty, sets the error and apiState to error.', async (): Promise<void> => {
    const error = new Error('ApiError');
    const wrapper = createWrapper(createTestPartyApi({
      async updateParty (): Promise<Party> {
        throw error;
      }
    }));
    const { result, waitForNextUpdate } = renderHook((): PartyApiHook => usePartyApi(), { wrapper });

    await waitForNextUpdate();

    act((): void => {
      result.current.updateParty(createTestParty());
    });

    await waitForNextUpdate();

    const expectedApiState: ApiStatus = 'error';

    expect(result.current.status).toEqual(expectedApiState);
    expect(result.current.error).toEqual(error);
  });
});
