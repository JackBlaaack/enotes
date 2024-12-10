import { expect, Page } from "@playwright/test";
import { CartPage } from "../pages/cart.page";
import { HomePage } from "../pages/home.page";
import { apiConfig } from "config/apiConfig";
import { logStep } from "utils/report/logStep";

export class HomeService {
  private homePage: HomePage;
  private cartPage: CartPage;
  constructor(protected page: Page) {
    this.homePage = new HomePage(page);
    this.cartPage = new CartPage(page);
  }
  @logStep("open main page")
  async openHomePage() {
    await this.homePage.openPage(`${apiConfig.baseUrl}`);
    expect(this.page.url()).toBe(apiConfig.baseUrl);
  }
  @logStep("open cart")
  async openCart() {
    await this.homePage.clickCartButton();
    await this.homePage.isVisibleCart();
  }
  @logStep("Add non-promotional ptoduct")
  async add() {
    const addedNotes: string[] = [];
   
    await this.homePage.clickToNoteByIndex(0);
    await this.homePage.clickCartButton();
    const noteName = await this.homePage.getBookNameByIndex(0);
    addedNotes.push(noteName);
    await this.homePage.waitForElement(this.homePage["Cart count"]);
    const count = await this.homePage.getCartCount()
    expect(count).toBe(addedNotes.length);
  }

  @logStep("Add discount ptoduct")
  async addDiscount() {
    const addedNotes: string[] = [];
   
    await this.homePage.clickDiscountNoteByIndex(0);
    await this.homePage.clickCartButton();
    const noteName = await this.homePage.getBookNameByIndex(0);
    addedNotes.push(noteName);
    await this.homePage.waitForElement(this.homePage["Cart count"]);
    expect(await this.homePage.getCartCount()).toBe(addedNotes.length);
  }
  async addSomeDiscount(count: number) {
for (let i = 0; i < count; i++) {
  await this.homePage.clickDiscountNoteByIndex(0)
}
  }

  @logStep("Add all Notes on the page")
  async addAllNotes() {
    const noteCount = await this.homePage.Notes.count();
    const addedNotes: string[] = [];

    for (let i = 0; i < noteCount; i++) {
      const noteName = await this.homePage.getBookNameByIndex(i);
      addedNotes.push(noteName);
      await this.homePage.clickToNoteByIndex(i);
    }
    await this.homePage.clickCartButton();
      const count = await this.homePage.getCartCount()
      expect(count).toBe(9);
  }
  @logStep("Open Cart Page")
  async redirectToCart() {
    await this.homePage.clickToRedirectCart();
    expect(this.page.url()).toBe(
      `${apiConfig.baseUrl}${apiConfig.endpoints.Basket}`
    );
  }
  @logStep("Empty cart")
  async checkEmptyCart() {
    expect(this.homePage["Cart count"]).toBeVisible();
    expect(await this.homePage.getCartCount()).toBe(0);
  }
  @logStep("Check total price")
  async checkTotalPrice(addedBooks: string[]): Promise<void> {
    const totalPriceFromCart = await this.homePage.getPriceFromCart();
    const calculatedTotalPrice = await this.homePage.calculateTotalPrice(addedBooks);
    expect(totalPriceFromCart).toContain(calculatedTotalPrice.toString());
  }
  @logStep("check count notes in the cart")
  async checkCountNotes() {
  await this.homePage.clickCartButton()
  
  }

  @logStep("Delete product from cart")
  async clear() {
    try {
      const count = await this.homePage.getCartCount();
      if (count > 0) {
        console.log(`current count: ${count}`);
        console.log("Clicking cart button...");
        await this.homePage.clickCartButton();
        await this.homePage.clickClearButton();
        const cartCountAfterClear = await this.homePage.getCartCount();
       expect(cartCountAfterClear).toBe(0)
      }
    } catch (error) {
      throw new Error(`Failed to delete products. reason: \n ${(error as Error).message}`);
    }
  }
}
