const { chromium } = require('playwright');

async function createPinterestAccount() {
  console.log('Starting Pinterest account creation...');
  
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
    console.log('Navigating to Pinterest...');
    await page.goto('https://www.pinterest.com/', { 
      waitUntil: 'domcontentloaded',
      timeout: 30000 
    });
    
    await page.waitForTimeout(2000);
    console.log('Page loaded. URL:', page.url());
    console.log('Title:', await page.title());
    
    // Look for the Sign Up button
    const signUpButton = await page.$('button[aria-label*="Sign up" i]');
    if (signUpButton) {
      console.log('Found Sign Up button, clicking...');
      await signUpButton.click();
      await page.waitForTimeout(1500);
    } else {
      console.log('No Sign Up button found, looking for email form...');
    }
    
    // Check current state
    console.log('Current URL after click:', page.url());
    
    // Look for email input
    const emailInput = await page.$('input[type="email"], input[name="email"], input[id="email"], input[autocomplete="email"]');
    if (emailInput) {
      console.log('Found email input!');
      await emailInput.fill('bee.assistant1@gmail.com');
      await page.waitForTimeout(500);
      
      // Look for continue/submit button
      const buttons = await page.$$('button');
      for (const btn of buttons) {
        const text = await btn.textContent();
        const ariaLabel = await btn.getAttribute('aria-label');
        if (text?.toLowerCase().includes('continu') || ariaLabel?.toLowerCase().includes('continu')) {
          console.log('Clicking Continue button...');
          await btn.click();
          await page.waitForTimeout(2000);
          break;
        }
      }
      
      console.log('URL after continue:', page.url());
      
      // Look for password input
      const passwordInput = await page.$('input[type="password"], input[name="password"]');
      if (passwordInput) {
        console.log('Found password field!');
        await passwordInput.fill('BeeAssistant2026!@#');
        await page.waitForTimeout(500);
        
        // Find and click submit
        const submitBtn = await page.$('button[type="submit"]');
        if (submitBtn) {
          console.log('Clicking Submit...');
          await submitBtn.click();
          await page.waitForTimeout(3000);
        }
      }
      
      // Look for name field
      const nameInput = await page.$('input[name="name"], input[id="name"], input[placeholder*="name" i]');
      if (nameInput) {
        console.log('Found name field, entering "Bee"...');
        await nameInput.fill('Bee');
        await page.waitForTimeout(500);
        
        const submitBtn = await page.$('button[type="submit"]');
        if (submitBtn) {
          console.log('Clicking Submit...');
          await submitBtn.click();
          await page.waitForTimeout(3000);
        }
      }
    }
    
    console.log('Final URL:', page.url());
    
    // Take screenshot of current state
    await page.screenshot({ path: '/Users/beeassistant/.openclaw/workspace/tmp/pinterest-state.png', fullPage: true });
    console.log('Screenshot saved.');
    
    // Check for error messages
    const errorElements = await page.$$('[aria-label*="error" i], .error, .Error');
    if (errorElements.length > 0) {
      console.log('Errors found on page:');
      for (const el of errorElements) {
        console.log(' -', await el.textContent());
      }
    }
    
    // Save HTML for debugging
    const content = await page.content();
    require('fs').writeFileSync('/Users/beeassistant/.openclaw/workspace/tmp/pinterest-html.html', content);
    console.log('HTML saved to pinterest-html.html');
    
  } catch (error) {
    console.error('Error:', error.message);
    await page.screenshot({ path: '/Users/beeassistant/.openclaw/workspace/tmp/pinterest-error.png' }).catch(() => {});
  } finally {
    await browser.close();
    console.log('Browser closed.');
  }
}

createPinterestAccount().catch(console.error);
