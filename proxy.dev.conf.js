const PROXY_CONFIG = [
  {
    context: ['**/api/**'],
    target: {
      host: 'development.testserver.adesso.local',
      protocol: 'http:',
      port: 1234,
    },
    secure: false,
    logLevel: 'debug',
  },
];

module.exports = PROXY_CONFIG;
