import { expect, test } from "@playwright/test"

//A JS alert box: A message with Ok button
test("alert box", async({ page }) => {
    await page.goto("https://www.lambdatest.com/selenium-playground/javascript-alert-box-demo");

    //there are 3 matches for button with Click me text:
    // You could simply match the first one with [1]:
    //  const xpathLocatorForClickButton = page.locator('//button[contains(text(), "Click Me")][1]')
    // OR locate the button as the "following sibling" of the previous sibling:
    //  const xpathLocatorForClickButtonFollowingSibling = page.locator('//p[contains(text(), "Click the button to display an alert box:")]/following-sibling::button');
    // OR locate the button with playwright's very own locator mechanism:
        const playwrightLocatorForClickButton = page.locator('button:has-text("Click Me")').nth(0);
    
    //Listen to the page.on('dialog') event. Act on the dialog using the dialog object dispatched by the page via the page.on('dialog') event
    page.on('dialog', async(dialog) => {
        console.log("Type of dialog: " +dialog.type());
        console.log("Message: " +dialog.message());
        // await dialog.dismiss();
        await dialog.accept();
    })
    //Trigger the dialog
    await playwrightLocatorForClickButton.click();
})  

//A JS Confirm Box: A message + ok and cancel buttons
test("confirmation box", async( { page }) => {
    await page.goto("https://www.lambdatest.com/selenium-playground/javascript-alert-box-demo");
    const locatorForClickButton = page.locator('button:has-text("Click Me")').nth(1);

    //Listen to the page.on('dialog') event. Act on the dialog using the dialog object dispatched by the page via the page.on('dialog') event

    page.on('dialog', async(dialog) => {
        console.log("Type of dialog: " +dialog.type());
        console.log("Message: " +dialog.message());
        await dialog.accept();
    })
    //Trigger the dialog
    await locatorForClickButton.click();

    const locatorForFeedbackText = page.locator('id=confirm-demo');
    await expect(locatorForFeedbackText).toContainText('You pressed OK!');
})


//A JS Prompt Box: ability to accept input + ok and cancel buttons.
test("prompt box", async( { page }) => {
    await page.goto("https://www.lambdatest.com/selenium-playground/javascript-alert-box-demo");
    const locatorForClickButton = page.locator('button:has-text("Click Me")').nth(2);
    const inputText = "Achukki";

    //Listen to the page.on('dialog') event. Act on the dialog using the dialog object dispatched by the page via the page.on('dialog') event
    page.on('dialog', async(dialog) => {
        console.log("Type of dialog: " +dialog.type());
        console.log("Message: " +dialog.message());
        console.log("Default prompt value: " +dialog.defaultValue());
        await dialog.accept(inputText);
    })
    //Trigger the dialog
    await locatorForClickButton.click();

    const locatorForFeedbackText = page.locator('id=prompt-demo');
    await expect(locatorForFeedbackText).toContainText(`You have entered '${inputText}'`);
})

//A Bootstrap Modal
test.only("bootstrap modal", async({ page }) => {
    await page.goto('https://www.lambdatest.com/selenium-playground/bootstrap-modal-demo');
    await page.locator('//div[text()="Single Modal Example"]/following-sibling::button').click();
    await page.locator('(//button[text()="Save Changes"])[1]').click();
})