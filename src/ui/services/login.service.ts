import { Page } from "@playwright/test";
import { HomePage } from "../pages/home.page";
import { LoginPage } from "../pages/login.page";
import { apiConfig } from "config/apiConfig";
import { logStep } from "utils/report/logStep";
import { IUserCredentials } from "data/types/user.types";
import { ADMIN_PASSWORD, ADMIN_USERNAME } from "config/environment";

export class LoginService {
  private loginPage: LoginPage;
  private homePage: HomePage ;
  constructor(protected page: Page) {
    this.loginPage = new LoginPage(page);
    this.homePage = new HomePage(page);
  }


  @logStep()
  async openSite() {
    await this.loginPage.openPage(`${apiConfig.baseUrl}${apiConfig.endpoints.Login}`);
    await this.loginPage.waitForOpened();
  }

  @logStep()
  async login(credentials: IUserCredentials) {
    await this.loginPage.fillCredentialsInput(credentials);
    await this.loginPage.clickLoginButton();
    await this.homePage.waitForOpened();
  }

  @logStep()
  async loginAsAdmin() {
    await this.login({ username: ADMIN_USERNAME, password: ADMIN_PASSWORD });
  }
}
