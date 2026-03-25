const { chromium } = require('playwright');

async function createPinterestAccount() {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
    viewport: { width: 1280, height: 720 }
  });
  const page = await context.newPage();

  console.log('Navigating to Pinterest signup...');
  await page.goto('https://www.pinterest.com/', { waitUntil: 'networkidle' });

  // Click Sign Up button
  const signUpButton = await page.waitFor('button[aria-label="Sign up"]', { timeout: 10000 }).catch(() => null);
  if (signUpButton) {
    await signUpButton.click();
    await page.waitForTimeout(1000);
  }

  // Look for the email input on the signup form
  console.log('Page title:', await page.title());
  console.log('Current URL:', page.url());

  // Try to find email input
  const emailInput = await page.$('input[type="email"], input[name="email"], input[id="email"]');
  if (emailInput) {
    console.log('Found email input, filling in...');
    await emailInput.fill('bee.assistant1@gmail.com');
    await page.waitForTimeout(500);

    // Look for Continue or Next button
    const continueBtn = await page.$('button[type="submit"], button[aria-label*="continu"], button[aria-label*="Continu"]');
    if (continueBtn) {
      await continueBtn.click();
      await page.waitForTimeout(2000);
      console.log('Clicked continue, URL now:', page.url());
    }
  }

  // Take a screenshot of current state
  await page.screenshot({ path: '/Users/beeassistant/.openclaw/workspace/tmp/pinterest-signup.png', fullPage: false });
  console.log('Screenshot saved to /Users/beeassistant/.openclaw/workspace/tmp/pinterest-signup.png');

  // Check for any form fields
  const inputs = await page.$$('input');
  console.log(`Found ${inputs.length} input fields`);
  for (const input of inputs.slice(0, 10)) {
    const type = await input.getAttribute('type');
    const name = await input.getAttribute('name');
    const id = await input.getAttribute('id');
    const placeholder = await input.getAttribute('placeholder');
    console.log(`  Input: type=${type}, name=${name}, id=${id}, placeholder=${placeholder}`);
  }

  // Check for buttons
  const buttons = await page.$$('button');
  console.log(`Found ${buttons.length} buttons`);
  for (const button of buttons.slice(0, 10)) {
    const label = await button.getAttribute('aria-label');
    const text = await button.textContent();
    console.log(`  Button: aria-label=${label}, text=${text?.trim().slice(0, 50)}`);
  }

  await browser.close();
  console.log('Done.');
}

createPinterestAccount().catch(console.error);
