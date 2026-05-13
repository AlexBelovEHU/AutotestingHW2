const { expect, test } = require('@playwright/test');
const PracticeFormPage = require('../pages/PracticeFormPage');
const { generateNegativePracticeFormData, generatePracticeFormData } = require('../utils/testData');

const practiceFormDataSets = [generatePracticeFormData(), generatePracticeFormData()];

test.describe('DemoQA Practice Form @practice-form', () => {
  test.describe.configure({ mode: 'parallel' });

  practiceFormDataSets.forEach((formData, index) => {
    test(`submits every field with generated data set ${index + 1} @practice-form @positive`, async ({ page }) => {
      const practiceFormPage = new PracticeFormPage(page);

      await practiceFormPage.goto();
      await practiceFormPage.fillAllFields(formData);
      await practiceFormPage.submit();

      await expect(practiceFormPage.resultModal).toBeVisible();
      await expect(practiceFormPage.getResultValue('Student Name')).toHaveText(`${formData.firstName} ${formData.lastName}`);
      await expect(practiceFormPage.getResultValue('Student Email')).toHaveText(formData.email);
      await expect(practiceFormPage.getResultValue('Gender')).toHaveText(formData.gender);
      await expect(practiceFormPage.getResultValue('Mobile')).toHaveText(formData.mobile);
      await expect(practiceFormPage.getResultValue('Date of Birth')).toHaveText(formData.dateOfBirth.formatted);
      await expect(practiceFormPage.getResultValue('Subjects')).toHaveText(formData.subjects.join(', '));
      await expect(practiceFormPage.getResultValue('Hobbies')).toHaveText(formData.hobbies.join(', '));
      await expect(practiceFormPage.getResultValue('Picture')).toHaveText(formData.pictureFileName);
      await expect(practiceFormPage.getResultValue('Address')).toHaveText(formData.currentAddress);
      await expect(practiceFormPage.getResultValue('State and City')).toHaveText(`${formData.state} ${formData.city}`);
    });
  });

  test('shows validation for missing mandatory fields @practice-form @negative', async ({ page }) => {
    const practiceFormPage = new PracticeFormPage(page);
    const invalidData = generateNegativePracticeFormData();

    await practiceFormPage.goto();
    await practiceFormPage.lastName.fill(invalidData.lastName);
    await practiceFormPage.mobile.fill(invalidData.mobile);
    await practiceFormPage.submit();

    await expect(practiceFormPage.resultModal).toBeHidden();

    const invalidFieldStates = await practiceFormPage.getInvalidFieldStates();
    expect(invalidFieldStates.firstName).toBe(true);
    expect(invalidFieldStates.lastName).toBe(true);
    expect(invalidFieldStates.mobile).toBe(true);
  });
});
