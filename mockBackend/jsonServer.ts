import jsonServer from 'json-server';
import { mockParties } from './mockParties';

const server = jsonServer.create();
const router = jsonServer.router({ parties: mockParties });
const middlewares = jsonServer.defaults();

// Set default middlewares (logger, static, cors and no-cache)
server.use(middlewares);

// To handle POST, PUT and PATCH you need to use a body-parser
// You can use the one used by JSON Server
server.use(jsonServer.bodyParser);
server.use((req, res, next): void => {
  if (req.method === 'POST') {
    // eslint-disable-next-line no-param-reassign
    req.body.id = mockParties.length + 1;
  }

  // Continue to JSON Server router
  next();
});

// Use default router
server.use(router);
server.listen(3_001, (): void => {
  // eslint-disable-next-line no-console
  console.log('JSON Server is running on Port 3001');
});
