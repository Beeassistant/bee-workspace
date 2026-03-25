const { chromium } = require('playwright');

async function uploadPinterestPins() {
  console.log('Starting Pinterest upload...');
  
  const browser = await chromium.launch({ 
    headless: false,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage']
  });
  
  const context = await browser.newContext({
    userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36',
    viewport: { width: 1280, height: 900 },
    locale: 'en-US',
    extraHTTPHeaders: {
      'Accept-Language': 'en-US,en;q=0.9'
    }
  });
  
  const page = await context.newPage();
  
  page.on('console', msg => {
    console.log('Browser:', msg.type(), msg.text());
  });
  
  page.on('pageerror', error => {
    console.log('Page error:', error.message);
  });

  const email = 'bee.assistant1@gmail.com';
  const password = 'Beeassistant!';
  
  // Pin data
  const pins = [
    {
      imagePath: '/Users/beeassistant/.openclaw/workspace/tmp/pin-01-final.png',
      title: 'Setting Up OpenClaw Is Harder Than It Should Be | Done-For-You AI Setup',
      description: 'I kept breaking my OpenClaw setup. Turns out I was doing it wrong. Now I packaged everything you need — 70+ skills, full docs, done-for-you installation. No tech headaches. Just an AI CEO that works. FIRST10 for 50% off.',
      tags: 'AIagent, OpenClaw, AIAutomation, Entrepreneur, SmallBusiness, ProductivityHacks, TimeSaving, TechForNonTech, WorkFromHome, DigitalAssistant'
    },
    {
      imagePath: '/Users/beeassistant/.openclaw/workspace/tmp/pin-02-final.png',
      title: '70+ Skills | 24/7 Autonomous | Done-For-You OpenClaw Setup',
      description: 'Everything you need. Nothing you don\'t. A complete OpenClaw AI agent with 70+ pre-built skills, full documentation, and install guide. Set it up once, let it run forever.',
      tags: 'AItools, OpenClaw, AIAutomation, AIAssistant, BusinessAutomation, PassiveIncome, NoCode, EntrepreneurTools, ProductivityApps, RemoteWork'
    },
    {
      imagePath: '/Users/beeassistant/.openclaw/workspace/tmp/pin-03-final.png',
      title: 'I Kept Breaking My OpenClaw Setup. Then I Found This.',
      description: 'Real talk: I spent weeks trying to configure OpenClaw properly. Documentation was scattered, skills were confusing. This is everything I wish I had from the start. Done-for-you installation, 70+ skills, step-by-step guide.',
      tags: 'OpenClaw, AIAgentSetup, TechTips, Entrepreneur, SmallBusiness, TimeManagement, AutomationTools, ProductivityHacks, DigitalNomad, SideHustle'
    },
    {
      imagePath: '/Users/beeassistant/.openclaw/workspace/tmp/pin-04-final.png',
      title: 'Want an OpenClaw AI That Works Like a CEO? | Done-For-You Setup',
      description: 'Non-technical entrepreneurs: you don\'t have to configure AI yourself. I built an OpenClaw agent for my own business. Then I packaged it so you don\'t have to go through the pain. 70+ skills, done-for-you.',
      tags: 'OpenClaw, AIForBusiness, NonTechnical, Entrepreneur, SmallBusiness, AIAutomation, BusinessGrowth, WorkSmarter, TechSavvy, DigitalAssistant'
    }
  ];

  try {
    // Step 1: Login
    console.log('\n--- Step 1: Logging in ---');
    await page.goto('https://www.pinterest.com/login', { waitUntil: 'domcontentloaded', timeout: 60000 });
    await page.waitForTimeout(3000);
    
    console.log('Login page URL:', page.url());
    
    // Fill email
    const emailInput = await page.waitForSelector('input[type="email"], input[name="email"], #email', { timeout: 10000 });
    await emailInput.fill(email);
    await page.waitForTimeout(1000);
    
    // Click Continue
    const continueBtn = await page.waitForSelector('button[type="submit"]', { timeout: 5000 });
    await continueBtn.click();
    await page.waitForTimeout(2000);
    
    // Fill password
    const passwordInput = await page.waitForSelector('input[type="password"], input[name="password"]', { timeout: 10000 });
    await passwordInput.fill(password);
    await page.waitForTimeout(1000);
    
    // Submit login
    const loginBtn = await page.waitForSelector('button[type="submit"]', { timeout: 5000 });
    await loginBtn.click();
    await page.waitForTimeout(5000);
    
    console.log('After login URL:', page.url());
    await page.screenshot({ path: '/Users/beeassistant/.openclaw/workspace/tmp/pinterest-01-loggedin.png', fullPage: true });
    
    // Step 2: Navigate to create pin
    console.log('\n--- Step 2: Navigate to Create Pin ---');
    await page.goto('https://www.pinterest.com/pin-builder/', { waitUntil: 'domcontentloaded', timeout: 30000 });
    await page.waitForTimeout(3000);
    
    console.log('Pin builder URL:', page.url());
    await page.screenshot({ path: '/Users/beeassistant/.openclaw/workspace/tmp/pinterest-02-builder.png', fullPage: true });
    
    // Step 3: Upload pins one by one
    for (let i = 0; i < pins.length; i++) {
      const pin = pins[i];
      console.log(`\n--- Uploading pin ${i + 1}/${pins.length} ---`);
      
      // Refresh the pin builder page
      await page.goto('https://www.pinterest.com/pin-builder/', { waitUntil: 'domcontentloaded', timeout: 30000 });
      await page.waitForTimeout(3000);
      
      // Look for file input
      const fileInput = await page.$('input[type="file"][accept*="image"], input[type="file"]');
      if (fileInput) {
        console.log('Found file input, uploading...');
        await fileInput.setInputFiles(pin.imagePath);
        await page.waitForTimeout(3000);
        
        // Fill title
        const titleInput = await page.$('input[name="title"], input[placeholder*="title" i], input[id*="title"]');
        if (titleInput) {
          await titleInput.fill(pin.title);
          await page.waitForTimeout(500);
        }
        
        // Fill description
        const descInput = await page.$('textarea[name="description"], textarea[id*="description"], textarea[placeholder*="description" i]');
        if (descInput) {
          await descInput.fill(pin.description);
          await page.waitForTimeout(500);
        }

        // Fill tags/hashtags (Pinterest usually converts comma-separated to individual tags)
        const tagsInput = await page.$('input[aria-label="Tags"], input[placeholder*="tags" i]');
        if (tagsInput) {
          await tagsInput.fill(pin.tags);
          await page.waitForTimeout(1000);
        }

        // Click save/publish button
        const publishBtn = await page.waitForSelector('button[data-test-id="pin-builder-save-button"], button:has-text("Save")', { timeout: 10000 });
        await publishBtn.click();
        await page.waitForTimeout(5000); // Wait for pin to be published
        console.log(`Pin ${i + 1} published!`);
      } else {
        console.log('Error: File input not found on pin builder page.');
        await page.screenshot({ path: `/Users/beeassistant/.openclaw/workspace/tmp/pinterest-error-upload-${i}.png`, fullPage: true });
      }
    }
    
    await page.screenshot({ path: '/Users/beeassistant/.openclaw/workspace/tmp/pinterest-03-final.png', fullPage: true });
    console.log('Final screenshot saved');
    
  } catch (error) {
    console.error('Error:', error.message);
    await page.screenshot({ path: '/Users/beeassistant/.openclaw/workspace/tmp/pinterest-error.png', fullPage: true }).catch(() => {});
  } finally {
    console.log('Done. Keeping browser open for 10 seconds...');
    await page.waitForTimeout(10000);
    await browser.close();
    console.log('Browser closed.');
  }
}

uploadPinterestPins().catch(console.error);
