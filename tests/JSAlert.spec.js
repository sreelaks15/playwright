import { test, expect } from '@playwright/test'

test("JS Alert Test", async ({ page }) => {
    await page.goto("https://selenium.qabible.in/javascript-alert.php")
    const clickMeBtnYellow = await page.locator(".btn.btn-warning")
    page.on("dialog", async (dialog) => {
        await page.waitForTimeout(3000)
        console.log(dialog.message())
        //await dialog.accept()
        await dialog.dismiss()
    })
    await clickMeBtnYellow.click();
    const message = await page.locator("#confirm-demo").textContent()
    console.log(message)
        await page.waitForTimeout(3000)
})