import {test,expect} from '@playwright/test'

test("Valid username & Invalid password", async({page})=>{
await page.goto("https://www.saucedemo.com")
const userName = await page.locator("#user-name")
await userName.fill("standard_user")
const password = await page.locator("#password")
await password.fill("abcd")
const loginBtn = await page.locator("#login-button")
await loginBtn.click()
const errorMessage = await page.locator(".error-message-container.error").textContent()
//const errorMessage = await page.getByRole("alert").textContent()
console.log("Error message is: " + errorMessage)
await expect (page.locator(".error-message-container.error")).toHaveText(errorMessage)
await expect (page.locator(".error-message-container.error")).toBeVisible()

//Login feature for empty Username & password
console.log("-----Login feature for empty Username & password-----")
await userName.fill("")
await password.fill("")
await loginBtn.click()
const errorMessage1 = await page.locator(".error-message-container.error").textContent()
console.log("Error message is: " + errorMessage1)
await expect (page.locator(".error-message-container.error")).toHaveText(errorMessage1)
await expect (page.locator(".error-message-container.error")).toBeVisible()

//Valid Username & password
console.log("----Valid Username & password-----")
await userName.fill("standard_user")
await password.fill("secret_sauce")
await loginBtn.click()
await expect(page).toHaveURL("https://www.saucedemo.com/inventory.html")
console.log("Page title is: " , await page.title())
await expect(page).toHaveTitle("Swag Labs") // to verify original title and fetched title is same

await page.waitForTimeout(3000)


})