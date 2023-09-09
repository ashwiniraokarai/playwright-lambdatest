import {test, expect} from "@playwright/test"

test("download a file", async({ page }) => {
    await page.goto('https://www.lambdatest.com/selenium-playground/generate-file-to-download-demo');
    await page.locator('id=textbox').fill("banno tera swagger");
    
    //With playwright's ".fill" based input, the chars wouldn't count unlike how they do with manual typing
    //Therefore this extra keybord press to get the input to "be sensed by the app" thus enabling the Generate File button
    await page.keyboard.press('Enter');
    await page.locator('id=create').click();


    const [download] = await Promise.all([
        page.waitForEvent('download'),
        page.locator('id=link-to-download').click()
    ])

    const downloadedFilePath = await download.path();
    console.log(downloadedFilePath)

    const downloadedFileName = await download.suggestedFilename();
    console.log(downloadedFileName);

    await download.saveAs(downloadedFileName);
})

test("upload a file - bypassing file picker", async({ page }) => {
    await page.goto('https://blueimp.github.io/jQuery-File-Upload/');
    await page.setInputFiles('//input[@type="file"]', ['files-for-upload/file_example_PNG_500kB.png', 'files-for-upload/file_example_PNG_500kB (1).png']);
} )


test.only("upload file via file picker", async({ page }) => {
    await page.goto('https://blueimp.github.io/jQuery-File-Upload/');

    const [fileChooser] = await Promise.all([
        page.waitForEvent('filechooser'),
        page.locator('//input[@type="file"]').click()
    ])

    //Optional step to check if the file picker allows multiple file selection
    console.log(fileChooser.isMultiple());

    fileChooser.setFiles(['files-for-upload/file_example_PNG_500kB.png', 'files-for-upload/file_example_PNG_500kB (1).png']);
})