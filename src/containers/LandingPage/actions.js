// in e2e/pages/home.js
const { By, until } = require('selenium-webdriver');

export const LandingActions = driver => ({
    url: 'http://localhost:3002/',
    elements: {
        landingPage: By.css('.LandingPage')
    },
    async waitUntilVisible() {
        try {
            await driver.wait(until.elementLocated(this.elements.landingPage));
        } catch (e) {
            throw e;
        }
    },
    async navigate() {
        try {
            await driver.navigate().to(this.url);
            await this.waitUntilVisible();
        } catch (e) {
            throw e;
        }
    }
});
