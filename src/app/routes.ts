import { Party } from '../domain/Party';

const routes = {
  editParty: {
    routerUrl: '/edit/:id',
    createLink: (id: Party['id']): string => `/edit/${id}`
  }
};

export {
  routes
};
