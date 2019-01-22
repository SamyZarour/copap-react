const { By, until } = require('selenium-webdriver');

export const HomeActions = driver => ({
    url: 'http://localhost:3002/',
    elements: {
        welcome: By.xpath('.//span[contains(text(), \'Welcome\')]')
    },
    async waitUntilVisible() {
        try {
            await driver.wait(until.elementLocated(this.elements.welcome));
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
