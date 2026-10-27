import test from '@playwright/test';
test("My first test", async({browser})=>{ 
const context = await browser.newContext()  // to open new browser context without any history .. fresh browser
const page = await context.newPage() //to open new page in the browser
await page.goto("https://www.google.com/")  //to open the url

})
