import { test, expect } from '@playwright/test'

test("JS Alert Box Test", async ({ page }) => {
    await page.goto("https://selenium.qabible.in/javascript-alert.php")
    const clickMeBtn = await page.locator(".btn.btn-success")
    page.on("dialog", async (dialog) => {
        await page.waitForTimeout(3000)
        console.log(dialog.message())
        await dialog.accept()
    })
    await clickMeBtn.click()
         await page.waitForTimeout(3000)

})