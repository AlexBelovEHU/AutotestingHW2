const { expect, test } = require('@playwright/test');
const AlertsPage = require('../pages/AlertsPage');
const { generatePromptText } = require('../utils/testData');

function handleNextDialog(page, handler) {
  return new Promise((resolve) => {
    page.once('dialog', async (dialog) => {
      await handler(dialog);
      resolve();
    });
  });
}

test.describe('DemoQA Alerts @alerts', () => {
  test.describe.configure({ mode: 'parallel' });

  test('handles the simple and delayed alerts @alerts @positive', async ({ page }) => {
    const alertsPage = new AlertsPage(page);
    const alertScenarios = [
      {
        expectedMessage: 'You clicked a button',
        trigger: () => alertsPage.alert(),
      },
      {
        expectedMessage: 'This alert appeared after 5 seconds',
        trigger: () => alertsPage.timerAlert(),
      },
    ];

    await alertsPage.goto();

    for (const scenario of alertScenarios) {
      const dialogPromise = handleNextDialog(page, async (dialog) => {
        expect(dialog.message()).toBe(scenario.expectedMessage);
        await dialog.accept();
      });

      await scenario.trigger();
      await dialogPromise;
    }
  });

  test('handles confirm dialog accept and dismiss flows @alerts @negative', async ({ page }) => {
    const alertsPage = new AlertsPage(page);

    await alertsPage.goto();

    const acceptDialogPromise = handleNextDialog(page, async (dialog) => {
      expect(dialog.message()).toBe('Do you confirm action?');
      await dialog.accept();
    });

    await alertsPage.confirmAlert();
    await acceptDialogPromise;
    await expect(alertsPage.confirmResult).toHaveText('You selected Ok');

    const dismissDialogPromise = handleNextDialog(page, async (dialog) => {
      expect(dialog.message()).toBe('Do you confirm action?');
      await dialog.dismiss();
    });

    await alertsPage.confirmAlert();
    await dismissDialogPromise;
    await expect(alertsPage.confirmResult).toHaveText('You selected Cancel');
  });

  test('handles prompt dialog with generated text @alerts @positive', async ({ page }) => {
    const alertsPage = new AlertsPage(page);
    const promptValue = generatePromptText();

    await alertsPage.goto();

    const dialogPromise = handleNextDialog(page, async (dialog) => {
      expect(dialog.message()).toBe('Please enter your name');
      await dialog.accept(promptValue);
    });

    await alertsPage.promptAlert();
    await dialogPromise;
    await expect(alertsPage.promptResult).toContainText(promptValue);
  });
});
