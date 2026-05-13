const { expect, test } = require('@playwright/test');
const SelectMenuPage = require('../pages/SelectMenuPage');

test.describe('DemoQA Select Menu @select-menu', () => {
  test.describe.configure({ mode: 'parallel' });

  test('selects values across all dropdown types @select-menu @positive', async ({ page }) => {
    const selectMenuPage = new SelectMenuPage(page);

    await selectMenuPage.goto();
    await selectMenuPage.selectValue('Group 2, option 1');
    await selectMenuPage.selectOne('Other');
    await selectMenuPage.selectOldStyle('Green');
    await selectMenuPage.selectMultiselect(['Black', 'Blue']);
    const multiselectText = await selectMenuPage.getMultiselectText();

    await expect(selectMenuPage.selectValueContainer).toContainText('Group 2, option 1');
    await expect(selectMenuPage.selectOneContainer).toContainText('Other');
    await expect(selectMenuPage.oldStyleSelect).toHaveValue('2');
    expect(multiselectText).toContain('Black');
    expect(multiselectText).toContain('Blue');
  });

  test('does not keep wrong values selected before or after dropdown interactions @select-menu @negative', async ({ page }) => {
    const selectMenuPage = new SelectMenuPage(page);

    await selectMenuPage.goto();

    await expect(selectMenuPage.selectValueContainer).not.toContainText('Group 2, option 1');
    await expect(selectMenuPage.selectOneContainer).not.toContainText('Other');
    await expect(selectMenuPage.oldStyleSelect).not.toHaveValue('2');
    expect(await selectMenuPage.getMultiselectText()).not.toContain('Black');
    expect(await selectMenuPage.getMultiselectText()).not.toContain('Blue');

    await selectMenuPage.selectValue('Group 2, option 1');
    await selectMenuPage.selectOne('Other');
    await selectMenuPage.selectOldStyle('Green');
    await selectMenuPage.selectMultiselect(['Black', 'Blue']);
    const multiselectText = await selectMenuPage.getMultiselectText();

    await expect(selectMenuPage.selectValueContainer).not.toContainText('Group 1, option 2');
    await expect(selectMenuPage.selectOneContainer).not.toContainText('Prof.');
    expect(multiselectText).not.toContain('Red');
  });
});
