import {test, expect} from "@playwright/test";
import moment from "moment";

test("direct text input for date field", async({ page }) => {
    const locatorForDateTextInput = page.locator('//input[@type="date"][@id="birthday"]');

    await page.goto('https://www.lambdatest.com/selenium-playground/bootstrap-date-picker-demo');
    await locatorForDateTextInput.fill('2022-09-25');
})

test.only("use date picker input for date field", async({ page }) => {
    await page.goto('https://www.lambdatest.com/selenium-playground/bootstrap-date-picker-demo');

    await selectFromDatePicker("October 2022", "15");
    await page.reload();
    await selectFromDatePicker("July 2022", "15");
    // await page.reload();
    //await selectFromDatePicker("December 2022", "15");
    //await page.reload();
    //await selectFromDatePicker("January 2023", "16");
    await page.reload();
    await page.waitForLoadState();
    await selectFromDatePicker("September 2022", "27");

    async function selectFromDatePicker(monthYearToSelect:string, dayToSelect:string) {
        //let monthYearToSelect = "October 2022"; //A future month. As of writing of this code, its September 2022
        //let dayToSelect = "15";
        console.log("---start: in the body of the function---");
        console.log(monthYearToSelect, dayToSelect);

        const locatorToOpenDatePicker = page.locator('//input[@placeholder="Start date"]');
        const locatorForPreviousMonth = page.locator('//div[@class="datepicker-days"]/table[@class="table-condensed"]//th[@class="prev"]');
        const locatorForNextMonth = page.locator('//div[@class="datepicker-days"]/table[@class="table-condensed"]//th[@class="next"]');
        const locatorForDay = page.locator(`//div[@class="datepicker-days"]/table[@class="table-condensed"]//td[contains(@class,"day")][text()=${dayToSelect}]`)
        const locatorForMonthYearText = page.locator('//div[@class="datepicker-days"]/table[@class="table-condensed"]//th[@class="datepicker-switch"]');
        
        const formattedMonthYearToSelect = moment(monthYearToSelect, "MMMM YYYY");

        //click open date picker
        await locatorToOpenDatePicker.click();

        //check if date to be selected is before or after today's month (current month)
        const isPastMonthYear = formattedMonthYearToSelect.isBefore(moment());
        console.log(`Past MonthYear? ${isPastMonthYear}`);

        while (await locatorForMonthYearText.textContent() != monthYearToSelect) {
            if (isPastMonthYear) {
                await locatorForPreviousMonth.click();
                console.log("in if part of loop: clicked on <<")
            }
            else {
                await locatorForNextMonth.click();
                console.log("in else part of loop: clicked on >>")
            }
        }

        
        console.log(`about to click on day ${await locatorForDay.textContent()}`);
        //await page.waitForTimeout(3000);
        //click on the day
        await locatorForDay.click();
        //await page.waitForTimeout(3000);
        console.log(`end: hopefully clicked on day ${await locatorForDay.textContent()}`);
    }
})