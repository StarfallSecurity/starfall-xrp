const envs = {
  LOCAL: 'LOCAL',
  PRODUCTION: 'PRODUCTION'
};

export const currentEnv = 'PRODUCTION';

export const localUrl = 'http://localhost:8000/';
export const productionUrl = 'https://starfall-backend.herokuapp.com/';

export const TOKEN_KEY = 'token';

export const SUPPORT_EMAIL = 'support@starfall.ai';

export const getUrl = () => {
  if (currentEnv === envs.LOCAL) {
    return localUrl;
  }
  if (currentEnv === envs.PRODUCTION) {
    return productionUrl;
  }
};

export const envUrl = getUrl();
