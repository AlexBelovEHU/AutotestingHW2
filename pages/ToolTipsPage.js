const BasePage = require('./BasePage');

class ToolTipsPage extends BasePage {
  constructor(page) {
    super(page, '/tool-tips');
    this.button = page.locator('#toolTipButton');
    this.textField = page.locator('#toolTipTextField');
    this.contraryLink = page.getByRole('link', { name: 'Contrary' });
    this.sectionLink = page.getByRole('link', { name: '1.10.32' });
    this.tooltip = page.locator('.tooltip-inner');
  }

  getTarget(name) {
    const targets = {
      button: this.button,
      textField: this.textField,
      contraryLink: this.contraryLink,
      sectionLink: this.sectionLink,
    };

    return targets[name];
  }

  async hoverAndRead(name) {
    const target = this.getTarget(name);

    await target.scrollIntoViewIfNeeded();

    for (let attempt = 0; attempt < 2; attempt += 1) {
      await target.hover({ force: true });

      try {
        await this.tooltip.waitFor({ state: 'visible', timeout: 5_000 });
        return this.tooltip.textContent();
      } catch (error) {
        await this.moveAway();
      }
    }

    throw new Error(`Tooltip did not become visible for target: ${name}`);
  }

  async moveAway() {
    await this.page.locator('body').hover({ position: { x: 5, y: 5 } }).catch(async () => {
      await this.page.mouse.move(0, 0);
    });
    await this.tooltip.waitFor({ state: 'hidden', timeout: 5_000 }).catch(() => {});
  }
}

module.exports = ToolTipsPage;
