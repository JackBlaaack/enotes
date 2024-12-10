import { apiConfig } from "config/apiConfig";
import { test as setup } from "../../../fixtures/services.fixture";
import { ADMIN_PASSWORD, ADMIN_USERNAME } from "config/environment";

const authFile = "src/.auth/user.json";

setup("Should login with valid credentials",async function ({ page, request, loginPageService }) {
    await loginPageService.openSite();
    await loginPageService.loginAsAdmin();
    await page.context().storageState({ path: authFile });
  }
);
