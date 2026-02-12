import { test, expect } from '@playwright/test';

test.describe('Todo Flows', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.locator('#command-input').fill('clear');
    await page.keyboard.press('Enter');
    await page.waitForTimeout(100);
  });

  test('should add a new todo', async ({ page }) => {
    await page.locator('#command-input').fill('todo add Buy milk');
    await page.keyboard.press('Enter');

    await expect(page.locator('main')).toContainText('✓ Added todo #1: Buy milk');
  });

  test('should list todos', async ({ page }) => {
    await page.locator('#command-input').fill('todo add Buy milk');
    await page.keyboard.press('Enter');
    await page.locator('#command-input').fill('todo add Buy bread');
    await page.keyboard.press('Enter');

    await page.locator('#command-input').fill('todo ls');
    await page.keyboard.press('Enter');

    await expect(page.locator('main')).toContainText('[1]');
    await expect(page.locator('main')).toContainText('[2]');
    await expect(page.locator('main')).toContainText('Buy milk');
    await expect(page.locator('main')).toContainText('Buy bread');
  });

  test('should list pending todos', async ({ page }) => {
    await page.locator('#command-input').fill('todo add Task 1');
    await page.keyboard.press('Enter');
    await page.locator('#command-input').fill('todo add Task 2');
    await page.keyboard.press('Enter');
    await page.locator('#command-input').fill('todo done 1');
    await page.keyboard.press('Enter');
    await page.locator('#command-input').fill('clear');
    await page.keyboard.press('Enter');
    await page.waitForTimeout(100);

    await page.locator('#command-input').fill('todo ls pending');
    await page.keyboard.press('Enter');

    const output = await page.locator('main').textContent();
    expect(output).toContain('[2]');
    expect(output).toContain('Task 2');
    expect(output).not.toContain('Task 1');
  });

  test('should list completed todos', async ({ page }) => {
    await page.locator('#command-input').fill('todo add Task 1');
    await page.keyboard.press('Enter');
    await page.locator('#command-input').fill('todo add Task 2');
    await page.keyboard.press('Enter');
    await page.locator('#command-input').fill('todo done 1');
    await page.keyboard.press('Enter');

    await page.locator('#command-input').fill('todo ls completed');
    await page.keyboard.press('Enter');

    await expect(page.locator('main')).toContainText('✓ [1]');
    const output = await page.locator('main').textContent();
    expect(output).toContain('~~Task 1~~');
  });

  test('should complete a todo', async ({ page }) => {
    await page.locator('#command-input').fill('todo add Test task');
    await page.keyboard.press('Enter');

    await page.locator('#command-input').fill('todo done 1');
    await page.keyboard.press('Enter');

    await expect(page.locator('main')).toContainText('✓ Completed todo #1: Test task');
  });

  test('should remove a todo', async ({ page }) => {
    await page.locator('#command-input').fill('todo add To remove');
    await page.keyboard.press('Enter');

    await page.locator('#command-input').fill('todo rm 1');
    await page.keyboard.press('Enter');

    await expect(page.locator('main')).toContainText('✗ Removed todo #1: To remove');

    await page.locator('#command-input').fill('todo ls');
    await page.keyboard.press('Enter');

    const output = await page.locator('main').textContent();
    expect(output).toContain('No todos found');
  });

  test('should clear all todos', async ({ page }) => {
    await page.locator('#command-input').fill('todo add Task 1');
    await page.keyboard.press('Enter');
    await page.locator('#command-input').fill('todo add Task 2');
    await page.keyboard.press('Enter');
    await page.locator('#command-input').fill('clear');
    await page.keyboard.press('Enter');
    await page.waitForTimeout(100);

    await page.locator('#command-input').fill('todo clear');
    await page.keyboard.press('Enter');

    await expect(page.locator('main')).toContainText('Cleared all 2 todo(s)');

    await page.locator('#command-input').fill('todo ls');
    await page.keyboard.press('Enter');

    const output = await page.locator('main').textContent();
    expect(output).toContain('No todos found');
  });

  test('should clear completed todos only', async ({ page }) => {
    await page.locator('#command-input').fill('todo add Task 1');
    await page.keyboard.press('Enter');
    await page.locator('#command-input').fill('todo add Task 2');
    await page.keyboard.press('Enter');
    await page.locator('#command-input').fill('todo done 1');
    await page.keyboard.press('Enter');
    await page.locator('#command-input').fill('clear');
    await page.keyboard.press('Enter');
    await page.waitForTimeout(100);

    await page.locator('#command-input').fill('todo clear completed');
    await page.keyboard.press('Enter');

    await expect(page.locator('main')).toContainText('Cleared 1 completed todo(s)');

    await page.locator('#command-input').fill('todo ls');
    await page.keyboard.press('Enter');

    const output = await page.locator('main').textContent();
    expect(output).toContain('[2]');
    expect(output).toContain('Task 2');
    expect(output).not.toContain('Task 1');
  });

  test('should show statistics', async ({ page }) => {
    await page.locator('#command-input').fill('todo add Task 1');
    await page.keyboard.press('Enter');
    await page.locator('#command-input').fill('todo add Task 2');
    await page.keyboard.press('Enter');
    await page.locator('#command-input').fill('todo add Task 3');
    await page.keyboard.press('Enter');
    await page.locator('#command-input').fill('todo done 1');
    await page.keyboard.press('Enter');

    await page.locator('#command-input').fill('todo stats');
    await page.keyboard.press('Enter');

    await expect(page.locator('main')).toContainText('📊 Todo Statistics:');
    await expect(page.locator('main')).toContainText('Total todos: 3');
    await expect(page.locator('main')).toContainText('Completed: 1');
    await expect(page.locator('main')).toContainText('Pending: 2');
    await expect(page.locator('main')).toContainText('Completion rate: 33.3%');
  });

  test('should use command aliases', async ({ page }) => {
    await page.locator('#command-input').fill('todo add Test task');
    await page.keyboard.press('Enter');

    await page.locator('#command-input').fill('todo list');
    await page.keyboard.press('Enter');

    const output = await page.locator('main').textContent();
    expect(output).toContain('Test task');

    await page.locator('#command-input').fill('todo complete 1');
    await page.keyboard.press('Enter');

    await expect(page.locator('main')).toContainText('✓ Completed todo #1: Test task');

    await page.locator('#command-input').fill('todo add Another task');
    await page.keyboard.press('Enter');

    await page.locator('#command-input').fill('todo remove 2');
    await page.keyboard.press('Enter');

    await expect(page.locator('main')).toContainText('✗ Removed todo #2: Another task');
  });

  test('should show error for unknown todo command', async ({ page }) => {
    await page.locator('#command-input').fill('todo invalid');
    await page.keyboard.press('Enter');

    await expect(page.locator('main')).toContainText('Unknown todo command: invalid');
  });
});
