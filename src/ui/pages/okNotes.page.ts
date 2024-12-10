import { BasePage } from "./base.page";

export abstract class OkNotes extends BasePage {
    abstract readonly uniqueElement: string;


    async waitForOpened() {
        await this.waitForElement(this.uniqueElement);
      }
}