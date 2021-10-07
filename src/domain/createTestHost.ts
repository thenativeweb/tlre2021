import { Host } from './Host';

const defaultHost: Host = {
  avatarUrl: 'test/path',
  name: 'Kim'
};

const createTestHost = (overwrites: Partial<Host> = {}): Host => ({
  ...defaultHost,
  ...overwrites
});

export {
  createTestHost
};
