import { ApiContext } from '../PartyApi/ApiContext';
import { createInMemoryPartyApi } from '../PartyApi/InMemoryPartyApi';
import { createTestHost } from '../../../domain/createTestHost';
import { createTestParty } from '../../../domain/createTestParty';
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
    const wrapper = createWrapper(
      createInMemoryPartyApi({ initialState: [ testParty ]})
    );
    const { result, waitForNextUpdate } = renderHook((): PartyApiHook => usePartyApi(), { wrapper });

    await waitForNextUpdate();

    expect(result.current.parties).toEqual([ testParty ]);
  });

  it('has apiState to "loading" until initial arties were fetched.', async (): Promise<void> => {
    const wrapper = createWrapper(createInMemoryPartyApi({}));
    const { result, waitForNextUpdate } = renderHook((): PartyApiHook => usePartyApi(), { wrapper });

    const expectedApiState: ApiStatus = 'loading';

    expect(result.current.status).toEqual(expectedApiState);

    // Cleanly wait for the useEffect hook to finish to avoid errors in tests
    await waitForNextUpdate();
  });

  it('sets the apiState to "success" once the api returned.', async (): Promise<void> => {
    const testParty = createTestParty();
    const wrapper = createWrapper(
      createInMemoryPartyApi({ initialState: [ testParty ]})
    );
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

    const wrapper = createWrapper(createInMemoryPartyApi({}));

    const { result, waitForNextUpdate } = renderHook((): PartyApiHook => usePartyApi(), { wrapper });

    await waitForNextUpdate();

    act((): void => {
      result.current.addParty(addedParty);
    });

    await waitForNextUpdate();

    const expectedParty = createTestParty({
      ...addedParty,
      guests: []
    });

    expect(result.current.parties).toHaveLength(1);
    expect(result.current.parties).toEqual([ expectedParty ]);
  });

  it('on updateParty, sets the new values in the parties-arry when the api returns.', async (): Promise<void> => {
    const initialParty = createTestParty();
    const updatedParty = {
      ...initialParty,
      description: 'New Description'
    };
    const wrapper = createWrapper(createInMemoryPartyApi({ initialState: [ initialParty ]}));

    const { result, waitForNextUpdate } = renderHook((): PartyApiHook => usePartyApi(), { wrapper });

    await waitForNextUpdate();

    act((): void => {
      result.current.updateParty(updatedParty);
    });

    await waitForNextUpdate();

    expect(result.current.parties).toEqual([ updatedParty ]);
  });

  it('on error during initial fetch, sets the error and apiState to error.', async (): Promise<void> => {
    const error = new Error('ApiError');
    const wrapper = createWrapper(createInMemoryPartyApi({ overwrites: {
      async fetchAllParties (): Promise<Party[]> {
        throw error;
      }
    }}));
    const { result, waitForNextUpdate } = renderHook((): PartyApiHook => usePartyApi(), { wrapper });

    await waitForNextUpdate();

    const expectedApiState: ApiStatus = 'error';

    expect(result.current.status).toEqual(expectedApiState);
    expect(result.current.error).toEqual(error);
  });

  it('on error during addParty, sets the error and apiState to error.', async (): Promise<void> => {
    const error = new Error('ApiError');
    const wrapper = createWrapper(
      createInMemoryPartyApi({ overwrites: {
        async addNewParty (): Promise<Party> {
          throw error;
        }
      }})
    );
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
    const wrapper = createWrapper(createInMemoryPartyApi({ overwrites: {
      async updateParty (): Promise<Party> {
        throw error;
      }
    }}));
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
