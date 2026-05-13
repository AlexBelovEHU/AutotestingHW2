const { expect, test } = require('@playwright/test');
const ToolTipsPage = require('../pages/ToolTipsPage');

const tooltipTargets = [
  { name: 'button', expected: 'You hovered over the Button' },
  { name: 'textField', expected: 'You hovered over the text field' },
  { name: 'contraryLink', expected: 'You hovered over the Contrary' },
  { name: 'sectionLink', expected: 'You hovered over the 1.10.32' },
];

test.describe('DemoQA Tool Tips @tool-tips', () => {
  test.describe.configure({ mode: 'parallel' });

  test('shows expected text for all tooltips @tool-tips @positive', async ({ page }) => {
    const toolTipsPage = new ToolTipsPage(page);

    await toolTipsPage.goto();

    for (const tooltipTarget of tooltipTargets) {
      const tooltipText = await toolTipsPage.hoverAndRead(tooltipTarget.name);
      expect(tooltipText?.trim()).toBe(tooltipTarget.expected);
      await toolTipsPage.moveAway();
      await expect(toolTipsPage.tooltip).toBeHidden();
    }
  });

  test('keeps tooltips hidden until hover and hides them after mouseout @tool-tips @negative', async ({ page }) => {
    const toolTipsPage = new ToolTipsPage(page);

    await toolTipsPage.goto();
    await expect(toolTipsPage.tooltip).toBeHidden();

    for (const tooltipTarget of tooltipTargets) {
      await toolTipsPage.hoverAndRead(tooltipTarget.name);
      await expect(toolTipsPage.tooltip).toBeVisible();
      await toolTipsPage.moveAway();
      await expect(toolTipsPage.tooltip).toBeHidden();
    }
  });
});
