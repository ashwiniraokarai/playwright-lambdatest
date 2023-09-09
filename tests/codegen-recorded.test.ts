import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {

  // Go to https://ecommerce-playground.lambdatest.io/
  await page.goto('https://ecommerce-playground.lambdatest.io/');

  //Added by Ash because the hover action did not get recorded
  await page.hover('//a[@data-toggle="dropdown"]//span[contains(text(),"My account")]');

  // Click text=Login
  await page.locator('text=Login').click();
  await expect(page).toHaveURL('https://ecommerce-playground.lambdatest.io/index.php?route=account/login');

  // Click [placeholder="E-Mail Address"]
  await page.locator('[placeholder="E-Mail Address"]').click();

  // Fill [placeholder="E-Mail Address"]
  await page.locator('[placeholder="E-Mail Address"]').fill('ashwinirao.karai@gmail.com');

  // Click [placeholder="Password"]
  await page.locator('[placeholder="Password"]').click();

  // Fill [placeholder="Password"]
  await page.locator('[placeholder="Password"]').fill('password');

  // Press Tab
  await page.locator('[placeholder="Password"]').press('Tab');

  // Press Tab
  await page.locator('#content >> text=Forgotten Password').press('Tab');

  // Click input:has-text("Login")
  await page.locator('input:has-text("Login")').click();
  await expect(page).toHaveURL('https://ecommerce-playground.lambdatest.io/index.php?route=account/account');

  // Click text=Edit your account information
  await page.locator('text=Edit your account information').click();
  await expect(page).toHaveURL('https://ecommerce-playground.lambdatest.io/index.php?route=account/edit');

  // Click [placeholder="Last Name"]
  await page.locator('[placeholder="Last Name"]').click();

  // Press ArrowLeft
  await page.locator('[placeholder="Last Name"]').press('ArrowLeft');

  // Press ArrowLeft
  await page.locator('[placeholder="Last Name"]').press('ArrowLeft');

  // Press ArrowLeft
  await page.locator('[placeholder="Last Name"]').press('ArrowLeft');

  // Press ArrowLeft
  await page.locator('[placeholder="Last Name"]').press('ArrowLeft');

  // Press ArrowLeft
  await page.locator('[placeholder="Last Name"]').press('ArrowLeft');

  // Press ArrowLeft
  await page.locator('[placeholder="Last Name"]').press('ArrowLeft');

  // Press ArrowLeft
  await page.locator('[placeholder="Last Name"]').press('ArrowLeft');

  // Press ArrowLeft
  await page.locator('[placeholder="Last Name"]').press('ArrowLeft');

  // Press ArrowLeft
  await page.locator('[placeholder="Last Name"]').press('ArrowLeft');

  // Press ArrowLeft
  await page.locator('[placeholder="Last Name"]').press('ArrowLeft');

  // Fill [placeholder="Last Name"]
  await page.locator('[placeholder="Last Name"]').fill('Ecommerce Playground');

  // Click text=Continue
  await page.locator('text=Continue').click();
  await expect(page).toHaveURL('https://ecommerce-playground.lambdatest.io/index.php?route=account/account');

  // Click text=Success: Your account has been successfully updated.
  await page.locator('text=Success: Your account has been successfully updated.').click();

  //refactored: replaced with waiting for a state! :)
  //The promise resolves after 'load' event (waits for entire page to load but it seems faster than a hard wait for even 1 ms)
  await page.waitForLoadState();

  // previous failed trial waiting for element
  // await page.waitForSelector(
  //   '//a[@data-toggle="dropdown"]//span[contains(text(),"My account")]',
  //   //{timeout: 5000}
  // );

  //previous succeeded trial at wait but har wait sucks
  //await page.waitForTimeout(1000);

  //Added by Ash because the hover action did not get recorded
  await page.hover('//a[@data-toggle="dropdown"]//span[contains(text(),"My account")]');
  //await page.hover('//li[contains(@class, "dropdown-hoverable")][3]');

  //Ash: disabling because these assertion fails often: Could it be that the hover doesn't stay long enough?
  //await page.waitForSelector('//li[contains(@class, "dropdown-hoverable") and contains(@class, "show")]');
  //await expect(page.locator('//li[contains(@class, "dropdown-hoverable")][3]')).toHaveClass(/show/);

  //await page.waitForSelector('span:has-text("Logout")');
  //await expect(page.locator('span:has-text("Logout")')).toBeVisible;

  await page.locator('span:has-text("Logout")').click();
  await expect(page).toHaveURL('https://ecommerce-playground.lambdatest.io/index.php?route=account/logout');

});