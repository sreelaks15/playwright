import {test,expect} from '@playwright/test'

test("Select Input test", async({page})=>{
await page.goto("https://selenium.qabible.in/simple-form-demo.php");
const selectInput = await page.getByRole("link", {name:"Select Input"})
await selectInput.click();
const selectColor = await page.locator("#single-input-field")
await selectColor.click();

await page.waitForTimeout(3000)


})