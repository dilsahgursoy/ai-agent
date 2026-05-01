import { test, expect } from '@playwright/test';

const LOGIN_URL = 'https://practicetestautomation.com/practice-test-login/';
const VALID_USERNAME = 'student';
const VALID_PASSWORD = 'Password123';

test.describe('Login Page Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(LOGIN_URL);
  });

  test('Test 1: Login with valid credentials', async ({ page }) => {
    // Enter valid username
    await page.locator('#username').fill(VALID_USERNAME);
    
    // Enter valid password
    await page.locator('#password').fill(VALID_PASSWORD);
    
    // Click Submit button
    await page.locator('#submit').click();
    
    // Verify success message is displayed
    await expect(page.locator('.post-title')).toContainText('Logged In Successfully');
  });

  test('Test 2: Login with invalid username', async ({ page }) => {
    // Enter invalid username
    await page.locator('#username').fill('invaliduser');
    
    // Enter valid password
    await page.locator('#password').fill(VALID_PASSWORD);
    
    // Click Submit button
    await page.locator('#submit').click();
    
    // Verify error message is displayed
    await expect(page.locator('#error')).toBeVisible();
    await expect(page.locator('#error')).toContainText('Your username is invalid!');
  });

  test('Test 3: Login with invalid password', async ({ page }) => {
    // Enter valid username
    await page.locator('#username').fill(VALID_USERNAME);
    
    // Enter invalid password
    await page.locator('#password').fill('wrongpassword');
    
    // Click Submit button
    await page.locator('#submit').click();
    
    // Verify error message is displayed
    await expect(page.locator('#error')).toBeVisible();
    await expect(page.locator('#error')).toContainText('Your password is invalid!');
  });

  test('Test 4: Login with empty username field', async ({ page }) => {
    // Leave username field empty
    // Enter valid password
    await page.locator('#password').fill(VALID_PASSWORD);
    
    // Click Submit button
    await page.locator('#submit').click();
    
    // Verify error message is displayed
    await expect(page.locator('#error')).toBeVisible();
    await expect(page.locator('#error')).toContainText('Your username is invalid!');
  });

  test('Test 5: Login with empty password field', async ({ page }) => {
    // Enter valid username
    await page.locator('#username').fill(VALID_USERNAME);
    
    // Leave password field empty
    // Click Submit button
    await page.locator('#submit').click();
    
    // Verify error message is displayed
    await expect(page.locator('#error')).toBeVisible();
    await expect(page.locator('#error')).toContainText('Your password is invalid!');
  });

  test('Test 6: Login with empty username and password', async ({ page }) => {
    // Leave both fields empty
    // Click Submit button
    await page.locator('#submit').click();
    
    // Verify error message is displayed
    await expect(page.locator('#error')).toBeVisible();
    await expect(page.locator('#error')).toContainText('Your username is invalid!');
  });

  test('Test 7: Verify page title and elements are present', async ({ page }) => {
    // Verify page title contains 'Practice Test Automation'
    await expect(page).toHaveTitle(/Practice Test Automation/);
    
    // Verify username input field is visible
    await expect(page.locator('#username')).toBeVisible();
    
    // Verify password input field is visible
    await expect(page.locator('#password')).toBeVisible();
    
    // Verify Submit button is visible
    await expect(page.locator('#submit')).toBeVisible();
  });

  test('Test 8: Verify password field masks input', async ({ page }) => {
    // Click on password field
    const passwordField = page.locator('#password');
    await passwordField.click();
    
    // Enter password
    await passwordField.fill('Password123');
    
    // Verify password field type is password (masks input)
    await expect(passwordField).toHaveAttribute('type', 'password');
    
    // Verify the input value is masked (type attribute is password)
    const inputType = await passwordField.getAttribute('type');
    expect(inputType).toBe('password');
  });
});