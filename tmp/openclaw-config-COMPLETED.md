# openclaw.json — COMPLETED Configuration

> ⚠️ Fields marked with `[REDACTED]` or `[YOUR_VALUE]` MUST be replaced with your own values before use.

---

## REDACTED VALUES (replace all of these before running)

| Field Path | What to put instead |
|---|---|
| `models.providers.minimax-portal.apiKey` | Your MiniMax OAuth token |
| `models.providers.anthropic.baseUrl` | `https://api.anthropic.com` |
| `models.providers.anthropic.apiKey` | Your Anthropic API key |
| `models.providers.google.baseUrl` | `https://generativelanguage.googleapis.com` |
| `models.providers.google.apiKey` | Your Google AI API key |
| `agents.defaults.workspace` | Path to your workspace folder |
| `tools.web.search.apiKey` | Your Brave Search API key |
| `channels.telegram.botToken` | Your Telegram bot token from @BotFather |
| `channels.telegram.allowFrom[0]` | Your Telegram user ID |
| `channels.discord.botToken` | Your Discord bot token |
| `channels.whatsapp.accountSid` | Your Twilio Account SID |
| `channels.whatsapp.authToken` | Your Twilio Auth Token |
| `channels.whatsapp.from` | Your WhatsApp number |
| `gateway.auth.token` | Generate with: `openssl rand -hex 32` |
| `skills.entries.goplaces.apiKey` | Your Google Places API key |
| `skills.entries.nano-banana-pro.apiKey` | Your Nano Banana Pro API key |
| `skills.entries.sag.apiKey` | Your ElevenLabs API key |
| `plugins.installs.lossless-claw.installPath` | Path where the extension is installed |

---

## Full Config (JSON)

