const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext({
    userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
  });
  const page = await context.newPage();
  
  // Login
  console.log('Logging into Pinterest...');
  await page.goto('https://www.pinterest.com/login', { waitUntil: 'networkidle' });
  await page.waitForTimeout(2000);
  
  await page.fill('input[name="email"]', 'bee.assistant1@gmail.com');
  await page.fill('input[name="password"]', 'Beeassistant!');
  await page.click('button[type="submit"]');
  await page.waitForTimeout(5000);
  
  console.log('Logged in, navigating to create pin...');
  await page.goto('https://www.pinterest.com/pin/create/', { waitUntil: 'networkidle' });
  await page.waitForTimeout(3000);
  
  // Upload each pin
  const pins = [
    '/Users/beeassistant/.openclaw/workspace/tmp/pin-01-final.png',
    '/Users/beeassistant/.openclaw/workspace/tmp/pin-02-final.png',
    '/Users/beeassistant/.openclaw/workspace/tmp/pin-03-final.png',
    '/Users/beeassistant/.openclaw/workspace/tmp/pin-04-final.png'
  ];
  
  const tags = 'AIagent AIAutomation AIAssistant AItools OpenClaw Entrepreneur SmallBusiness BusinessTools ProductivityHacks TimeSaving PassiveIncome WorkFromHome DigitalAssistant TechForNonTech NoCode AutomationTips BusinessAutomation';
  
  for (let i = 0; i < pins.length; i++) {
    console.log(`Uploading pin ${i+1}: ${pins[i]}`);
    
    // Go to create pin page
    await page.goto('https://www.pinterest.com/pin/create/', { waitUntil: 'networkidle' });
    await page.waitForTimeout(2000);
    
    // Find file input
    const fileInput = await page.$('input[type="file"]');
    if (fileInput) {
      await fileInput.setInputFiles(pins[i]);
      console.log('File selected, waiting for upload...');
      await page.waitForTimeout(3000);
      
      // Add tags/description
      const descInput = await page.$('textarea[name="description"], textarea[placeholder*="description"], div[contenteditable="true"]');
      if (descInput) {
        await descInput.click();
        await descInput.fill(`AI agent setup for entrepreneurs. Stop wasting time on admin work. Get your own AI assistant. #OpenClaw #AIAutomation #Entrepreneur #SmallBusiness`);
      }
      
      // Add tags
      const tagInput = await page.$('input[placeholder*="tag" i], input[name="tags"]');
      if (tagInput) {
        await tagInput.fill(tags);
      }
      
      await page.waitForTimeout(1000);
      
      // Save/submit
      const saveBtn = await page.$('button[type="submit"], button:has-text("Save"), button:has-text("Publish")');
      if (saveBtn) {
        await saveBtn.click();
        console.log(`Pin ${i+1} saved!`);
        await page.waitForTimeout(3000);
      }
    } else {
      console.log(`File input not found for pin ${i+1}, taking screenshot...`);
      await page.screenshot({ path: `/Users/beeassistant/.openclaw/workspace/tmp/pinterest-upload-${i}.png` });
    }
  }
  
  console.log('Done!');
  await page.waitForTimeout(2000);
  await browser.close();
})();
