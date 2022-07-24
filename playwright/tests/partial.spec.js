// @ts-check
const { test, expect } = require('@playwright/test');

test('partial fail', async ({ page }) => {
  await page.goto('https://playwright.dev/');
	console.log('partial fail has some output')
  // create a locator
  const getStarted = page.locator('text=this doenst exist!');

  // Expect an attribute "to be strictly equal" to the value.
  await expect(getStarted).toHaveAttribute('href', '/docs/intro', {timeout: 100});
});

test('partial success', async ({ page }) => {
  await page.goto('https://playwright.dev/');

  console.log('partial success has some output')

  // create a locator
  const getStarted = page.locator('text=Get Started');

  // Expect an attribute "to be strictly equal" to the value.
  await expect(getStarted).toHaveAttribute('href', '/docs/intro', {timeout: 500});
});
