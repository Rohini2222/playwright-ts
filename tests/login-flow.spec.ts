import { test } from '@playwright/test';
import { LoginPage } from './page-objects/login-page';

test('login flow should authenticate user and show dashboard', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.goto();
    await loginPage.login('Admin', 'admin123');
    await loginPage.expectDashboard();
});
