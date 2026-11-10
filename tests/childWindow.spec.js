import { test, exepect } from '@playwright/test'

test("Child window test", async ({ browser }) => {
    const context = await browser.newContext()  // to open new browser context without any history .. fresh browser
    const page = await context.newPage()
    await page.goto("https://selenium.qabible.in/window-popup.php")
    const Facebook = await page.locator(".btn.btn-primary.windowSingle")
    console.log("Parent Page Title is " + await page.title())
    const [newPage] = await Promise.all([ //promise is JS's object that represents the eventual completion (or failure) of an asynchronous operation and its resulting value.
        context.waitForEvent("page"),  // to wait for the new page to open
        Facebook.click()])
        await newPage.waitForLoadState() // to wait for the new page to   
        console.log("Child Page Title is " + await newPage.title())  


    await page.waitForTimeout(3000)
})