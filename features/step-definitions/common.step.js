import { Given, When, Then } from '@wdio/cucumber-framework';
//@cucumber/cucumber
import commonPage from '../pageobjects/common.page';
import homePage from '../pageobjects/home.page';

const delay = ms => new Promise(
    res =>setTimeout(res,ms)
);


Given(/^I am on the login page$/, async () => {
    await commonPage.openHomePage();

    await delay(2000);
    await expect(homePage.btnSignIn).toBeDisplayed();
    await expect(homePage.img_Logo).toBeDisplayed();
    await expect(homePage.link_Contact).toBeDisplayed(); 
    
});

When('Navigate to SignUp page', async () => {
    await homePage.navigateToLoginPage();
    console.log("Navigated to Authentication page ");
    await delay(2000);
  });



// When(/^I login with (\w+) and (.+)$/, async (username, password) => {
//     await LoginPage.login(username, password)
// });

// Then(/^I should see a flash message saying (.*)$/, async (message) => {
//     await expect(SecurePage.flashAlert).toBeExisting();
//     await expect(SecurePage.flashAlert).toHaveTextContaining(message);
// });

