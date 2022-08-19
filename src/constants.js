
const envs = {
  LOCAL: "LOCAL",
  PRODUCTION: "PRODUCTION"
};

export const currentEnv = "LOCAL";

export const localUrl = "http://localhost:8000/"
export const productionUrl = "http://starfall-backend.herokuapp.com/"


export const getUrl = () => {
  if (currentEnv === envs.LOCAL) {
    return localUrl;
  }
  if (currentEnv === envs.PRODUCTION) {
    return productionUrl;
  }
};

export const envUrl = getUrl();