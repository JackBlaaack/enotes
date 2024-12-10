import { AuthService } from "utils/apiClients/auth.api.service";
import { test } from "../../fixtures/services.fixture";
import { apiConfig } from "config/apiConfig";
import { ADMIN_PASSWORD, ADMIN_USERNAME } from "config/environment";


test.describe("Cart", async function() {
test.beforeEach(async function ({page,homePageService, apiService}) {
  // const authService = new AuthService(apiConfig.baseUrl);
  //   await authService.init();
  //   await authService.login(ADMIN_USERNAME,ADMIN_PASSWORD);
  //   const storageState = await authService.getCookies();
  //   await page.context().addCookies(storageState.cookies);
  await homePageService.openHomePage();
  await homePageService.clear();
  await homePageService.checkEmptyCart()
})

  test('Тест-кейс 1. Переход в пустую корзину', async ({ homePageService}) => {
  await homePageService.openCart();
  await homePageService.redirectToCart()
  await homePageService.checkEmptyCart()

      });

      test('Тест-кейс 2. Переход в корзину с 1 неакционным товаром', async ({ homePageService }) => {
      
        await homePageService.add()
        await homePageService.checkTotalPrice([]);
      });

      test('Тест-кейс 3. Переход в корзину с 1 акционным товаром', async ({ homePageService }) => {
        await homePageService.addDiscount()
        await homePageService.checkTotalPrice([]);
      });

      test('Тест-кейс 4. Переход в корзину с 9 разными товарами', async ({ homePageService }) => {
        await homePageService.addDiscount();
        await homePageService.addAllNotes();
        await homePageService.checkTotalPrice([]);

      });

      test('Тест-кейс 5. Переход в корзину с 9 акционными товарами одного наименования', async ({ homePageService }) => {
     await homePageService.addSomeDiscount(9);
     await homePageService.checkTotalPrice([]);

      })
      
  });  