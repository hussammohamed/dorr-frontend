/* jshint node: true */

module.exports = function(environment) {
  var ENV = {
    modulePrefix: 'dorr',
    environment: environment,
    baseURL: '/',
    locationType: 'auto',
    EmberENV: {
      FEATURES: {
        // Here you can enable experimental features on an ember canary build
        // e.g. 'with-controller': true
      }
    },
    sassOptions: {
      includePaths: ['bower_components/material-design-lite/src']
    },
    APP: {
      // Here you can pass flags/options to your application instance
      // when it is created
    }
  };

  if (environment === 'development') {
    // ENV.APP.LOG_RESOLVER = true;
    // ENV.APP.LOG_ACTIVE_GENERATION = true;
    // ENV.APP.LOG_TRANSITIONS = true;
    // ENV.APP.LOG_TRANSITIONS_INTERNAL = true;
    // ENV.APP.LOG_VIEW_LOOKUPS = true;
    ENV.domainUrl = "http://localhost:4200"
    ENV.host = "http://localhost:8000/api/v1"
    ENV.hostOuth = "http://localhost:8000/api"
    ENV.mainUrl = "http://localhost:8000"
  }

  if (environment === 'test') {
    // Testem prefers this...
    ENV.baseURL = '/';
    ENV.locationType = 'none';

    // keep test console output quieter
    ENV.APP.LOG_ACTIVE_GENERATION = false;
    ENV.APP.LOG_VIEW_LOOKUPS = false;

    ENV.APP.rootElement = '#ember-testing';
  }

  if (environment === 'production') {
    ENV.domainUrl = "pm.bareeqstudio.com"
    ENV.host = "http://dorr.bareeqstudio.com/api/v1"
    ENV.hostOuth = "http://dorr.bareeqstudio.com/api"
    ENV.mainUrl = "http://dorr.bareeqstudio.com";

  }

  return ENV;
};
