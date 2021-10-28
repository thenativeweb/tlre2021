import { HppConfig } from './types/hppWindow';

const getConfig = (): HppConfig => {
  if (!window.hppConfig) {
  // eslint-disable-next-line no-console
    console.error('Could not find HPPConfig from config.js - ensure it is loaded.');
    throw new Error('Could not load application-configuration.');
  }

  return window.hppConfig;
};

export {
  getConfig
};
