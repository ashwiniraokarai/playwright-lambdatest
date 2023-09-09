import { Page } from "@playwright/test"
export default class RegisterPageClass{
    public page: Page

    constructor(page: Page) {
        this.page = page;
    }
    
    async enterFirstName(firstName: string){
        await this.page.locator("//input[@id='input-firstname']").type(firstName);
    }

    async enterLastName(lastName: string){
        await this.page.locator("//input[@id='input-lastname']").type(lastName);
    }

    async enterEmail(email: string){
        await this.page.locator("//input[@id='input-email']").type(email);
    }

    async enterPhone(phone: string){
        await this.page.locator("//input[@id='input-telephone']").type(phone);
    }

    async enterPassword(password: string){
        await this.page.locator("//input[@id='input-password']").type(password);
    }

    async enterPasswordConfirmation(password: string){
        await this.page.locator("//input[@id='input-confirm']").type(password);
    }

    async locatorForSubscriptionSetToNo(){
        //return the locator. This is the "No" radio button pre-selected in default state. 
        //In your test, you can assert that the button is already checked 
        return this.page.locator("//input[@id='input-newsletter-no']")
    }

    async acceptPrivacyPolicy(){
        await this.page.locator("//label[@for='input-agree']").check();
    }

    async submitRegistration(){
        await this.page.locator("//input[@value='Continue']").click();
    }
}