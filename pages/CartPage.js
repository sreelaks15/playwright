import { expect } from '@playwright/test'

export class CartPage {
    cartProduct = []
    constructor(page) {
        this.page = page
        this.cartLink = page.locator(".shopping_cart_link")
    }
    async ValidateCartItem(myProduct) {
        await expect(this.page).toHaveURL("https://www.saucedemo.com/cart.html")
        const cartProduct = await this.page.locator(".inventory_item_name").allTextContents()
        console.log(cartProduct)
        await expect(cartProduct).toContain(myProduct)
        console.log("Added item in cart is : " + cartProduct)
    }
}
