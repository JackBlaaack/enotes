import { Page } from "@playwright/test";
import { CartPage } from "../pages/cart.page";

export class CartService {
    private cartPage: CartPage;
    constructor(protected page: Page) {
        this.cartPage = new CartPage(page);
    }
}