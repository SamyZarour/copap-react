const { SignInActions } = require('./actions.js');
const { SignUpActions } = require('../SignUpPage/actions.js');
const { HomeActions } = require('../HomePage/actions.js');
const { LandingActions } = require('../LandingPage/actions.js');
const { NotificationActions } = require('../../components/Notification/actions.js');
const { wipeLocalDb } = require('../../../test/utils.js');

export const SignInPageTest = driver => {
    describe('When on the Sign In form', () => {
        const testUser = { username: 'testUser', email: 'testEmail@mail.com', password: 'testPassword' };
        const actionsSignIn = SignInActions(driver);
        const actionsSignUp = SignUpActions(driver);
        const actionsHome = HomeActions(driver);
        const actionsLanding = LandingActions(driver);
        const actionsNotification = NotificationActions(driver);

        beforeAll(async () => {
            await wipeLocalDb();
            await actionsSignUp.signUp(testUser);
            await actionsHome.waitUntilVisible();
        });

        beforeEach(async () => await actionsSignIn.isLoggedIn() ? actionsSignIn.signOut() : actionsLanding.navigate());

        afterAll(async () => await actionsSignIn.isLoggedIn() ? actionsSignIn.signOut() : actionsLanding.navigate());


        it('should not allow sign in for invalid format', async () => {
            try {
                const invalidCredentials = { email: 'email', password: '123' };
                const credentials = { email: 'email@mail.com', password: '12345678' };
                let emailError;
                let passwordError;
                let buttonEnabled;

                await actionsSignIn.navigate();

                // sign in button should be disabled
                buttonEnabled = await actionsSignIn.isButtonClickable();
                expect(buttonEnabled).toBe(false);

                // no validation message should be showing
                emailError = await actionsSignIn.getEmailError();
                expect(emailError).toBe('');
                passwordError = await actionsSignIn.getPasswordError();
                expect(passwordError).toBe('');

                // entering an invalid email
                await actionsSignIn.setEmail(invalidCredentials.email);
                // validation message should be showing
                emailError = await actionsSignIn.getEmailError();
                expect(emailError).toBe('Invalid format');
                // button should not be enabled
                buttonEnabled = await actionsSignIn.isButtonClickable();
                expect(buttonEnabled).toBe(false);
                // enter valid email
                await actionsSignIn.setEmail(credentials.email);
                // no validation message should be showing
                emailError = await actionsSignIn.getEmailError();
                expect(emailError).toBe('');

                // entering an invalid password
                await actionsSignIn.setPassword(invalidCredentials.password);
                // validation message should be showing
                passwordError = await actionsSignIn.getPasswordError();
                expect(passwordError).toBe('Invalid format');
                // button should not be enabled
                buttonEnabled = await actionsSignIn.isButtonClickable();
                expect(buttonEnabled).toBe(false);
                // enter valid password
                await actionsSignIn.setPassword(credentials.password);
                // no validation message should be showing
                passwordError = await actionsSignIn.getPasswordError();
                expect(passwordError).toBe('');

                // button should be enabled
                buttonEnabled = await actionsSignIn.isButtonClickable();
                expect(buttonEnabled).toBe(true);
            } catch (e) {
                throw e;
            }
        });

        it('should be able to login successfully', async () => {
            try {
                let isLoggedIn;

                // user isn't logged in
                isLoggedIn = await actionsSignIn.isLoggedIn(testUser.username);
                expect(isLoggedIn).toBe(false);

                // sign in and redirect to home
                await actionsSignIn.signIn(testUser);
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

        it('should show error when user does not exist', async () => {
            try {
                await actionsSignIn.signIn({ ...testUser, email: 'random@mail.com' });
                expect(await actionsNotification.getNotification()).toBe('Email : Not Valid');
            } catch (e) {
                throw e;
            }
        });

        describe('when signed in', () => {
            it('should be redirected when trying to reach signin page', async () => {
                try {
                    // sign in with existing user
                    await actionsSignIn.signIn(testUser);
                    await actionsHome.waitUntilVisible();

                    // accessing sign in page should redirect to home
                    await driver.navigate().to(actionsSignIn.url);
                    await actionsHome.waitUntilVisible();
                } catch (e) {
                    throw e;
                }
            });
        });
    });
};
