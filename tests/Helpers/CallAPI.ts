import { expect, type Page } from '@playwright/test';

export async function SignInAsGuest(page: Page) {
    await page.getByRole('button', { name: 'Sign in as Guest' }).click();
    await expect(page).toHaveURL('http://localhost:3000/dashboard');
    console.log('Signed in as Guest');
}