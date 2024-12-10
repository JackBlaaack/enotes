import { expect } from "@playwright/test";
import { BasePage } from "./base.page";
import { OkNotes } from "./okNotes.page";

export class HomePage extends OkNotes{
  uniqueElement = "#dropdownUser";

  readonly "Cart count" = this.findElement("span.basket-count-items");
  readonly "Cart Button" = this.findElement("#dropdownBasket");
  readonly "Redirect to Cart" = this.findElement("a[href='/basket']");
  readonly "Window of cart" = this.findElement("div[aria-labelledby = 'dropdownBasket']");
  readonly "Notes" = this.findElement("div.note-list.row div.note-item.card.h-100 .actionBuyProduct");
  readonly "Notes title" = this.findElement("div.product_name.h6");
  readonly "Discount Notes" = this.findElement("div.note-list.row div.note-item.card.h-100.hasDiscount .actionBuyProduct");
  readonly "Clear button" = this.findElement("//a[@role='button' and contains(text(), 'Очистить корзину')]");
  readonly "Cart note title" = this.findElement("span.basket-item-title");
  readonly "Cart note price" = this.findElement("span.basket-item-price");
  readonly "Cart note count" = this.findElement("span.basket-item-count");
  readonly "Cart total price" = this.findElement("span.basket_price");

  

  async clickCartButton() {
    await this.click(this["Cart Button"]);
    expect(this["Window of cart"]).toBeVisible();
  }

  async isVisibleCart() {
    expect(this["Window of cart"]).toBeVisible();
  }

 
  async clickToNoteByIndex(index: number) {
   
    await this.click(this.Notes.nth(index))
  }

  async clickDiscountNoteByIndex(index: number) {
    await this.click(this["Discount Notes"].nth(index))
  }



  async clickToRedirectCart() {
await this.click(this["Redirect to Cart"]);
  }

  async clickClearButton() {
    await this.click(this["Clear button"]);
  }

  async getAllBooks() {
    return this.findElement(this["Notes title"])
  }

  async getCartCount(): Promise<number> {
    const cartCountText = await this.getText(this["Cart count"]);
    return parseInt(cartCountText || '0', 10);
  }

  async getBookNameByIndex(index: number): Promise<string> {
    const notesTitleText = this["Notes title"].nth(index);
  
    return await this.getText(notesTitleText);
  }

  async getPriceFromCart() {
    return await this.getText(this["Cart total price"]);
  }


  

  async calculateTotalPrice(addedBooks: string[]): Promise<number> {
    let totalPrice = 0;
    for (const bookName of addedBooks) {
      const priceText = await this.page.locator(`css=[data-testid="book-item"] >> text=${bookName}`)
        .locator('css=[data-testid="book-price"]')
        .textContent();
      const price = parseInt(priceText?.replace(/[^\d]/g, '') || '0', 10);
      totalPrice += price;
    }
    return totalPrice;
  }
  


//   // Получить общее количество товаров на странице
  async getTotalBooksCount(): Promise<number> {
    return await (this.Notes).count();
  }
 
//    // Динамически проверяем, что все добавленные товары отображаются в корзине
//    for (const bookName of addedBooks) {
//     const isBookInCart = await page.locator(`css=[data-testid="cart-item"] >> text=${bookName}`).isVisible();
//     expect(isBookInCart).toBeTruthy();
//   }


  
// });
}
