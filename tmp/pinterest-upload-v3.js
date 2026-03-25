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
  
  console.log('Logged in, checking...');
  await page.screenshot({ path: '/Users/beeassistant/.openclaw/workspace/tmp/pinterest-after-login.png' });
  
  // Navigate to create pin
  console.log('Navigating to create pin...');
  await page.goto('https://www.pinterest.com/pin/create/', { waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(3000);
  
  // Upload each pin
  const pins = [
    '/Users/beeassistant/.openclaw/workspace/tmp/pin-01-final.png',
    '/Users/beeassistant/.openclaw/workspace/tmp/pin-02-final.png',
    '/Users/beeassistant/.openclaw/workspace/tmp/pin-03-final.png',
    '/Users/beeassistant/.openclaw/workspace/tmp/pin-04-final.png'
  ];
  
  for (let i = 0; i < pins.length; i++) {
    console.log(`Uploading pin ${i+1}: ${pins[i]}`);
    
    await page.goto('https://www.pinterest.com/pin/create/', { waitUntil: 'domcontentloaded' });
    await page.waitForTimeout(2000);
    
    const fileInput = await page.$('input[type="file"]');
    if (fileInput) {
      await fileInput.setInputFiles(pins[i]);
      console.log('File selected, waiting for upload...');
      await page.waitForTimeout(4000);
      
      // Try to add description
      const descSelectors = [
        'textarea[name="description"]',
        'textarea[placeholder*="description" i]',
        'div[contenteditable="true"]'
      ];
      
      for (const sel of descSelectors) {
        try {
          await page.fill(sel, `AI agent setup for entrepreneurs. Stop wasting time on admin work. Get your own AI assistant. #OpenClaw #AIAutomation #Entrepreneur`, { timeout: 2000 });
          console.log('Description added');
          break;
        } catch (e) {}
      }
      
      await page.waitForTimeout(1000);
      
      // Save
      const saveSelectors = [
        'button[type="submit"]',
        'button:has-text("Save")',
        'button:has-text("Publish")'
      ];
      
      for (const sel of saveSelectors) {
        try {
          await page.click(sel, { timeout: 2000 });
          console.log(`Pin ${i+1} saved!`);
          break;
        } catch (e) {}
      }
      
      await page.waitForTimeout(3000);
    } else {
      console.log(`File input not found for pin ${i+1}`);
      await page.screenshot({ path: `/Users/beeassistant/.openclaw/workspace/tmp/pinterest-pin${i}-err.png` });
    }
  }
  
  console.log('All pins processed!');
  await page.waitForTimeout(2000);
  await browser.close();
})();
