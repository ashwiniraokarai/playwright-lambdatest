import { expect, test } from "@playwright/test"

test("single input field", async ({ page }) => {
    await page.goto('https://www.lambdatest.com/selenium-playground/simple-form-demo');

    //assert on placeholder text
    const messageInputBox = page.locator('//input[@id="user-message"]');
    console.log("Placeholder text: " + await messageInputBox.getAttribute('placeholder'));
    await expect(messageInputBox).toHaveAttribute('placeholder', 'Please enter your Message');
    
    console.log("Before entering input: " + await messageInputBox.inputValue());
    await page.fill('//input[@id="user-message"]', "ramani");
    console.log("After entering input: " + await messageInputBox.inputValue());
    await page.click('//button[@id="showInput"]');
    await expect(page.locator('//p[@id="message"]')).toContainText("ramani");
})

test("two input fields", async({ page }) => {
    await page.goto('https://www.lambdatest.com/selenium-playground/simple-form-demo');

    const numberInputBoxOne = page.locator('//input[@id="sum1"]');
    const numberInputBoxTwo = page.locator('//input[@id="sum2"]');
    const submitButton = page.locator('//button[text()="Get values"]');
    const sumResultText = page.locator('#addmessage');

    await numberInputBoxOne.type("10");
    await numberInputBoxTwo.type("20");
    await submitButton.click();

    console.log("Actual Sum: " +await sumResultText.textContent());

    await expect(sumResultText).toContainText("30");
})

test.only("interacting with a single checkbox", async({ page }) => {
    await page.goto("https://www.lambdatest.com/selenium-playground/checkbox-demo");

    //A playwright style selector (as opposed to xpath or css):
    const singleCheckBox = page.locator('id=isAgeSelected');

    await expect(singleCheckBox).not.toBeChecked();
    await singleCheckBox.check();
    await expect(singleCheckBox).toBeChecked();
})