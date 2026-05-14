const path = require('node:path');
const BasePage = require('./BasePage');

class PracticeFormPage extends BasePage {
  constructor(page) {
    super(page, '/automation-practice-form');
    this.firstName = page.getByPlaceholder('First Name');
    this.lastName = page.locator('#lastName');
    this.email = page.getByPlaceholder('name@example.com');
    this.mobile = page.locator('input[placeholder="Mobile Number"]');
    this.dateOfBirthInput = page.locator('#dateOfBirthInput');
    this.subjectsInput = page.locator('#subjectsInput');
    this.currentAddress = page.locator('#currentAddress');
    this.uploadInput = page.locator('#uploadPicture');
    this.submitButton = page.getByRole('button', { name: 'Submit' });
    this.resultModal = page.locator('.modal-content');
    this.genderLabelMale = page.locator('label[for="gender-radio-1"]');
    this.genderLabelFemale = page.locator('label[for="gender-radio-2"]');
    this.genderLabelOther = page.locator('label[for="gender-radio-3"]');
  }


  hobbyLabel(hobby) {
    const map = {
      Sports: 'hobbies-checkbox-1',
      Reading: 'hobbies-checkbox-2',
      Music: 'hobbies-checkbox-3',
    };

    return this.page.locator(`label[for="${map[hobby]}"]`);
  }

  async fillAllFields(data) {
    await this.firstName.fill(data.firstName);
    await this.lastName.fill(data.lastName);
    await this.email.fill(data.email);
    switch (data.gender) {
      case 'Male':
        await this.genderLabelMale.click();
        break;
      case 'Female':
        await this.genderLabelFemale.click();
        break;
      case 'Other':
        await this.genderLabelOther.click();
        break;
    }
    await this.mobile.fill(data.mobile);
    await this.selectDate(data.dateOfBirth);
    await this.fillSubjects(data.subjects);

    for (const hobby of data.hobbies) {
      await this.hobbyLabel(hobby).click();
    }

    await this.uploadInput.setInputFiles(path.resolve(__dirname, '..', 'fixtures', data.pictureFileName));
    await this.currentAddress.fill(data.currentAddress);
    await this.selectStateAndCity(data.state, data.city);
  }

  async submit() {
    await this.submitButton.scrollIntoViewIfNeeded();
    await this.submitButton.click();
  }

  async selectDate(dateOfBirth) {
    const day = String(dateOfBirth.day).padStart(2, '0');

    await this.dateOfBirthInput.click();
    await this.page.locator('.react-datepicker__year-select').selectOption(String(dateOfBirth.year));
    await this.page.locator('.react-datepicker__month-select').selectOption(String(dateOfBirth.monthIndex));
    await this.page
      .locator(`.react-datepicker__day--0${day}:not(.react-datepicker__day--outside-month)`)
      .first()
      .click();
    await this.page.keyboard.press('Escape').catch(() => {});
  }

  async fillSubjects(subjects) {
    for (const subject of subjects) {
      await this.subjectsInput.fill(subject);
      await this.page.locator('.subjects-auto-complete__option').getByText(subject, { exact: true }).click();
    }
  }

  async selectStateAndCity(state, city) {
    await this.page.locator('#state').click();
    await this.page.locator('#react-select-3-input').fill(state);
    await this.page.locator('div[id^="react-select-3-option"]').filter({ hasText: state }).first().click();

    await this.page.locator('#city').click();
    await this.page.locator('#react-select-4-input').fill(city);
    await this.page.locator('div[id^="react-select-4-option"]').filter({ hasText: city }).first().click();
  }

  getResultValue(label) {
    return this.page.locator(`.table-responsive tr:has-text("${label}") td`).nth(1);
  }

  async getInvalidFieldStates() {
    return {
      firstName: (await this.page.locator('#firstName:invalid').count()) > 0,
      lastName: (await this.page.locator('#lastName:invalid').count()) > 0,
      mobile: (await this.page.locator('#userNumber:invalid').count()) > 0,
    };
  }
}

module.exports = PracticeFormPage;