```json
{
  "meta": {
    "lastTouchedVersion": "[VERSION]",
    "lastTouchedAt": "[TIMESTAMP]"
  },

  "wizard": {
    "lastRunAt": "[TIMESTAMP]",
    "lastRunVersion": "[VERSION]",
    "lastRunCommand": "configure",
    "lastRunMode": "local"
  },

  "auth": {
    "profiles": {
      "anthropic:default": {
        "provider": "anthropic",
        "mode": "api_key"
      },
      "google:manual": {
        "provider": "google",
        "mode": "token"
      },
      "anthropic:manual": {
        "provider": "anthropic",
        "mode": "token"
      },
      "minimax-portal:default": {
        "provider": "minimax-portal",
        "mode": "oauth"
      },
      "[PROVIDER:default]": {
        "provider": "[PROVIDER]",
        "mode": "[oauth|api_key]"
      }
    },
    "order": {
      "anthropic": [
        "anthropic:manual",
        "anthropic:default"
      ],
      "google": [
        "google:manual",
        "google:default"
      ],
      "minimax-portal": [
        "minimax-portal:default"
      ]
    }
  },

  "models": {
    "providers": {
      "minimax-portal": {
        "baseUrl": "https://api.minimax.io/anthropic",
        "apiKey": "[REDACTED - MiniMax OAuth token]",
        "api": "anthropic-messages",
        "models": [
          {
            "id": "MiniMax-M2.5",
            "name": "MiniMax M2.5",
            "reasoning": false,
            "input": ["text"],
            "cost": {
              "input": 0,
              "output": 0,
              "cacheRead": 0,
              "cacheWrite": 0
            },
            "contextWindow": 200000,
            "maxTokens": 8192
          },
          {
            "id": "MiniMax-M2.5-highspeed",
            "name": "MiniMax M2.5 Highspeed",
            "reasoning": true,
            "input": ["text"],
            "cost": {
              "input": 0,
              "output": 0,
              "cacheRead": 0,
              "cacheWrite": 0
            },
            "contextWindow": 200000,
            "maxTokens": 8192
          },
          {
            "id": "MiniMax-M2.5-Lightning",
            "name": "MiniMax M2.5 Lightning",
            "reasoning": true,
            "input": ["text"],
            "cost": {
              "input": 0,
              "output": 0,
              "cacheRead": 0,
              "cacheWrite": 0
            },
            "contextWindow": 200000,
            "maxTokens": 8192
          },
          {
            "id": "MiniMax-M2.7",
            "name": "MiniMax M2.7",
            "reasoning": true,
            "input": ["text"],
            "cost": {
              "input": 0.3,
              "output": 1.2,
              "cacheRead": 0.03,
              "cacheWrite": 0.12
            },
            "contextWindow": 200000,
            "maxTokens": 8192
          }
        ]
      },
      "anthropic": {
        "baseUrl": "[REDACTED - https://api.anthropic.com]",
        "apiKey": "[REDACTED - Your Anthropic API key]",
        "api": "anthropic-messages",
        "models": [
          {
            "id": "claude-opus-4-6",
            "name": "Claude Opus 4",
            "reasoning": true,
            "input": ["text"],
            "cost": {
              "input": 0.015,
              "output": 0.075,
              "cacheRead": 0.001875,
              "cacheWrite": 0.015
            },
            "contextWindow": 200000,
            "maxTokens": 8192
          },
          {
            "id": "claude-sonnet-4-6",
            "name": "Claude Sonnet 4",
            "reasoning": true,
            "input": ["text"],
            "cost": {
              "input": 0.003,
              "output": 0.015,
              "cacheRead": 0.00036,
              "cacheWrite": 0.0018
            },
            "contextWindow": 200000,
            "maxTokens": 8192
          },
          {
            "id": "claude-haiku-4-5",
            "name": "Claude Haiku 4",
            "reasoning": false,
            "input": ["text"],
            "cost": {
              "input": 0.0008,
              "output": 0.004,
              "cacheRead": 0,
              "cacheWrite": 0
            },
            "contextWindow": 200000,
            "maxTokens": 8192
          }
        ]
      },
      "google": {
        "baseUrl": "[REDACTED - https://generativelanguage.googleapis.com]",
        "apiKey": "[REDACTED - Your Google AI API key]",
        "api": "anthropic-messages",
        "models": [
          {
            "id": "gemini-2.5-flash",
            "name": "Gemini 2.5 Flash",
            "reasoning": false,
            "input": ["text"],
            "cost": {
              "input": 0,
              "output": 0,
              "cacheRead": 0,
              "cacheWrite": 0
            },
            "contextWindow": 1000000,
            "maxTokens": 8192
          }
        ]
      }
    }
  },

  "agents": {
    "defaults": {
      "model": {
        "primary": "minimax-portal/MiniMax-M2.7",
        "fallbacks": [
          "google/gemini-2.5-flash",
          "anthropic/claude-sonnet-4-6"
        ]
      },
      "models": {
        "openrouter/moonshotai/kimi-k2.5": {
          "alias": "kimi"
        },
        "anthropic/claude-sonnet-4-6": {
          "alias": "sonnet"
        },
        "anthropic/claude-haiku-4-5": {
          "alias": "haiku"
        },
        "google/gemini-2.5-flash": {
          "alias": "flash",
          "params": {
            "thinking": "off"
          }
        },
        "minimax-portal/MiniMax-M2.5": {
          "alias": "minimax-m2.5"
        },
        "minimax-portal/MiniMax-M2.5-highspeed": {
          "alias": "minimax-m2.5-highspeed"
        },
        "minimax-portal/MiniMax-M2.5-Lightning": {
          "alias": "minimax-m2.5-lightning"
        }
      },
      "workspace": "[REDACTED - /path/to/your/workspace]",
      "contextPruning": {
        "mode": "cache-ttl",
        "ttl": "1h"
      },
      "compaction": {
        "mode": "safeguard"
      },
      "timeoutSeconds": 300,
      "heartbeat": {
        "every": "30m",
        "model": "google/gemini-2.5-flash"
      },
      "maxConcurrent": 4,
      "subagents": {
        "maxConcurrent": 8
      }
    }
  },

  "cache": {
    "enabled": true,
    "ttl": "5m"
  },

  "tools": {
    "profile": "coding",
    "allow": [
      "group:runtime",
      "group:fs",
      "group:web"
    ],
    "web": {
      "search": {
        "enabled": true,
        "provider": "brave",
        "apiKey": "[REDACTED - Your Brave Search API key]"
      },
      "fetch": {
        "enabled": true
      }
    },
    "fs": {
      "workspaceOnly": false
    }
  },

  "messages": {
    "ackReactionScope": "group-mentions"
  },

  "commands": {
    "native": "auto",
    "nativeSkills": "auto",
    "restart": true,
    "ownerDisplay": "raw"
  },

  "session": {
    "dmScope": "per-channel-peer",
    "reset": {
      "mode": "idle",
      "idleMinutes": 10080
    }
  },

  "hooks": {
    "internal": {
      "enabled": true,
      "entries": {
        "boot-md": {
          "enabled": true
        },
        "bootstrap-extra-files": {
          "enabled": true
        },
        "command-logger": {
          "enabled": true
        },
        "session-memory": {
          "enabled": true
        }
      }
    }
  },

  "channels": {
    "telegram": {
      "enabled": true,
      "dmPolicy": "allowlist",
      "botToken": "[REDACTED - Your Telegram bot token]",
      "groups": {
        "-1003624704773": {
          "requireMention": false,
          "enabled": true
        }
      },
      "allowFrom": [
        "[REDACTED - Your Telegram user ID]"
      ],
      "groupPolicy": "allowlist",
      "streaming": "partial"
    },
    "discord": {
      "enabled": false,
      "botToken": "[REDACTED - Your Discord bot token]",
      "guildId": "[REDACTED - Your Discord guild ID]"
    },
    "whatsapp": {
      "enabled": false,
      "accountSid": "[REDACTED - Your Twilio Account SID]",
      "authToken": "[REDACTED - Your Twilio Auth Token]",
      "from": "[REDACTED - Your WhatsApp number]"
    }
  },

  "gateway": {
    "port": 18789,
    "mode": "local",
    "bind": "loopback",
    "controlUi": {
      "allowedOrigins": [
        "http://localhost:18789",
        "http://127.0.0.1:18789"
      ]
    },
    "auth": {
      "mode": "token",
      "token": "[REDACTED - Generate with: openssl rand -hex 32]",
      "rateLimit": {
        "maxAttempts": 10,
        "windowMs": 60000,
        "lockoutMs": 300000
      }
    },
    "tailscale": {
      "mode": "off",
      "resetOnExit": false
    },
    "nodes": {
      "denyCommands": [
        "camera.snap",
        "camera.clip",
        "screen.record",
        "contacts.add",
        "calendar.add",
        "reminders.add",
        "sms.send"
      ]
    }
  },

  "skills": {
    "entries": {
      "goplaces": {
        "apiKey": "[REDACTED - Your Google Places API key]"
      },
      "nano-banana-pro": {
        "apiKey": "[REDACTED - Your Nano Banana Pro API key]"
      },
      "sag": {
        "apiKey": "[REDACTED - Your ElevenLabs API key]"
      }
    }
  },

  "plugins": {
    "allow": [
      "group:runtime",
      "group:fs-read",
      "group:web",
      "npm:@martian-engineering/lossless-claw"
    ],
    "slots": {
      "contextEngine": "lossless-claw"
    },
    "entries": {
      "telegram": {
        "enabled": true
      },
      "google-gemini-cli-auth": {
        "enabled": true
      },
      "lossless-claw": {
        "enabled": true,
        "config": {
          "freshTailCount": 32,
          "contextThreshold": 0.75,
          "incrementalMaxDepth": -1,
          "summaryProvider": "google",
          "summaryModel": "gemini-2.5-flash"
        }
      },
      "minimax-portal-auth": {
        "enabled": true
      }
    },
    "installs": {
      "lossless-claw": {
        "source": "npm",
        "spec": "@martian-engineering/lossless-claw",
        "installPath": "[REDACTED - /path/to/your/extensions/lossless-claw]",
        "version": "0.3.0"
      }
    }
  }
}
```

---

## What was added vs the original template

| Field Added | Why |
|---|---|
| `auth.order.google` | Was missing — needed for Google auth |
| `auth.order.minimax-portal` | Was missing — needed for MiniMax OAuth |
| `models.providers.google` | Full Google AI (Gemini) provider with real model + pricing |
| `models.providers.anthropic` | Full Anthropic provider with real model + pricing |
| `cache` | Referenced in AGENTS.md but absent from template — added |
| `plugins.allow` | Security-critical — was missing entirely |
| `channels.discord` | Added (disabled) — ready to configure |
| `channels.whatsapp` | Added (disabled) — ready to configure |
| `plugins.installs` | Extension install path redacted |
