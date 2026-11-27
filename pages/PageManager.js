import { LoginPage } from '../pages/LoginPage'
import { ProductPage } from '../pages/ProductPage'
import { CheckoutPage } from '../pages/CheckoutPage'
import { CartPage } from '../pages/CartPage'
import { LogoutPage } from '../pages/LogoutPage'

export class PageManager {
    constructor(page) {
        this.loginPage = new LoginPage(page)
        this.productPage = new ProductPage(page)
        this.cartpage = new CartPage(page)
        this.checkoutPage = new CheckoutPage(page)
        this.logoutpage = new LogoutPage(page)
    }
    getLoginPage() {
        return this.loginPage
    }
    getProductPage() {
        return this.productPage
    }
    getCartPage() {
        return this.cartpage
    }
    getCheckoutPage() {
        return this.checkoutPage
    }
    getLogoutPage() {
        return this.logoutpage
    }
}