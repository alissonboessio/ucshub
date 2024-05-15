declare var require: any;

export const environment = {
  production: false,
  version: require('../../package.json').version + '-dev',
  versionDate: new Date().toLocaleTimeString(),
  api_url: "http://localhost:5000",
};
