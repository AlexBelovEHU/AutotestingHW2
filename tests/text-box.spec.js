const { expect, test } = require('@playwright/test');
const TextBoxPage = require('../pages/TextBoxPage');
const { generateInvalidEmail, generateTextBoxData } = require('../utils/testData');

const textBoxDataSets = [generateTextBoxData(), generateTextBoxData()];

test.describe('DemoQA Text Box @text-box', () => {
  test.describe.configure({ mode: 'parallel' });

  textBoxDataSets.forEach((textBoxData, index) => {
    test(`submits random text box data set ${index + 1} @text-box @positive`, async ({ page }) => {
      const textBoxPage = new TextBoxPage(page);

      await textBoxPage.goto();
      await textBoxPage.fillAllFields(textBoxData);
      await textBoxPage.submit();

      await expect(textBoxPage.output).toBeVisible();
      await expect(textBoxPage.nameOutput).toContainText(textBoxData.fullName);
      await expect(textBoxPage.emailOutput).toContainText(textBoxData.email);
      await expect(textBoxPage.currentAddressOutput).toContainText(textBoxData.currentAddress);
      await expect(textBoxPage.permanentAddressOutput).toContainText(textBoxData.permanentAddress);
    });
  });

  test('keeps output hidden when required-like fields are missing and marks invalid email @text-box @negative', async ({ page }) => {
    const textBoxPage = new TextBoxPage(page);
    const invalidEmail = generateInvalidEmail();

    await textBoxPage.goto();
    await textBoxPage.submit();
    await expect(textBoxPage.output).toBeHidden();

    await textBoxPage.email.fill(invalidEmail);
    await textBoxPage.submit();
    await expect(textBoxPage.output).toBeHidden();
    await expect(await textBoxPage.emailIsInvalid()).toBe(true);
  });
});
