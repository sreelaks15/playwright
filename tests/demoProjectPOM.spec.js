import { test, expect } from '@playwright/test'
import { LoginPage } from '../pages/LoginPage'
import { ProductPage } from '../pages/ProductPage'
import { CheckoutPage } from '../pages/CheckoutPage'

test("Valid username & Invalid password", async ({ page }) => {
    //Login page
    const uName = "standard_user"
    const pwd = "secret_sauce"
    const invalidUN = "test"
    const invalidPwd = "test"
    //checkoutpage
    const firstname = "Sreelakshmi"
    const lastname = "S"
    const zip = "695011"

    //Login Page
    const loginPage = new LoginPage(page)
    await loginPage.navigatePage()
    await loginPage.validateWithWrongPasssword(uName, invalidPwd)
    await loginPage.emptyCredentials()
    await loginPage.validCredentials(uName, pwd)
    //Product page
    const productPage = new ProductPage(page)
    await productPage.navigateProductPage()
    await productPage.sortAtoZ()
    await productPage.sortZtoA()
    await productPage.sortLtoH()
    await productPage.sortHtoL()
    await productPage.AddtoCart()
    //Checkout page
    const checkoutPage = new CheckoutPage(page)
    await checkoutPage.CheckoutPage(firstname, lastname, zip)


})