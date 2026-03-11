# SEO + UGC Infrastructure Setup

## Folders Created
- `seo-automation/` - 4-phase autonomous SEO system
- `ugc-automation/` - Video generation pipeline

## Config Templates
- `seo-automation/config/niches.json` - Cambodia Life niches configured
- `seo-automation/config/api_keys.json` - Template for Brave/Reddit/NewsAPI/WordPress
- `ugc-automation/config/api_keys.json` - Template for ElevenLabs/HeyGen/Pexels/OpenAI

## gws Skills
- Linked to `/Users/beeassistant/.openclaw/skills/`
- Skills: gws-calendar, gws-drive, gws-gmail, gws-sheets, gws-docs, gws-shared

## Next Steps (Requires User)
1. Add API keys to config files
2. Run `npm install -g @googleworkspace/cli`
3. Run `gws auth login -s drive,gmail,calendar`
4. Test: `gws drive files list --params '{"pageSize": 5}'`

## Content Execution (ON HOLD per user)
- SEO trend discovery
- Article generation  
- UGC video creation
- Publishing automation

Ready for content phase when you give the go-ahead.
