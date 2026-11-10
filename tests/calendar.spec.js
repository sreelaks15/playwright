import {test,expect} from '@playwright/test'

test("Calendar Test", async ({page})=>{
await page.goto("https://selenium.qabible.in/date-picker.php")
const datePicker = await page.locator("#single-input-field")
await datePicker.click()
const datepickerDays = await page.locator(".datepicker-days").locator("th.datepicker-switch")
await datepickerDays.click()
const datepickerMonths = await page.locator(".datepicker-months").locator("th.datepicker-switch")
await datepickerMonths.click()
const datepickerYears = await page.locator(".datepicker-years").locator("th.datepicker-switch").textContent()
console.log("Year Range is " + datepickerYears)
const yearArray = datepickerYears.split("-")
const startYear = parseInt(yearArray[0])
const endYear = parseInt(yearArray[1])
console.log("Start Year is " + startYear)
console.log("End year is "+ endYear)
const year = 2000
const month = 7 //month
const day = 21
if(year>=startYear && year<=endYear){
    
}
else if(year<startYear){
    const prevBtn = await page.locator(".datepicker-years").locator("th.prev")
    await prevBtn.click()
}
else if(year>endYear){
    const nextBtn = await page.locator(".datepicker-years").locator("th.next")
    await nextBtn.click()
}
await page.waitForTimeout(3000)

})