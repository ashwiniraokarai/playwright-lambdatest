import { chromium, expect, test } from "@playwright/test"

test("login to lambda ecommerce playground site", async () => {
   const browserInstance = await chromium.launch({
      headless: false
   });

   //each browser context has its own cookies and cache that isn't shared with other contexts
   //think of this as a new incognito browser window
   const context = await browserInstance.newContext();

   //page is essentialy a new browser tab. Naturally, pages within a context share cookies and cache because it's the same session
   const page = await context.newPage();

   await page.goto("https://ecommerce-playground.lambdatest.io/");
   await page.hover('//a[@data-toggle="dropdown"]//span[contains(text(),"My account")]');
   await page.click("text=login");


   await page.fill('input[name="email"]', "ashwinirao.karai@gmail.com");
   await page.fill('input[name="password"]', "password");
   await page.click('input[type="submit"]');

   //enabled temporarily for debug/ observation only. Not required or recommended when running tests
   await page.waitForTimeout(5000);

   await expect(page).toHaveURL("https://ecommerce-playground.lambdatest.io/index.php?route=account/account");
})