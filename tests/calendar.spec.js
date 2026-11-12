import { test, expect } from '@playwright/test'

test("Calendar Test", async ({ page }) => {
    await page.goto("https://selenium.qabible.in/date-picker.php")
    const datePicker = await page.locator("#single-input-field")
    await datePicker.click()
    const datepickerDays = await page.locator(".datepicker-days").locator("th.datepicker-switch")
    await datepickerDays.click()
    const datepickerMonths = await page.locator(".datepicker-months").locator("th.datepicker-switch")
    await datepickerMonths.click()
    const year = 2028
    const month = 7 //month
    const day = 21
    while (true) {
        const datepickerYears = await page.locator(".datepicker-years").locator("th.datepicker-switch").textContent()
        console.log("Year Range is " + datepickerYears)
        const yearArray = datepickerYears.split("-")
        const startYear = parseInt(yearArray[0])
        const endYear = parseInt(yearArray[1])
        console.log("Start Year is " + startYear)
        console.log("End year is " + endYear)
        if (year >= startYear && year <= endYear) {
            break
        }
        else if (year < startYear) {
            const prevBtn = await page.locator(".datepicker-years").locator("th.prev")
            await prevBtn.click()
        }
        else {
            const nextBtn = await page.locator(".datepicker-years").locator("th.next")
            await nextBtn.click()
        }
    }
    await page.locator(".datepicker-years").locator(".year",{hasText: year.toString()}).click()
    await page.locator(".datepicker-months").locator(".month").nth(month -1 ).click()
   //await page.locator(".datepicker-days").locator(".day",{hasText: day.toString()}).click()  //sometimes it will not work for all dates
    await page.locator(".datepicker-days").locator(".day:not(.new)",{hasText:new RegExp(`^${day}$`)}).click()  // //for more specific date unique date === if 2 is given that may not be unique date so we can use regex to match the exact date
    const showDateBtn = await page.locator("#button-one")
    await showDateBtn.click()



    await page.waitForTimeout(3000)
})