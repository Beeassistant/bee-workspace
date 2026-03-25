const { chromium } = require('playwright');

async function createQuoraAccount() {
  console.log('Starting Quora account creation...');
  
  const browser = await chromium.launch({ 
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage']
  });
  
  const context = await browser.newContext({
    userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
    viewport: { width: 1280, height: 800 },
    locale: 'en-US'
  });
  
  const page = await context.newPage();
  
  // Capture console messages
  page.on('console', msg => {
    if (msg.type() === 'error') {
      console.log('Browser error:', msg.text());
    }
  });
  
  try {
    console.log('Navigating to Quora signup...');
    await page.goto('https://www.quora.com/signup', { 
      waitUntil: 'domcontentloaded',
      timeout: 30000 
    });
    
    await page.waitForTimeout(2000);
    console.log('Page loaded. URL:', page.url());
    console.log('Title:', await page.title());
    
    // Fill in name
    const nameInput = await page.$('input[name="name"], input[id="name"], input[placeholder*="name" i]');
    if (nameInput) {
      console.log('Found name input, filling in...');
      await nameInput.fill('Bee Assistant');
      await page.waitForTimeout(500);
    }

    // Fill in email
    const emailInput = await page.$('input[type="email"], input[name="email"], input[id="email"], input[autocomplete="email"]');
    if (emailInput) {
      console.log('Found email input, filling in...');
      await emailInput.fill('bee.assistant1@gmail.com');
      await page.waitForTimeout(500);
    }

    // Fill in password
    const passwordInput = await page.$('input[type="password"], input[name="password"]');
    if (passwordInput) {
      console.log('Found password input, filling in...');
      await passwordInput.fill('BeeAssistant2026!@#');
      await page.waitForTimeout(500);
    }
    
    // Click signup button
    const signUpButton = await page.$('button[type="submit"], button:has-text("Sign Up"), input[value="Sign Up"]');
    if (signUpButton) {
      console.log('Found Sign Up button, clicking...');
      await signUpButton.click();
      await page.waitForTimeout(5000); // Wait for potential redirect or loading
    } else {
      console.log('No explicit Sign Up button found, assuming form submission via Enter or JS.');
    }
    
    console.log('Final URL:', page.url());
    
    // Take screenshot of current state
    await page.screenshot({ path: '/Users/beeassistant/.openclaw/workspace/tmp/quora-state.png', fullPage: true });
    console.log('Screenshot saved.');
    
    // Check for error messages or verification
    const errorElements = await page.$$('[aria-label*="error" i], .error, .Error, :has-text("verify"), :has-text("phone"), :has-text("captcha")');
    if (errorElements.length > 0) {
      console.log('Possible errors/verification found on page:');
      for (const el of errorElements) {
        console.log(' -', await el.textContent().catch(() => '[text not found]'));
      }
    }
    
    // Save HTML for debugging
    const content = await page.content();
    require('fs').writeFileSync('/Users/beeassistant/.openclaw/workspace/tmp/quora-html.html', content);
    console.log('HTML saved to quora-html.html');
    
  } catch (error) {
    console.error('Error:', error.message);
    await page.screenshot({ path: '/Users/beeassistant/.openclaw/workspace/tmp/quora-error.png' }).catch(() => {});
  } finally {
    await browser.close();
    console.log('Browser closed.');
  }
}

createQuoraAccount().catch(console.error);
