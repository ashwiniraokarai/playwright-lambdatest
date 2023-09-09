import { test, expect } from "@playwright/test"

test("single select dropdown", async({ page }) => {
    const locatorForDropDown = page.locator('id=select-demo');
    const labelToSelect = 'Tuesday';
    const locatorForFeedbackText = page.locator('//p[contains(@class,"selected-value")]');

    await page.goto('https://www.lambdatest.com/selenium-playground/select-dropdown-demo');
    await locatorForDropDown.selectOption({ label: labelToSelect });
    //alternate ^^: await page.selectOption(locatorForDropDown, { label: labelToSelect });
    await expect(locatorForFeedbackText).toContainText(`Day selected :- ${labelToSelect}`);
})


test("multiple select dropdown", async({ page }) => {
    const locatorForDropDown = page.locator('id=multi-select');
    
    const labelsToSelect = ['California', 'New Jersey'];
    //const locatorForFeedbackText = page.locator('//p[contains(@class,"selected-value")]');

    await page.goto('https://www.lambdatest.com/selenium-playground/select-dropdown-demo');
    await locatorForDropDown.selectOption([
        {
            label: labelsToSelect[0], 
        }, 
        {
            value: labelsToSelect[1]
        }
    ]);
    //skipping assertion because the feedback text on the site isn't listing all selected options 
})


test.only("jquery or bootstrap dropdown", async({ page }) => {
    const locatorForDropDown = page.locator('id=country');
    const labelToSelect = 'Australia';

    await page.goto('https://www.lambdatest.com/selenium-playground/jquery-dropdown-search-demo');
    await locatorForDropDown.selectOption({ label: labelToSelect });
})
