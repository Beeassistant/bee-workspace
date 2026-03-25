# openclaw.json - Configuration Template

_This is a redacted configuration template. Replace all `[REDACTED]` and `[YOUR_VALUE]` placeholders with your actual values._

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
      "[PROVIDER:default]": {
        "provider": "[PROVIDER]",
        "mode": "[oauth|api_key]"
      }
    },
    "order": {
      "anthropic": [
        "anthropic:manual",
        "anthropic:default"
      ]
    }
  },
  "models": {
    "providers": {
      "[PROVIDER]": {
        "baseUrl": "[YOUR_BASE_URL]",
        "apiKey": "[YOUR_API_KEY]",
        "api": "[api_type]",
        "models": [
          {
            "id": "[MODEL_ID]",
            "name": "[MODEL_DISPLAY_NAME]",
            "reasoning": [true|false],
            "input": ["text"],
            "cost": {
              "input": [COST_PER_1K_INPUT_TOKENS],
              "output": [COST_PER_1K_OUTPUT_TOKENS],
              "cacheRead": [CACHE_READ_COST],
              "cacheWrite": [CACHE_WRITE_COST]
            },
            "contextWindow": [MAX_CONTEXT_WINDOW],
            "maxTokens": [MAX_OUTPUT_TOKENS]
          }
        ]
      }
    }
  },
  "agents": {
    "defaults": {
      "model": {
        "primary": "[YOUR_PRIMARY_MODEL]",
        "fallbacks": [
          "[FALLBACK_1]",
          "[FALLBACK_2]",
          "[FALLBACK_3]"
        ]
      },
      "models": {
        "[MODEL_ID]": {
          "alias": "[short_alias]"
        }
      },
      "workspace": "[PATH_TO_WORKSPACE]",
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
        "model": "[CHEAP_MODEL_FOR_HEARTBEATS]"
      },
      "maxConcurrent": 4,
      "subagents": {
        "maxConcurrent": 8
      }
    }
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
        "apiKey": "[BRAVE_SEARCH_API_KEY]"
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
    "[CHANNEL_NAME]": {
      "enabled": true,
      "[CHANNEL_SPECIFIC_CONFIG]": "[VALUE]"
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
      "token": "[YOUR_GATEWAY_TOKEN]",
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
      "[SKILL_NAME]": {
        "apiKey": "[SKILL_API_KEY]"
      }
    }
  },
  "plugins": {
    "slots": {
      "contextEngine": "lossless-claw"
    },
    "entries": {
      "[PLUGIN_NAME]": {
        "enabled": true
      }
    }
  }
}
```

## Configuration Notes

### Required Steps
1. **API Keys**: Replace all API keys with your own
2. **Model Provider**: Configure your preferred model provider (Anthropic, OpenAI, Google AI, MiniMax, etc.)
3. **Channel Setup**: Configure your messaging channel (Telegram, Discord, WhatsApp, etc.)
4. **Workspace Path**: Set your workspace directory path

### Key Sections
- **`agents.defaults.model`**: Set your primary and fallback models
- **`gateway.auth.token`**: Generate a secure random token for gateway authentication
- **`channels`**: Configure your messaging platform bot tokens
- **`skills.entries`**: Add API keys for any skills you're using

### Security
- Never commit `openclaw.json` with real API keys to version control
- Use environment variables or a secrets manager for sensitive values
- The `gateway.auth.token` controls admin access to your gateway
