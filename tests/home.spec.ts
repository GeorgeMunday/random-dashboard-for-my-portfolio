import { test} from '@playwright/test';

// This is a basic test that checks if the home page shows the sign-in experience.
// npm run test:e2e
// npm run test:e2e -- --project=chromium

// for code generation, run the following command in a separate terminal window while the dev server is running
// npx playwright codegen http://localhost:3000
// npm run dev

test('home page loads correctly', async ({ page }) => {
  await page.goto('http://localhost:3000');
});