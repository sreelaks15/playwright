import { test, expect } from '@playwright/test'

test("Boot Strap Modal Test", async ({ page }) => {
    await page.goto("https://selenium.qabible.in/bootstrap-modal.php")
    const singleModalLaunch = await page.getByRole("button", { name: "Launch modal" }).first()
    await singleModalLaunch.click();
    const modal = page.locator("#exampleModalCenter")
    const closeBtn = await modal.locator(".btn.btn-secondary")
    await closeBtn.click();

    await page.waitForTimeout(3000)
})

test.only("Multiple Modal Test", async ({ page }) => {
    await page.goto("https://selenium.qabible.in/bootstrap-modal.php")
    const multipleModalLaunch = await page.getByRole("button", { name: "Launch modal" }).nth(1)
    await multipleModalLaunch.click();
    const firstModal = page.locator("#exampleModalCenter1")
    const launchanotherModalBtn = await firstModal.getByRole("button", { name: "Launch another modal" })
    await launchanotherModalBtn.click();
    const secondModal = page.locator("#exampleModalCenter2")
    const closeBtn = await secondModal.locator(".btn.btn-secondary")
    await page.waitForTimeout(3000)
    await closeBtn.click()
    const closeBtn1 = await firstModal.locator(".btn.btn-secondary")
    await page.waitForTimeout(3000)
    await closeBtn1.click()
    await page.waitForTimeout(3000)
})






