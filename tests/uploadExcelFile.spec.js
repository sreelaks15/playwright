import { test, expect } from '@playwright/test'


test("Upload Excel file", async({page})=>{
await page.goto("https://demoqa.com/upload-download")
    const uploadFile = page.locator("#uploadFile")
    await uploadFile.setInputFiles("C:\\PlaywrightProject\\StudentDetails.xlsx")
    await page.waitForTimeout(3000)
})