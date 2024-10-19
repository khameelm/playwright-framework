import { Page } from "playwright";
import { PageManagement } from "../../../helpers/PageManagement"

enum Login {
    UserName = '//*[@id="user-name"]',
    Password = '//*[@id="password"]',
    LoginBtn = '//*[@id="login-button"]'
}

export class SauceDemoLogin {

    async doLogin(loginPage: Page, userName: string, password: string) {
        await PageManagement.executeAction(() => loginPage.locator(Login.UserName).fill(userName));
        await PageManagement.executeAction(() => loginPage.locator(Login.Password).fill(password));
        await PageManagement.executeAction(() => loginPage.locator(Login.LoginBtn).click());
    }
}