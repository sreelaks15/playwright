import { expect } from '@playwright/test'

export class CheckoutPage {
    constructor(page) {
        this.checkoutBtn = page.locator(".btn.btn_action.btn_medium.checkout_button")
        this.firstName = page.locator("#first-name")
        this.lastName = page.locator("#last-name")
        this.Zip = page.locator("#postal-code")
        this.continueBtn = page.locator("#continue")
        this.finishBtn = page.locator("#finish")
        this.page = page
    }
    async CheckoutPage(firstname, lastname, zip) {
        await this.checkoutBtn.click()
        await expect(this.page).toHaveURL("https://www.saucedemo.com/checkout-step-one.html")
        await this.firstName.fill(firstname)
        await this.lastName.fill(lastname)
        await this.Zip.fill(zip)
        await this.page.waitForTimeout(3000)
        await this.continueBtn.click()
        await expect(this.page).toHaveURL("https://www.saucedemo.com/checkout-step-two.html")
        await this.finishBtn.click()
        await expect(this.page).toHaveURL("https://www.saucedemo.com/checkout-complete.html")
        const confirmationText = await this.page.locator(".checkout_complete_container").locator(".complete-header").textContent()
        console.log("Final confirmation message is: " + confirmationText)
        await expect(confirmationText).toContain("Thank you")
        await this.page.waitForTimeout(3000)
    }
}