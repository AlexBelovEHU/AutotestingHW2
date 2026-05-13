const BasePage = require('./BasePage');

class AlertsPage extends BasePage {
  constructor(page) {
    super(page, '/alerts');
    this.alertButton = page.locator('#alertButton');
    this.timerAlertButton = page.locator('#timerAlertButton');
    this.confirmButton = page.locator('#confirmButton');
    this.promptButton = page.locator('#promtButton');
    this.confirmResult = page.locator('#confirmResult');
    this.promptResult = page.locator('#promptResult');
  }

  async clih(locator) {
    await locator.evaluate((element) => element.click());
  }

  async alert() {
    await this.clih(this.alertButton);
  }

  async timerAlert() {
    await this.clih(this.timerAlertButton);
  }

  async confirmAlert() {
    await this.clih(this.confirmButton);
  }

  async promptAlert() {
    await this.clih(this.promptButton);
  }
}

module.exports = AlertsPage;
