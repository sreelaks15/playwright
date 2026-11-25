import { expect } from '@playwright/test'

export class LoginPage {
    constructor(page) {
        this.userName = page.locator("#user-name")
        this.password = page.locator("#password")
        this.loginBtn = page.locator("#login-button")
        this.page = page
    }
    async navigatePage() {
        await this.page.goto("https://www.saucedemo.com")
    }
    async validateWithWrongPasssword(Uname, invalidPwd) {
        await this.userName.fill(Uname)
        await this.password.fill(invalidPwd)
        await this.loginBtn.click()
        const errorMessage = await this.page.locator(".error-message-container.error").textContent()
        //const errorMessage = await page.getByRole("alert").textContent()
        console.log("Error message is: " + errorMessage)
        await expect(this.page.locator(".error-message-container.error")).toHaveText(errorMessage)
        await expect(this.page.locator(".error-message-container.error")).toBeVisible()
    }
    async emptyCredentials() {
        await this.userName.fill("")
        await this.password.fill("")
        await this.loginBtn.click()
        const errorMessage1 = await this.page.locator(".error-message-container.error").textContent()
        console.log("Error message is: " + errorMessage1)
        await expect(this.page.locator(".error-message-container.error")).toHaveText(errorMessage1)
        await expect(this.page.locator(".error-message-container.error")).toBeVisible()
    }
    async validCredentials(Uname, Pwd) {
        await this.userName.fill(Uname)
        await this.password.fill(Pwd)
        await this.loginBtn.click()
    }
}