import {test, expect} from "@playwright/test"

test("single window tab a.k.a popup", async({ page }) => {
    const locatorForLinkToTriggerTab = page.locator('text="Follow On Twitter"');

    await page.goto("https://www.lambdatest.com/selenium-playground/window-popup-modal-demo");

    //set up a listener for popup event just like you did for Alerts
    //Promise.all prevents a race conditions between clicking on the link and waiting for the popup
    //Promise.all resolves to an array with 2 elements [Page, void]
    //Using the array destructure assignment you can directly access the first array element "Page" using []
    //[popup] is of type Page
    const [popup] = await Promise.all([
        page.waitForEvent('popup'),

         //trigger the tab (a pop-up in this case) through button click, which is actually a link, not button
        locatorForLinkToTriggerTab.click(),
    ]);

    await popup.waitForLoadState();
    console.log(`Title of the popup: ${await popup.title()}`);
    console.log(`Url of the popup: ${await popup.url()}`);

    //await page.waitForTimeout(5000);
})  


test("multiple tabs a.k.a popups", async({ page }) => {
    const locatorForLinkToTriggerPopups = page.locator('text="Follow Twitter & Facebook"');
    await page.goto("https://www.lambdatest.com/selenium-playground/window-popup-modal-demo");

    const [popup] = await Promise.all([
        page.waitForEvent('popup'),
        locatorForLinkToTriggerPopups.click(),
    ]);

    //You get a handle on the first popup
    await popup.waitForLoadState();

    //You're essentially doing page.context() but here popup is your "page"
    //.context() returns the browser context the page (popup) belongs to
    //.pages() returns all 3 open pages in the context (which includes the parent/ main page besides the two tabs)
    const allPages = popup.context().pages();
    console.log(`Totals number of page: ${allPages.length}`); //3

    allPages.forEach(eachPage => {
        console.log(`Url: ${eachPage.url()}`);
    })

})