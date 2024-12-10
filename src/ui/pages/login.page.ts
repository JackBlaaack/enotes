import { IUserCredentials } from "data/types/user.types.js";
import { BasePage } from "./base.page.js";
import { OkNotes } from "./okNotes.page.js";

export class LoginPage extends OkNotes{
    uniqueElement = "div.site-login h1";
    readonly "Email input" = this.findElement("#loginform-username");
    readonly "Password input" = this.findElement("#loginform-password")
    readonly "Login button" = this.findElement("button[type='submit']");

    async fillCredentialsInput(credentials: IUserCredentials) {
        await this.setValue(this["Email input"], credentials.username);
        await this.page.keyboard.press('Enter');
        await this.setValue(this["Password input"], credentials.password);
        await this.page.keyboard.press('Enter');
    }

    async clickLoginButton() {
        await this.click(this["Login button"]);
    }

}