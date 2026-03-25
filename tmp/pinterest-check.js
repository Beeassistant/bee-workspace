const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext({
    userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
  });
  const page = await context.newPage();
  
  console.log('Navigating to Pinterest login...');
  await page.goto('https://www.pinterest.com/login', { waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(5000);
  
  // Get the page content to understand the structure
  const html = await page.content();
  console.log('Page title:', await page.title());
  
  // Try to find any input fields
  const inputs = await page.$$eval('input', els => els.map(e => ({ name: e.name, type: e.type, id: e.id, placeholder: e.placeholder })));
  console.log('Inputs found:', JSON.stringify(inputs, null, 2));
  
  // Try filling with different selectors
  try {
    await page.fill('input[type="email"]', 'bee.assistant1@gmail.com', { timeout: 5000 });
    console.log('Filled email with type=email');
  } catch (e) {
    console.log('Could not fill email type:', e.message);
  }
  
  try {
    await page.fill('#email', 'bee.assistant1@gmail.com', { timeout: 5000 });
    console.log('Filled email with #email');
  } catch (e) {
    console.log('Could not fill #email:', e.message);
  }
  
  await page.screenshot({ path: '/Users/beeassistant/.openclaw/workspace/tmp/pinterest-login.png' });
  console.log('Screenshot saved');
  
  await browser.close();
})();
