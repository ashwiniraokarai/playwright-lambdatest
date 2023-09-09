import { expect, test } from "@playwright/test"
import RegisterPageClass from "../pom-page-classes/register-page-class";

//To Do: pass baseURL as a param. Set the url in playwright config file 
test("User registration", async({ page }) => {
    //instantiate an object of register page class
    const register = new RegisterPageClass(page);

    //ToDo: Extract those values that you need to use in another test into constants
    //E.g.: Needing the registered email and password to login with as part of a login test
    await page.goto('https://ecommerce-playground.lambdatest.io/index.php?route=account/register');
    await register.enterFirstName("peace");
    await register.enterLastName("lambdatest playground");
    await register.enterEmail('ashwinirao.karai+1@gmail.com');
    await register.enterPhone('1234567890');
    await register.enterPassword('peacepassword');
    await register.enterPasswordConfirmation('peacepassword');
    expect((await register.locatorForSubscriptionSetToNo()).isChecked()).toBeTruthy();
    await register.acceptPrivacyPolicy();
    await register.submitRegistration();
})