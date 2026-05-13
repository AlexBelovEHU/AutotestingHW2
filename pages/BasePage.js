class BasePage {
  constructor(page, path) {
    this.page = page;
    this.path = path;
  }

  async goto() {
    await this.page.goto(this.path, { waitUntil: 'domcontentloaded' });
  }
}

module.exports = BasePage;
