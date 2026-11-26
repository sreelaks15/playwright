import { expect } from '@playwright/test'

export class LogoutPage {
    constructor(page) {
        this.backHomeBtn = page.locator("#back-to-products")
        this.threeDots = page.locator("#react-burger-menu-btn")
        this.logOut = page.locator("#logout_sidebar_link")
        this.page = page
    }
    async Loggingout() {
        await this.backHomeBtn.click()
        await expect(this.page).toHaveURL("https://www.saucedemo.com/inventory.html")
        await this.threeDots.click()
        await this.logOut.click()
        await expect(this.page).toHaveURL("https://www.saucedemo.com/")

    }
}

