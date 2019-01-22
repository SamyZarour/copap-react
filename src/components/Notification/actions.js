// in e2e/pages/home.js
const { By, until } = require('selenium-webdriver');

export const NotificationActions = driver => ({
    elements: {
        notification: By.css('.notification')
    },
    async waitUntilVisible() {
        try {
            await driver.wait(until.elementLocated(this.elements.emailInput));
        } catch (e) {
            throw e;
        }
    },
    async getNotification() {
        try {
            await driver.wait(until.elementLocated(this.elements.notification));
            return await driver.findElement(this.elements.notification).getText();
        } catch (e) {
            return '';
        }
    }
});
