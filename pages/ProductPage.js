import { expect } from '@playwright/test'

export class ProductPage {
    productCount = 0
    productList = []
    productList2 = []

    constructor(page) {
        this.productTitle = page.locator(".inventory_item_name")
        this.sortDropdown = page.locator(".product_sort_container")
        this.priceList = page.locator(".inventory_item_price")
        this.page = page
        //this.productCount = productCount
        this.cartLink = page.locator(".shopping_cart_link")
        this.addToCart = page.locator(".btn.btn_primary.btn_small.btn_inventory")



    }
    async navigateProductPage() {
        await expect(this.page).toHaveURL("https://www.saucedemo.com/inventory.html")
        console.log("Page title is: ", await this.page.title())
        await expect(this.page).toHaveTitle("Swag Labs") // to verify original title and fetched title is same
        await this.productTitle.first().waitFor({ state: "visible" }) // if many products are there, inorder to wait for first product
        this.productCount = await this.productTitle.count()
        console.log("Product count = " + this.productCount)
        this.productList = await this.productTitle.allTextContents() // fetch all products in page and store it in an array
        console.log("Product list are: ", this.productList)
    }
    async sortAtoZ() {
        await this.sortDropdown.selectOption("az")
        const a2zSortArrray = [...this.productList].sort() // to take a copy of productlist
        await expect(this.productList).toEqual(a2zSortArrray) // assertion to check sorted and productlist is same
    }
    async sortZtoA() {
        await this.sortDropdown.selectOption("za")
        this.productList2 = await this.productTitle.allTextContents() // fetch all products in page and store it in an array
        console.log("Product list are: ", this.productList2)
        const z2aSortArray = [...this.productList2].sort().reverse()
        await expect(this.productList2).toEqual(z2aSortArray)
    }
    async sortLtoH() {
        await this.sortDropdown.selectOption("lohi")

        const priceArray = await this.priceList.allTextContents()
        console.log(priceArray)
        const actualPrice = await priceArray.map(price => parseFloat(price.replace('$', ' ')))//remove $ because its string inorder to make it number
        console.log("Actual Price is: ", actualPrice)
        const sortL2H = [...actualPrice].sort((a, b) => a - b)  // to sort numbers use this method of sorting
        await expect(actualPrice).toEqual(sortL2H)
    }

    async sortHtoL() {
        await this.sortDropdown.selectOption("hilo")
        this.priceList2 = await this.priceList.allTextContents()
        console.log(this.priceList2)
        const actualPrice2 = await this.priceList2.map(price => parseFloat(price.replace('$', ' ')))//remove $ because its string inorder to make it number
        console.log("Actual Price is: ", actualPrice2)
        const sortH2L = [...actualPrice2].sort((a, b) => b - a)
        await expect(actualPrice2).toEqual(sortH2L)
    }
    async AddtoCart(myProduct) {

        for (let i = 0; i < this.productCount; i++) {
            const currentProduct = await this.productTitle.nth(i).textContent()
            if (currentProduct == myProduct) {
                await this.addToCart.nth(i).click()
                console.log("Product added to cart is: " + myProduct)
                break;
            }
        }
        await this.cartLink.click()
    }
}
