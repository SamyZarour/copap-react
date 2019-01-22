const { By, until } = require('selenium-webdriver');
const { LandingActions } = require('../LandingPage/actions.js');

export const SignInActions = driver => ({
    url: 'http://localhost:3002/login/',
    elements: {
        formTitle: By.xpath('//h2[contains(text(), \'Login\')]'),
        emailInput: By.css('input[name=\'email\']'),
        emailError: By.xpath('//div[@class=\'field\' and ./input[@name=\'email\']]'),
        passwordInput: By.css('input[name=\'password\']'),
        passwordError: By.xpath('//div[@class=\'field\' and ./input[@name=\'password\']]'),
        submitButton: By.xpath('//button[@class=\'successButton\' and contains(text(), \'Login\')]'),
        notification: By.css('.notification')
    },
    async waitUntilVisible() {
        try {
            await driver.wait(until.elementLocated(this.elements.formTitle));
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
    },
    async signIn(fields) {
        try {
            const { email, password } = fields;
            await this.navigate();
            await this.setEmail(email);
            await this.setPassword(password);
            await driver.findElement(this.elements.submitButton).click();
        } catch (e) {
            throw e;
        }
    },
    async getEmailError() {
        try {
            return await driver.findElement(this.elements.emailError).getText();
        } catch (e) {
            return '';
        }
    },
    async getPasswordError() {
        try {
            return await driver.findElement(this.elements.passwordError).getText();
        } catch (e) {
            return '';
        }
    },
    async setEmail(inputText) {
        try {
            const emailInput = await driver.findElement(this.elements.emailInput);
            await emailInput.clear();
            await emailInput.sendKeys(inputText);
            await driver.findElement(this.elements.passwordInput).click();
        } catch (e) {
            throw e;
        }
    },
    async setPassword(inputText) {
        try {
            const passwordInput = await driver.findElement(this.elements.passwordInput);
            await passwordInput.clear();
            await passwordInput.sendKeys(inputText);
            await driver.findElement(this.elements.emailInput).click();
        } catch (e) {
            throw e;
        }
    },
    async isButtonClickable() {
        try {
            return await driver.findElement(this.elements.submitButton).isEnabled();
        } catch (e) {
            throw e;
        }
    },
    async isLoggedIn(user) {
        try {
            const jwt = await driver.executeScript('return window.localStorage.getItem(\'login_token\')');
            if (!jwt) {
                return false;
            }
            if (user) {
                await driver.wait(until.elementLocated(By.xpath(`//span[@class='navUsername' and text()='${user.toLowerCase()}']`)));
            }
            return true;
        } catch (e) {
            return false;
        }
    },
    async signOut() {
        try {
            const actionsLandingPage = LandingActions(driver);
            await driver.wait(until.elementLocated(By.xpath('//button[contains(text(), \'Log Out\')]')));
            await driver.findElement(By.xpath('//button[contains(text(), \'Log Out\')]')).click();
            await actionsLandingPage.waitUntilVisible();
        } catch (e) {
            throw e;
        }
    }
});
