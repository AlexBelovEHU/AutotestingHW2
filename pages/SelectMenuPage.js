const BasePage = require('./BasePage');

class SelectMenuPage extends BasePage {
  constructor(page) {
    super(page, '/select-menu');
    this.selectValueContainer = page.locator('#withOptGroup');
    this.selectOneContainer = page.locator('#selectOne');
    this.oldStyleSelect = page.locator('#oldSelectMenu');
    this.multiSelectInput = page.locator('#react-select-4-input');
  }

  async selectValue(option) {
    await this.selectValueContainer.click();
    await this.page.locator('#react-select-2-input').fill(option);
    await this.page.locator('#react-select-2-input').press('Enter');
  }

  async selectOne(option) {
    await this.selectOneContainer.click();
    await this.page.locator('#react-select-3-input').fill(option);
    await this.page.locator('#react-select-3-input').press('Enter');
  }

  async selectOldStyle(option) {
    await this.oldStyleSelect.selectOption({ label: option });
  }

  async selectMultiselect(options) {
    for (const option of options) {
      await this.multiSelectInput.click({ force: true });
      await this.multiSelectInput.fill(option);
      await this.multiSelectInput.press('Enter');
    }
  }

  async getMultiselectText() {
    return this.multiSelectInput.evaluate((node) => node.parentElement?.parentElement?.textContent ?? '');
  }
}

module.exports = SelectMenuPage;
