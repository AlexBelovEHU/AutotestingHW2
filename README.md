# DemoQA Automation Suite

This project uses Playwright with the Page Object Model to automate five DemoQA scenarios:

- Alerts
- Practice Form
- Text Box
- Tool Tips
- Select Menu

## What is included

- Google Chrome and Mozilla Firefox projects
- Parallel execution with the `workers` environment variable
- Resolution control with `VIEWPORT_WIDTH` and `VIEWPORT_HEIGHT`
- Test filtering by keyword or tag with `runThis`
- Random test data generated with `@faker-js/faker`
- Automatic screenshots, video, and traces on failures
- HTML and JUnit reporting
- GitHub Actions execution on pull requests and once per day

## Install

```bash
npm install
npx playwright install chrome firefox
```

## Run locally

Default run across Chrome and Firefox:

```bash
npx playwright test
```

Run only one browser:

```bash
npx cross-env BROWSERS=chrome playwright test
npx cross-env BROWSERS=firefox playwright test
```

Run with custom resolution, workers, and keyword filter:

```bash
npx cross-env VIEWPORT_WIDTH=1366 VIEWPORT_HEIGHT=768 workers=4 runThis=@select-menu playwright test
```

PowerShell example:

```powershell
$env:VIEWPORT_WIDTH=1366
$env:VIEWPORT_HEIGHT=768
$env:workers=4
$env:runThis='@practice-form'
npx playwright test
```

Open the HTML report:

```bash
npm run test:report
```

## Structure

- `pages/` contains page objects and interaction methods
- `tests/` contains the scenario specs
- `utils/testData.js` contains generated data helpers
- `.github/workflows/playwright.yml` runs the suite in CI

## Notes

- The DemoQA Text Box page does not expose true required-field validation in the application. The negative scenario therefore validates blank submission by checking that no result block is created, and validates the built-in invalid email state.
- Failure screenshots, videos, and traces are written to `test-results/` and uploaded by GitHub Actions as artifacts.