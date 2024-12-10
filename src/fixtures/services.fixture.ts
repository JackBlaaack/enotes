import { test as base, request } from "@playwright/test";
import { LoginService } from "../ui/services/login.service";
import { HomeService } from "../ui/services/home.service";
import { CartService } from "ui/services/cart.service";
import { ApiService } from "utils/apiClients/cart.api.service";
import { apiConfig } from "config/apiConfig";

interface IEnotesServices {
    loginPageService: LoginService;
    homePageService: HomeService;
    cartPageService: CartService;
    apiService: ApiService;
}

export const test = base.extend<IEnotesServices>({
    loginPageService: async ({ page }, use) => {
      await use(new LoginService(page));
    },
  
    homePageService: async ({ page }, use) => {
      await use(new HomeService(page));
    },
  
    cartPageService: async ({ page }, use) => {
      await use(new CartService(page));
    },

    apiService: async ({}, use) => {
      const apiContext = await request.newContext();
      await use(new ApiService(apiContext, apiConfig.baseUrl));
    },


});