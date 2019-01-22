const { SignInActions } = require('../SignInPage/actions.js');
const { SignUpActions } = require('../SignUpPage/actions.js');
const { HomeActions } = require('./actions.js');
const { LandingActions } = require('../LandingPage/actions.js');
const { wipeLocalDb } = require('../../../test/utils.js');

export const HomePageTest = driver => {
    describe('When on Home Page', () => {
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

        beforeEach(async () => {
            if (await actionsSignIn.isLoggedIn()) { await actionsHome.navigate(); } else { await actionsSignIn.signIn(existingUser); }
        });

        afterAll(async () => await actionsSignIn.isLoggedIn() ? actionsSignIn.signOut() : actionsLanding.navigate());

        it('should be redirected to Landing page when signed out', async () => {
            await actionsSignIn.signOut();
            await driver.navigate().to(actionsHome.url);
            await actionsLanding.waitUntilVisible();
        });
    });
};
