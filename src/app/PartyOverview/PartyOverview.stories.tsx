import { ApiContext } from '../api/PartyApi/ApiContext';
import { createInMemoryPartyApi } from '../api/PartyApi/InMemoryPartyApi';
import { createTestHost } from '../../domain/createTestHost';
import { createTestParty } from '../../domain/createTestParty';
import { noop } from 'lodash';
import { PageLayout } from '../../layout/PageLayout';
import { Party } from '../../domain/Party';
import { PartyApi } from '../api/PartyApi/PartyApi';
import { PartyOverview } from './PartyOverview';
import { ReactElement } from 'react';
import { ComponentMeta, Story } from '@storybook/react';
import { QueryClient, QueryClientProvider } from 'react-query';

export default {
  title: 'app/PartyOverview',
  component: PartyOverview
} as ComponentMeta<typeof PartyOverview>;

type ApiStatus = 'loading' | 'error' | 'success';
interface PartyOverviewArgs {
  apiStatus: ApiStatus;
}

const getApiFor = (apiStatus: ApiStatus): PartyApi => {
  if (apiStatus === 'error') {
    return createInMemoryPartyApi({
      overwrites: {
        async fetchAllParties (): Promise<Party[]> {
          throw new Error('HTTPError');
        }
      }
    });
  }

  if (apiStatus === 'loading') {
    return createInMemoryPartyApi({
      overwrites: {
        fetchAllParties: async (): Promise<Party[]> => new Promise(noop)
      }
    });
  }

  return createInMemoryPartyApi({
    initialState: [
      createTestParty({ id: 1 }),
      createTestParty({ id: 2, host: createTestHost({ name: 'Alex' }) })
    ]
  });
};

const queryClient = new QueryClient({
  defaultOptions: {
    queries: { retry: false },
    mutations: { retry: false }
  }
});

const Template = ({ apiStatus }: PartyOverviewArgs): ReactElement => {
  const apiClient = getApiFor(apiStatus);

  queryClient.getQueryCache().clear();
  queryClient.getMutationCache().clear();

  return (
    <PageLayout title='Test Layout'>
      <QueryClientProvider client={ queryClient }>
        <ApiContext.Provider value={ apiClient }>
          <PartyOverview />
        </ApiContext.Provider>
      </QueryClientProvider>
    </PageLayout>
  );
};

export const PartyOverviewPage: Story<PartyOverviewArgs> = Template.bind({});

PartyOverviewPage.args = {
  apiStatus: 'success'
};

PartyOverviewPage.argTypes = {
  apiStatus: {
    name: 'Api Status',
    control: 'select',
    options: [ 'success', 'loading', 'error' ]
  }
};
