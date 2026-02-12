import { test, expect } from '@playwright/test';

test.describe('Basic Commands', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should display banner on load', async ({ page }) => {
    const banner = await page.locator('main').textContent();
    expect(banner).toContain('Type \'help\' to see list of available commands.');
  });

  test('should show help command output', async ({ page }) => {
    await page.locator('#command-input').fill('help');
    await page.keyboard.press('Enter');

    await expect(page.locator('main')).toContainText('Available commands:');
    await expect(page.locator('main')).toContainText('System:');
    await expect(page.locator('main')).toContainText('Productivity:');
  });

  test('should echo text', async ({ page }) => {
    await page.locator('#command-input').fill('echo hello world');
    await page.keyboard.press('Enter');

    await expect(page.locator('main')).toContainText('hello world');
  });

  test('should show current date', async ({ page }) => {
    await page.locator('#command-input').fill('date');
    await page.keyboard.press('Enter');

    const output = await page.locator('main').textContent();
    expect(output).toMatch(/\d{1,2}\/\d{1,2}\/\d{4}/);
  });

  test('should show hostname', async ({ page }) => {
    await page.locator('#command-input').fill('hostname');
    await page.keyboard.press('Enter');

    await expect(page.locator('main')).toContainText('localhost');
  });

  test('should show whoami output', async ({ page }) => {
    await page.locator('#command-input').fill('whoami');
    await page.keyboard.press('Enter');

    await expect(page.locator('main')).toContainText('guest');
  });

  test('should clear history', async ({ page }) => {
    await page.locator('#command-input').fill('echo test');
    await page.keyboard.press('Enter');

    await expect(page.locator('main')).toContainText('test');

    await page.locator('#command-input').fill('clear');
    await page.keyboard.press('Enter');

    const output = await page.locator('main').textContent();
    expect(output).not.toContain('test');
  });

  test('should show vi suggestion', async ({ page }) => {
    await page.locator('#command-input').fill('vi');
    await page.keyboard.press('Enter');

    await expect(page.locator('main')).toContainText('why use vi? try \'emacs\'');
  });

  test('should show vim suggestion', async ({ page }) => {
    await page.locator('#command-input').fill('vim');
    await page.keyboard.press('Enter');

    await expect(page.locator('main')).toContainText('why use vim? try \'emacs\'');
  });

  test('should show emacs suggestion', async ({ page }) => {
    await page.locator('#command-input').fill('emacs');
    await page.keyboard.press('Enter');

    await expect(page.locator('main')).toContainText('why use emacs? try \'vim\'');
  });

  test('should show exit message', async ({ page }) => {
    await page.locator('#command-input').fill('exit');
    await page.keyboard.press('Enter');

    await expect(page.locator('main')).toContainText('Please close the tab to exit.');
  });

  test('should handle unknown command', async ({ page }) => {
    await page.locator('#command-input').fill('unknowncommand');
    await page.keyboard.press('Enter');

    await expect(page.locator('main')).toContainText('unknowncommand: command not found');
  });

  test('should handle empty command', async ({ page }) => {
    await page.keyboard.press('Enter');

    const main = await page.locator('main').textContent();
    expect(main).not.toContain('command not found');
  });
});
