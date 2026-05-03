// pages/LoginPage.js
class LoginPage {
  constructor(page) {
    this.page = page;
    this.usernameInput = page.locator('#username');
    this.passwordInput = page.locator('#password');
    this.loginButton = page.locator('#submit');
  }

  async navigate() {
    await this.page.goto('https://practicetestautomation.com/practice-test-login/');
  }

  async login(user, pass) {
    await this.usernameInput.fill(user);
    await this.passwordInput.fill(pass);
    await this.loginButton.click();
  }
}
module.exports = { LoginPage };