import * as fs from 'fs';

const COMMON_CONFIG = './config.common.json';
const ENV_CONFIG = `./config.${process.env.NODE_ENV || 'dev'}.json`;

function readConfig(filename) {
  return JSON.parse(fs.readFileSync(filename, 'utf8'));
}

export function rootConfiguration() {
  const config = {
    // override common config by env config
    ...readConfig(COMMON_CONFIG),
    ...readConfig(ENV_CONFIG),
  };

  return config;
}
