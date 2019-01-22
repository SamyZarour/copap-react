require('geckodriver');
require('selenium-webdriver/chrome');
require('selenium-webdriver/firefox');
const { Builder } = require('selenium-webdriver');
const { SignUpPageTest } = require('./containers/SignUpPage/test.js');
const { SignInPageTest } = require('./containers/SignInPage/test.js');
const { HomePageTest } = require('./containers/HomePage/test.js');

['firefox'].forEach(driverName => {
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;
    const driver = new Builder().forBrowser(driverName).build();
    describe(`When using ${driverName}`, () => {
        SignUpPageTest(driver);
        SignInPageTest(driver);
        HomePageTest(driver);
        afterAll(() => driver.quit());
    });
});
