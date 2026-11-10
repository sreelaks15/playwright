import {test,expect} from '@playwright/test'

test("Select Input test", async({page})=>{
await page.goto("https://selenium.qabible.in/simple-form-demo.php");
const selectInput = await page.getByRole("link", {name:"Select Input"})
await selectInput.click();
const selectColor = await page.locator("#single-input-field")
await selectColor.selectOption("Red");
const selectedColor = await page.locator("#message-one").textContent()
await expect(selectedColor).toContain("Red")
await page.waitForTimeout(3000)
})


//Multiple
test.only("Select multiple locator test", async({page})=>{
await page.goto("https://selenium.qabible.in/simple-form-demo.php");
const selectInput = await page.getByRole("link", {name:"Select Input"})
await selectInput.click();
const multipleSelect = await page.locator("#multi-select-field")
await multipleSelect.selectOption(["Green","Yellow"]);
const getFirstSelectedBtn = await page.getByRole("button",{name: "Get First Selected"})
await getFirstSelectedBtn.click();
const message1 = await page.locator("#message-two").textContent()
console.log(message1)
const getAllSelectedBtn = await page.getByRole("button",{name:"Get All Selected"})
const message2 = await page.locator("#message-two").textContent()
console.log(message2)



await page.waitForTimeout(3000)


})