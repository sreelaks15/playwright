import {test,expect} from '@playwright/test'

test("Frame Test", async({page})=>{
    await page.goto("https://demoqa.com/frames")
    const frame = await page.frameLocator("#frame1")
    const frameHeading = await frame.locator("#sampleHeading").textContent()
    console.log(frameHeading)



    await page.waitForTimeout(3000)
})