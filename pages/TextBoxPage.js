const BasePage = require('./BasePage');

class TextBoxPage extends BasePage {
  constructor(page) {
    super(page, '/text-box');
    this.fullName = page.locator('#userName');
    this.email = page.getByPlaceholder('name@example.com');
    this.currentAddress = page.getByPlaceholder('Current Address');
    this.permanentAddress = page.locator('#permanentAddress');
    this.submitButton = page.getByRole('button', { name: 'Submit' });
    this.output = page.locator('#output');
    this.nameOutput = page.locator('#name');
    this.emailOutput = page.locator('#email');
    this.currentAddressOutput = page.locator('p#currentAddress');
    this.permanentAddressOutput = page.locator('p#permanentAddress');
  }

  async fillAllFields(data) {
    await this.fullName.fill(data.fullName);
    await this.email.fill(data.email);
    await this.currentAddress.fill(data.currentAddress);
    await this.permanentAddress.fill(data.permanentAddress);
  }

  async submit() {
    await this.submitButton.evaluate((element) => element.click());
  }

  async emailIsInvalid() {
    return this.email.evaluate((element) => !element.checkValidity());
  }
}

module.exports = TextBoxPage;
