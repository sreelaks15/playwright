import { test, expect } from '@playwright/test'
import { PageManager } from '../pages/PageManager'
import testdata from "../Utils/testdata.json"
const testString = JSON.stringify(testdata)
const testobj = JSON.parse(testString)


test("Valid username & Invalid password", async ({ page }) => {
 
    const POM = new PageManager(page)
    //Login Page
    const loginPage = POM.getLoginPage()
    const productPage = POM.getProductPage()
    const cartpage = POM.getCartPage()
    const checkoutPage = POM.getCheckoutPage()
    const logoutpage = POM.getLogoutPage()

    await loginPage.navigatePage()
    await loginPage.validateWithWrongPasssword(testobj.uName, testobj.invalidPwd)
    await loginPage.emptyCredentials()
    await loginPage.validCredentials(testobj.uName, testobj.pwd)
    //Product page
    
    await productPage.navigateProductPage()
    await productPage.sortAtoZ()
    await productPage.sortZtoA()
    await productPage.sortLtoH()
    await productPage.sortHtoL()
    await productPage.AddtoCart(testobj.myProduct)
    //cart page
    
    await cartpage.ValidateCartItem(testobj.myProduct)
    //Checkout page
    
    await checkoutPage.CheckoutPage(testobj.firstname, testobj.lastname, testobj.zip)
    //logout page
    
    await logoutpage.Loggingout()
})