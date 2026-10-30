import test from "@playwright/test";

test("Locator test", async({page})=>{
    await page.goto("https://selenium.qabible.in/form-submit.php")
    await page.locator("#validationCustom01").fill("Sreelakshmi")
    await page.locator(".form-control").nth(1).fill("S")
    await page.locator("[placeholder='Username']").fill("sree")
    await page.locator("//input[@placeholder='City']").fill("TVM")
    await page.locator("//*[@placeholder='State']").fill("Kerala")
    await page.getByPlaceholder("Zip").fill("695011")
    await page.getByLabel("Agree to terms and conditions").check()
    await page.getByRole("button",{name:"Submit form"}).click()
    await page.waitForTimeout(3000) //wait for 3 seconds
})

test .only("Locator1 test", async({page})=>{
await page.goto("https://selenium.qabible.in/simple-form-demo.php")
await page.locator("#single-input-field").fill("Good Morning")
await page.getByRole("button",{name:'Message'}).click()
await page.locator(".form-control").nth(1).fill("25")
await page.getByPlaceholder("Enter Value").nth(1).fill("35")
await page.getByRole("button",{id:"button-two"}).nth(1).click()
await page.waitForTimeout(3000) 
})