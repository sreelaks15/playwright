import { test, expect } from '@playwright/test';

test("Radio button test", async ({ page }) => {
    await page.goto("https://selenium.qabible.in/index.php");
    const inputForm = page.getByRole("link", { name: "Input Form" })
    await inputForm.click()
    const radiobutton = page.getByRole("link", { name: "Radio Buttons Demo" })
    await radiobutton.click()
    const radio1 = page.getByRole("radio", { name: "Female" })
    await radio1.first().click();
    const showvaluebtn = page.getByRole("button", { name: 'Show Selected Value' })
    const radiovalue = page.getByText("Radio button 'Female' is checked")
    await expect(radiovalue).not.toBeVisible()
    await showvaluebtn.click()
    await expect(radiovalue).toBeVisible()
    const textmessage1 = await radiovalue.textContent()
    console.log("Text message is : " + textmessage1)
    await expect(radiovalue).toHaveText("Radio button 'Female' is checked") // substrings - radio, button, Female, is, checked
    await expect(textmessage1).toContain("Female") // will pass if the text message contains the substring "Female"
    await page.waitForTimeout(3000)
})

test("Radio button test 2", async ({ page }) => {
    await page.goto("https://selenium.qabible.in/index.php");
    const inputForm = page.getByRole("link", { name: "Input Form" })
    await inputForm.click()
    const radiobutton = page.getByRole("link", { name: "Radio Buttons Demo" })
    await radiobutton.click()
const radiofemale = page.getByText("Female",{exact:true}) // to get exact match of the text "Female" and not the substring "Female"
    await radiofemale.nth(0).click();
    await page.waitForTimeout(3000)


    
})
