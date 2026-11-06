import { test, expect } from '@playwright/test'

test("Prompt Box Test", async ({ page }) => {
    await page.goto("https://selenium.qabible.in/javascript-alert.php")
    const promptBoxBtn = await page.locator(".btn.btn-danger")
    page.on("dialog", async (dialog) => {
        await page.waitForTimeout(3000)
        console.log(dialog.message())
        console.log(dialog.defaultValue())
        console.log(dialog.type())
        await dialog.accept("Sreelakshmi")
             await new Promise(resolve => setTimeout(resolve,3000))

       // await page.pause()
    })
    await promptBoxBtn.click();
    await page.waitForTimeout(3000)


})