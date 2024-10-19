import { test, expect } from '@playwright/test';
import { PageManagement } from "..//framework/helpers/PageManagement"
import { SauceDemoLogin } from "..//framework/pages/saucedemo.com/Login/SauceDemoLogin"
import config from "..//config.json";

let swagLogin = new SauceDemoLogin();

test('Launch Swag Labs and Login Successfully', async ({ page }) => {
  await PageManagement.pageLaunch(page, config.SwagLabsUrl);
  await swagLogin.doLogin(page,"standard_user","secret_sauce");
  await page.close();
});