import { test, expect } from '@playwright/test'

test("Download Test", async ({ page }) => {
    await page.goto("https://demoqa.com/upload-download")
    const downloadBtn = await page.locator("#downloadButton")
    
const [downloadFile] = await Promise.all([
    page.waitForEvent('download'),
    await downloadBtn.click()
])
//await downloadFile.saveAs("C:\\Users\\SREELAKSHMI\\Downloads\\downloadnew.jpeg") // to save in a particular folder
await downloadFile.saveAs("Sameple.jpeg")  // save in the playwright itself.. below playwright.config.js

    await page.waitForTimeout(3000)
})