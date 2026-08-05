import { test, expect } from '@playwright/test';

import { CallAPI } from '../Helpers/SignIn';
import { SignInAsGuest } from '../Helpers/CallAPI';

async function FormatDate(dateString: string): Promise<string> {
    if (!dateString) {
        console.log('No createdAt date found for the newest comment');
        return '';
    }

    if (Number.isNaN(new Date(dateString).getTime())) {
        console.log('Invalid date format for the newest comment');
        return '';
    } else {
        const date = new Date(dateString);
        return date.toLocaleString('en-GB', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: false,
        });
    }
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
    const formattedDate = await FormatDate(newestComments[0].createdAt);
    await expect(page.getByText(`Date: ${formattedDate}`)).toBeVisible();
});
