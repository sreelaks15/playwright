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

//sorting price low to high
await sortDropdown.selectOption("lohi")
const priceList = await page.locator(".inventory_item_price")
const priceArray = await priceList.allTextContents()
console.log(priceArray)
const actualPrice = await priceArray.map(price=>parseFloat(price.replace('$',' ')))//remove $ because its string inorder to make it number
console.log("Actual Price is: " , actualPrice)
const sortL2H = [...actualPrice].sort((a,b)=>a-b)  // to sort numbers use this method of sorting
await expect (actualPrice).toEqual(sortL2H)

//sorting price high to low
await sortDropdown.selectOption("hilo")
const priceList2 = await priceList.allTextContents()
console.log(priceList2)
const actualPrice2 = await priceList2.map(price=>parseFloat(price.replace('$',' ')))//remove $ because its string inorder to make it number
console.log("Actual Price is: " , actualPrice2)
const sortH2L = [...actualPrice2].sort((a,b)=>b-a)
await expect (actualPrice2).toEqual(sortH2L)


//Add to cart
const myProduct = "Sauce Labs Fleece Jacket"
for(let i = 0; i < productCount;i++)
{
    const currentProduct = await productTitle.nth(i).textContent()
    if(currentProduct == myProduct)
    {
        const addToCart = await page.locator(".btn.btn_primary.btn_small.btn_inventory").nth(i)
        await addToCart.click()
        console.log("Product added to cart is: " + myProduct)
        break;
    }
}

const cartLink = await page.locator(".shopping_cart_link")
await cartLink.click()
await expect (page).toHaveURL("https://www.saucedemo.com/cart.html")
const cartProduct = await page.locator(".inventory_item_name").allTextContents()
await expect (cartProduct).toContain(myProduct)
console.log("Added item in cart is : "+ cartProduct)

//Checkout
const checkoutBtn = await page.locator(".btn.btn_action.btn_medium.checkout_button")
await checkoutBtn.click()
await expect (page).toHaveURL("https://www.saucedemo.com/checkout-step-one.html")
const firstName = await page.locator("#first-name")
await firstName.fill("Sreelakshmi")
const lastName = await page.locator("#last-name")
await lastName.fill("S")
const Zip = await page.locator("#postal-code")
await Zip.fill("695011")
const continueBtn = await page.locator("#continue")
await continueBtn.click()
await expect (page).toHaveURL("https://www.saucedemo.com/checkout-step-two.html")
const finishBtn = await page.locator("#finish")
await finishBtn.click()
await expect (page).toHaveURL("https://www.saucedemo.com/checkout-complete.html")
const confirmationText = await page.locator(".checkout_complete_container").locator(".complete-header").textContent()
const subConfirmationText = await page.locator(".complete-text").textContent()
console.log("Final confirmation message is: " + confirmationText + subConfirmationText)
await expect(confirmationText).toContain("Thank you")

///logout
const BackHome = await page.locator("#back-to-products")
await BackHome.click()
await expect (page).toHaveURL("https://www.saucedemo.com/inventory.html")
const threeDotMenu = await page.locator("#react-burger-menu-btn")
await threeDotMenu.click()
const logoutBtn = await page.locator("#logout_sidebar_link")
await logoutBtn.click()
await expect (page).toHaveURL("https://www.saucedemo.com/")

await page.waitForTimeout(3000)

})