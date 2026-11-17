import { test, expect } from '@playwright/test'

test("Download Test", async ({ page }) => {
    await page.goto("https://demoqa.com/upload-download")
    const uploadFile = await page.locator("#uploadFile")
    await uploadFile.setInputFiles("C:\\Users\\SREELAKSHMI\\Downloads\\downloadnew.jpeg") //setinput files works only when type = file available while inspecting


    await page.waitForTimeout(3000)

})