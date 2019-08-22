const helpers = require('./helpers');

require('ts-node/register');

process.env.PROSHOT_DIR = './reports/e2e';

exports.config = {
  allScriptsTimeout: 110000,

  specs: [
    helpers.root('e2e/**/**.e2e.ts'),
    helpers.root('e2e/**/*.e2e.ts')
  ],

  directConnect: true,

  baseUrl: 'http://localhost:3000/',

  framework: 'mocha',

  SELENIUM_PROMISE_MANAGER: false,

  mochaOpts: {
    reporter: 'mocha-multi-reporters',
    "reporterOptions": {
      "reporterEnabled": "mochawesome, mocha-xunit-reporter, mocha-proshot",
      "mochawesomeReporterOptions": {
        "reportDir": "reports/e2e/html",
        "reportFilename": "e2e-report.html"
      },
      "mochaXunitReporterReporterOptions": {
        "mochaFile": "reports/e2e/e2e-xunit-report.xml"
      },
      "inlineAssets": true,
      "reportPageTitle": "E2E Test Reports",
      "reportTitle": "E2E Test Reports"
    },
    slow: 3000,
    ui: 'bdd',
    timeout: 720000
  },

  capabilities: {
    'browserName': 'chrome',
    'chromeOptions': {
      'args': ['ignore-certificate-errors', "--disable-gpu", "--window-size=800,600"]
    }
  },

  onPrepare: function() {
    browser.driver.manage().window().setSize(800,600);
    // Disable animations
    // @ts-ignore
    browser.executeScript('document.body.className += " notransition";');
    const chai = require('chai');
    const chaiAsPromised = require('chai-as-promised');
    chai.use(chaiAsPromised);
    const chaiString = require('chai-string');
    chai.use(chaiString);
    // @ts-ignore
    global.chai = chai;
  },

  useAllAngular2AppRoots: true
};
