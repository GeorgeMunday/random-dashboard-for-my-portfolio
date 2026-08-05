import { test, expect, type Page } from '@playwright/test';
import axios from 'axios';

// This is a basic test that checks if the home page shows the sign-in experience.
// npm run test:e2e
// npm run test:e2e -- --project=chromium

// for code generation, run the following command in a separate terminal window while the dev server is running
// npx playwright codegen http://localhost:3000
// npm run dev

async function SignInAsGuest(page: Page) {
    await page.getByRole('button', { name: 'Sign in as Guest' }).click();
    await expect(page).toHaveURL('http://localhost:3000/dashboard');
    console.log('Signed in as Guest');
}

async function CallAPI() {
    console.log('Running test: tests newest comments api');
    const response = await axios.get('http://localhost:3000/api/comments/newest');

    // console.log('Response from API:', response.data);
    expect(response.status).toBe(200);
    expect(response.data).toHaveProperty('documents');
    expect(Array.isArray(response.data.documents)).toBe(true);

    return response.data.documents;
}

test(`tests newest comments api`, async ({ page }) => {
    const newestComments = await CallAPI();

    await page.goto('http://localhost:3000');
    console.log('Running test: tests newest comments api');

    await SignInAsGuest(page);

    // now go to comments page
    console.log('Going to comments page');
    await page.getByRole('button', { name: 'Go to Comments Dashboard' }).click();
    await expect(page).toHaveURL('http://localhost:3000/dashboard/comments');
    console.log('On comments page');

    // now check if the newest comments are visible on the page
    await expect(page.getByText(`Name: ${newestComments[0].name}`)).toBeVisible();
    await expect(page.getByText(`Email: ${newestComments[0].email}`)).toBeVisible();
    await expect(page.getByText(`Comment: ${newestComments[0].text}`)).toBeVisible();

    const rawDate = newestComments[0].createdAt;

    if (!rawDate) {
        console.log('No createdAt date found for the newest comment');
        return;
    }

    const parsedDate = new Date(rawDate);

    if (Number.isNaN(parsedDate.getTime())) {
        console.log('Invalid date format for the newest comment');
    } else {
        const formattedDate = parsedDate.toLocaleString('en-GB', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: false,
        });

        console.log(`Formatted date for the newest comment: ${formattedDate}`);
        await expect(page.getByText(`Date: ${formattedDate}`)).toBeVisible();
    }
});