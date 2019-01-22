const { SignInActions } = require('../SignInPage/actions.js');
const { SignUpActions } = require('./actions.js');
const { HomeActions } = require('../HomePage/actions.js');
const { LandingActions } = require('../LandingPage/actions.js');
const { wipeLocalDb } = require('../../../test/utils.js');

export const SignUpPageTest = driver => {
    describe('When on the Sign Up form', () => {
        const testUser = { username: 'test', email: 'test@mail.com', password: 'password' };
        const existingUser = { username: 'existing', email: 'existing@mail.com', password: 'password' };
        const actionsSignUp = SignUpActions(driver);
        const actionsSignIn = SignInActions(driver);
        const actionsHome = HomeActions(driver);
        const actionsLanding = LandingActions(driver);

        beforeAll(async () => {
            try {
                await wipeLocalDb();
                await actionsSignUp.navigate();
                await actionsSignUp.signUp(existingUser);
                await actionsHome.waitUntilVisible();
            } catch (e) {
                throw e;
            }
        });

        beforeEach(async () => await actionsSignIn.isLoggedIn() ? actionsSignIn.signOut() : actionsLanding.navigate());

        afterAll(async () => await actionsSignIn.isLoggedIn() ? actionsSignIn.signOut() : actionsLanding.navigate());

        it('should not allow sign up for invalid format', async () => {
            try {
                const invalidCredentials = { username: '@user', email: 'email', password: '123' };
                const credentials = { username: 'username', email: 'email@mail.com', password: '12345678' };

                let usernameError;
                let emailError;
                let passwordError;
                let buttonEnabled;

                await actionsSignUp.navigate();

                // sign up button should be disabled
                buttonEnabled = await actionsSignUp.isButtonClickable();
                expect(buttonEnabled).toBe(false);

                // no validation message should be showing
                usernameError = await actionsSignUp.getUsernameError();
                expect(usernameError).toBe('');
                emailError = await actionsSignUp.getEmailError();
                expect(emailError).toBe('');
                passwordError = await actionsSignUp.getPasswordError();
                expect(passwordError).toBe('');

                // entering an invalid username
                await actionsSignUp.setUsername(invalidCredentials.username);
                // validation message should be showing
                usernameError = await actionsSignUp.getUsernameError();
                expect(usernameError).toBe('Invalid format');
                // button should not be enabled
                buttonEnabled = await actionsSignUp.isButtonClickable();
                expect(buttonEnabled).toBe(false);
                // enter valid username
                await actionsSignUp.setUsername(credentials.username);
                // no validation message should be showing
                usernameError = await actionsSignUp.getUsernameError();
                expect(usernameError).toBe('');

                // entering an invalid email
                await actionsSignUp.setEmail(invalidCredentials.email);
                // validation message should be showing
                emailError = await actionsSignUp.getEmailError();
                expect(emailError).toBe('Invalid format');
                // button should not be enabled
                buttonEnabled = await actionsSignUp.isButtonClickable();
                expect(buttonEnabled).toBe(false);
                // enter valid email
                await actionsSignUp.setEmail(credentials.email);
                // no validation message should be showing
                emailError = await actionsSignUp.getEmailError();
                expect(emailError).toBe('');

                // entering an invalid password
                await actionsSignUp.setPassword(invalidCredentials.password);
                // validation message should be showing
                passwordError = await actionsSignUp.getPasswordError();
                expect(passwordError).toBe('Invalid format');
                // button should not be enabled
                buttonEnabled = await actionsSignUp.isButtonClickable();
                expect(buttonEnabled).toBe(false);
                // enter valid password
                await actionsSignUp.setPassword(credentials.password);
                // no validation message should be showing
                passwordError = await actionsSignUp.getPasswordError();
                expect(passwordError).toBe('');

                // button should be enabled
                buttonEnabled = await actionsSignUp.isButtonClickable();
                expect(buttonEnabled).toBe(true);
            } catch (e) {
                throw e;
            }
        });

        it('should be able to signup successfully', async () => {
            try {
                let isLoggedIn;

                // user isn't logged in
                isLoggedIn = await actionsSignIn.isLoggedIn(testUser.username);
                expect(isLoggedIn).toBe(false);

                // sign up and redirect to home
                await actionsSignUp.signUp(testUser);
                await actionsHome.waitUntilVisible();

                // user is logged in
                isLoggedIn = await actionsSignIn.isLoggedIn(testUser.username);
                expect(isLoggedIn).toBe(true);

                // refresh
                await driver.navigate().refresh();
                await actionsHome.navigate();

                // user is still logged in
                isLoggedIn = await actionsSignIn.isLoggedIn(testUser.username);
                expect(isLoggedIn).toBe(true);
            } catch (e) {
                throw e;
            }
        });

        describe('when signed in', () => {
            it('should be redirected when trying to reach signup page', async () => {
                try {
                    // sign in with existing user
                    await actionsSignIn.signIn(existingUser);
                    await actionsHome.waitUntilVisible();

                    // accessing sign up page should redirect to home
                    await driver.navigate().to(actionsSignUp.url);
                    await actionsHome.waitUntilVisible();
                } catch (e) {
                    throw e;
                }
            });
        });
    });
};
