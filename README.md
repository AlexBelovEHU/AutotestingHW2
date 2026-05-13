npm install
npx playwright install chrome firefox

npx playwright test
npx cross-env VIEWPORT_WIDTH=1366 VIEWPORT_HEIGHT=768 workers=4 runThis=@select-menu playwright test
