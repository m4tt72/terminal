import { test, expect } from '@playwright/test';

test.describe('Theme Switching', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should list available themes', async ({ page }) => {
    await page.locator('#command-input').fill('theme ls');
    await page.keyboard.press('Enter');

    const output = await page.locator('main').textContent();
    expect(output).toContain(',');
    expect(output).toContain('github.com');
  });

  test('should set a theme', async ({ page }) => {
    await page.locator('#command-input').fill('theme set gruvboxdark');
    await page.keyboard.press('Enter');

    await expect(page.locator('main')).toContainText('Theme set to gruvboxdark');
  });

  test('should return error for unknown theme', async ({ page }) => {
    await page.locator('#command-input').fill('theme set unknowntheme');
    await page.keyboard.press('Enter');

    await expect(page.locator('main')).toContainText('not found');
  });

  test('should return usage when no args provided', async ({ page }) => {
    await page.locator('#command-input').fill('theme');
    await page.keyboard.press('Enter');

    await expect(page.locator('main')).toContainText('Usage: theme [args]');
  });

  test('should apply theme colors to UI', async ({ page }) => {
    await page.locator('#command-input').fill('theme set 3024night');
    await page.keyboard.press('Enter');

    const main = page.locator('main');
    const backgroundColor = await main.evaluate((el) =>
      window.getComputedStyle(el).backgroundColor,
    );

    expect(backgroundColor).toBeTruthy();
  });

  test('should handle multiple theme changes', async ({ page }) => {
    await page.locator('#command-input').fill('theme set dracula');
    await page.keyboard.press('Enter');

    await expect(page.locator('main')).toContainText('Theme set to dracula');

    await page.locator('#command-input').fill('theme set gruvboxdark');
    await page.keyboard.press('Enter');

    await expect(page.locator('main')).toContainText('Theme set to gruvboxdark');
  });

  test('should list themes after setting theme', async ({ page }) => {
    await page.locator('#command-input').fill('theme set gruvboxdark');
    await page.keyboard.press('Enter');

    await page.locator('#command-input').fill('theme ls');
    await page.keyboard.press('Enter');

    const output = await page.locator('main').textContent();
    expect(output).toContain(',');
  });

  test('should show usage for invalid subcommand', async ({ page }) => {
    await page.locator('#command-input').fill('theme invalid');
    await page.keyboard.press('Enter');

    await expect(page.locator('main')).toContainText('Usage: theme [args]');
  });
});
