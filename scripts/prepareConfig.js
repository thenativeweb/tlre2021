/* eslint-disable no-console */
'use strict';

const path = require('path');
const fs = require('fs');

// eslint-disable-next-line no-process-env
const env = process.env.CONFIG_ENV ?? 'dev';
const sourceConfigJSBasePath = path.join(__dirname, '..', 'config');
const targetConfigJSPath = path.join(__dirname, '..', 'public', 'config', 'config.js');

const prepareConfig = async () => {
  const sourcePath = path.join(sourceConfigJSBasePath, `config.${env}.js`);

  await fs.promises.copyFile(sourcePath, targetConfigJSPath);
};

prepareConfig().
  then(() => {
    console.log(`[prepareConfig.js] Succesfully injected config for ${env}.`);
  }).catch(ex => {
    console.error(`[prepareConfig.js] Error while preparing config.js for env ${env}:`, ex);
  });

/* eslint-enable no-console */