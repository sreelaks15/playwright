import { test, expect } from "@playwright/test"


test("Checkbox test", async ({ page }) => {
    await page.goto("https://selenium.qabible.in/index.php");
    const inputForm = page.getByRole("link", { name: "Input Form" })
    await inputForm.click()
    const checkboxDemo = page.getByRole("link", { name: "Checkbox Demo" })
    await checkboxDemo.click()
    const checkbox1 = page.getByLabel("Click on this check box")
    await checkbox1.check();
    await expect(checkbox1).toBeChecked()  // assertion to check if the checkbox is checked
    const result = await checkbox1.isChecked()
    console.log("Is checkbox checked? : " + result)
    await expect(result).toBeTruthy()
    await checkbox1.uncheck();
    const result1 = await checkbox1.isChecked()
    console.log("Is checkbox checked? : " + result1)
    await expect(result1).toBeFalsy() // assertion to check if the result is false
    await page.waitForTimeout(3000)
})  