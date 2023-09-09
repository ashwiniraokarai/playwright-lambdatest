import { test, expect } from "@playwright/test"

test("frames", async ({ page }) => {
    await page.goto("https://letcode.in/frame");
    const allFrames = page.frames();
    console.log("Total number of frames: " +allFrames.length);

    //Gives you a special Frame object, NOT the usual Locator object you are used to seeing
    const myFrameObject = page.frame({name: 'firstFr'});
    const frameLocator = page.frameLocator('#firstFr');
    frameLocator.locator
    
    if(myFrameObject != null){
        await myFrameObject.locator('input[name="fname"]').fill('achuk');
        await myFrameObject.locator('input[name="lname"]').fill('bye');

        // alternative to ^^:
        // await myFrameObject.fill('input[name="fname"]', 'achuk');
        // await myFrameObject.fill('input[name="lname"]', 'bye');

        const locatorForFeedbackText = myFrameObject.locator('p.has-text-info');
        await expect(locatorForFeedbackText).toContainText(`You have entered`);
    }  
    
    // alternative/ shortcut to if condition ^^:
    // await myFrameObject?.fill('input[name="fname"]', 'achuk');
    // await myFrameObject?.fill('input[name="lname"]', 'bye'); 
    



    // the following code snippet errors because:
    // the .fill method does not accept the selector option, only the value option
    // That's because it's an entirely different .fill method defined for Locator type objects 
    // In other words, .fill expects your Locator object to be an input taking Locator, not a frame
    // Whereas instead if you called the .fill defined on a Frame object, you'll see the option to provide the selector for input box and it's value
    // const locatorForFrame = page.locator('id=firstFr');
    // if(locatorForFrame != null){
    //     await locatorForFrame.fill('input[name="fname"]', 'achuk');
    //     await locatorForFrame.fill('input[name="lname"]', 'bye');
    // }
})