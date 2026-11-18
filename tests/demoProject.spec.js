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

const productTitle = await page.locator(".inventory_item_name")
await productTitle.first().waitFor({state:"visible"}) // if many products are there, inorder to wait for first product
const productCount = await productTitle.count()
console.log("Product count = " + productCount)
const productList = await productTitle.allTextContents() // fetch all products in page and store it in an array
console.log("Product list are: ", productList)
 //sorting (A-Z)
const sortDropdown = await page.locator(".product_sort_container")
await sortDropdown.selectOption("az")
const a2zSortArrray = [...productList].sort() // to take a copy of productlist
await expect (productList).toEqual(a2zSortArrray) // assertion to check sorted and productlist is same
//sorting Z-A
await sortDropdown.selectOption("za")
const productList2 = await productTitle.allTextContents() // fetch all products in page and store it in an array
console.log("Product list are: ", productList2)
const z2aSortArray = [...productList2].sort().reverse()
await expect (productList2).toEqual(z2aSortArray)



const myProduct = "Sauce Labs Fleece Jacket"
for(let i = 0; i < productCount;i++)
{
    const currentProduct = await productTitle.nth(i).textContent()
    if(currentProduct == myProduct)
    {
        const addToCart = await page.locator(".btn.btn_primary.btn_small.btn_inventory").nth(i)
        await addToCart.click()
        console.log("Product added to cart is: " + myProduct)
    }


}




await page.waitForTimeout(3000)


})