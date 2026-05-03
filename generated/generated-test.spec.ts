import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';

test.describe('Login Page Test Suite', () => {
  let loginPage: LoginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.navigate();
  });

  test('TC001: Login with valid credentials', async ({ page }) => {
    // Step 1: Navigate to login page (done in beforeEach)
    // Step 2: Verify username field is visible
    await expect(loginPage.usernameInput).toBeVisible();
    
    // Step 3: Verify password field is visible
    await expect(loginPage.passwordInput).toBeVisible();
    
    // Step 4: Verify submit button is visible
    await expect(loginPage.loginButton).toBeVisible();
    
    // Step 5: Enter valid credentials and submit
    await loginPage.login('student', 'Password123');
    
    // Expected result: User is logged in successfully
    await expect(page).toHaveURL(/.*success|dashboard|logged/i);
    const successMessage = page.locator('h1.post-title');
    await expect(successMessage).toBeVisible();
  });

  test('TC002: Login with invalid username', async ({ page }) => {
    // Navigate and verify page elements
    await expect(loginPage.usernameInput).toBeVisible();
    await expect(loginPage.passwordInput).toBeVisible();
    
    // Enter invalid username and valid password
    await loginPage.login('invaliduser', 'Password123');
    
    // Expected result: Error message is displayed
    const errorMessage = page.locator('#error');
    await expect(errorMessage).toBeVisible();
  });

  test('TC003: Login with invalid password', async ({ page }) => {
    // Navigate and verify page elements
    await expect(loginPage.usernameInput).toBeVisible();
    await expect(loginPage.passwordInput).toBeVisible();
    
    // Enter valid username and invalid password
    await loginPage.login('student', 'wrongpassword');
    
    // Expected result: Error message is displayed
    const errorMessage = page.locator('#error');
    await expect(errorMessage).toBeVisible();
  });

  test('TC004: Login with empty username', async ({ page }) => {
    // Navigate and verify page elements
    await expect(loginPage.usernameInput).toBeVisible();
    
    // Leave username empty and enter password
    await loginPage.passwordInput.fill('Password123');
    await loginPage.loginButton.click();
    
    // Expected result: Validation error or form prevention
    // Check for validation message or that we're still on login page
    const validationError = page.locator('text=/required|empty|please enter/i');
    const isValidationVisible = await validationError.isVisible().catch(() => false);
    const isStillOnLoginPage = page.url().includes('login');
    
    expect(isValidationVisible || isStillOnLoginPage).toBeTruthy();
  });

  test('TC005: Login with empty password', async ({ page }) => {
    // Navigate and verify page elements
    await expect(loginPage.passwordInput).toBeVisible();
    
    // Enter username but leave password empty
    await loginPage.usernameInput.fill('student');
    await loginPage.loginButton.click();
    
    // Expected result: Validation error or form prevention
    const validationError = page.locator('text=/required|empty|please enter/i');
    const isValidationVisible = await validationError.isVisible().catch(() => false);
    const isStillOnLoginPage = page.url().includes('login');
    
    expect(isValidationVisible || isStillOnLoginPage).toBeTruthy();
  });

  test('TC006: Login with empty credentials', async ({ page }) => {
    // Navigate to login page
    await expect(loginPage.usernameInput).toBeVisible();
    await expect(loginPage.passwordInput).toBeVisible();
    
    // Leave both fields empty and click submit
    await loginPage.loginButton.click();
    
    // Expected result: Validation error for both fields
    const validationError = page.locator('text=/required|empty|please enter/i');
    const isValidationVisible = await validationError.isVisible().catch(() => false);
    const isStillOnLoginPage = page.url().includes('login');
    
    expect(isValidationVisible || isStillOnLoginPage).toBeTruthy();
  });

  test('TC007: Verify page elements visibility', async ({ page }) => {
    // Verify username field is visible
    await expect(loginPage.usernameInput).toBeVisible();
    
    // Verify password field is visible
    await expect(loginPage.passwordInput).toBeVisible();
    
    // Verify submit button is visible
    await expect(loginPage.loginButton).toBeVisible();
    
    // Verify page title/heading is visible
    const pageTitle = page.locator('h1, h2, [class*="title"], [class*="heading"]');
    await expect(pageTitle.first()).toBeVisible();
  });

  test('TC008: Verify password field masking', async ({ page }) => {
    // Navigate to login page
    await expect(loginPage.passwordInput).toBeVisible();
    
    // Verify password field has type="password" (masked)
    const passwordType = await loginPage.passwordInput.getAttribute('type');
    expect(passwordType).toBe('password');
    
    // Enter password and verify it's masked
    await loginPage.passwordInput.fill('Password123');
    
    // Verify the input value is masked (playwright shows it as the actual value, but the type is password)
    const inputType = await loginPage.passwordInput.getAttribute('type');
    expect(inputType).toBe('password');
  });
});