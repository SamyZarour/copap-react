const { By, until } = require('selenium-webdriver');

export const SignUpActions = driver => ({
    url: 'http://localhost:3002/register/',
    elements: {
        formTitle: By.xpath('//h2[contains(text(), \'Register\')]'),
        usernameInput: By.css('input[name=\'username\']'),
        usernameError: By.xpath('//div[@class=\'field\' and ./input[@name=\'username\']]'),
        emailInput: By.css('input[name=\'email\']'),
        emailError: By.xpath('//div[@class=\'field\' and ./input[@name=\'email\']]'),
        passwordInput: By.css('input[name=\'password\']'),
        passwordError: By.xpath('//div[@class=\'field\' and ./input[@name=\'password\']]'),
        submitButton: By.xpath('//button[@class=\'successButton\' and contains(text(), \'Register\')]'),
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
    async signUp(fields) {
        try {
            const { username, email, password } = fields;
            await this.navigate();
            await this.setUsername(username);
            await this.setEmail(email);
            await this.setPassword(password);
            await driver.findElement(this.elements.submitButton).click();
        } catch (e) {
            throw e;
        }
    },
    async getUsernameError() {
        try {
            return await driver.findElement(this.elements.usernameError).getText();
        } catch (e) {
            return '';
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
    async setUsername(inputText) {
        try {
            const usernameInput = await driver.findElement(this.elements.usernameInput);
            await usernameInput.clear();
            await usernameInput.sendKeys(inputText);
            await driver.findElement(this.elements.passwordInput).click();
        } catch (e) {
            throw e;
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
    }
});
