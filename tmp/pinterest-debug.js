const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext({
    userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
  });
  const page = await context.newPage();
  
  // Login
  console.log('Logging into Pinterest...');
  await page.goto('https://www.pinterest.com/login', { waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(3000);
  await page.fill('input[type="email"]', 'bee.assistant1@gmail.com');
  await page.fill('input[type="password"]', 'Beeassistant!');
  await page.click('button[type="submit"]');
  await page.waitForTimeout(5000);
  
  console.log('Logged in.');
  
  // Go to create pin page and check what's there
  await page.goto('https://www.pinterest.com/pin/create/', { waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(5000);
  
  console.log('Page URL:', page.url());
  console.log('Page title:', await page.title());
  
  // Check what's on the page
  const html = await page.content();
  console.log('Has file input:', html.includes('type="file"'));
  console.log('Has drag-drop:', html.includes('drag') || html.includes('drop'));
  
  // Get all inputs
  const inputs = await page.$$eval('input', els => els.map(e => ({ type: e.type, name: e.name, id: e.id })));
  console.log('Inputs:', JSON.stringify(inputs));
  
  // Check for iframes
  const iframes = await page.$$eval('iframe', els => els.map(e => ({ id: e.id, src: e.src })));
  console.log('Iframes:', JSON.stringify(iframes));
  
  // Take screenshot
  await page.screenshot({ path: '/Users/beeassistant/.openclaw/workspace/tmp/pinterest-create-debug.png', fullPage: true });
  console.log('Screenshot saved');
  
  // Try a different approach - go to home and look for create button
  await page.goto('https://www.pinterest.com/', { waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(3000);
  
  // Look for any button with "Create" text
  const createBtn = await page.$('button:has-text("Create")');
  console.log('Create button found:', !!createBtn);
  
  await page.screenshot({ path: '/Users/beeassistant/.openclaw/workspace/tmp/pinterest-home.png', fullPage: true });
  
  await browser.close();
})();
