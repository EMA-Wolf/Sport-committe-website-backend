# Migration Guide: v1 → Modular Monolith

This guide explains how to migrate from the old v1 structure to the new modular monolith architecture.

## 🔄 What Changed?

### Old Structure (v1)

```
src/
├── v1/
│   ├── controllers/
│   ├── routes/
│   ├── services/
│   └── webhooks/
├── config/
├── middleware/
└── server.ts
```

### New Structure (Modular Monolith)

```
src/
├── modules/          # Domain modules
│   ├── teams/
│   ├── matches/
│   ├── seasons/
│   ├── players/
│   ├── sports/
│   └── webhooks/
├── shared/           # Shared utilities
│   ├── types/
│   ├── interfaces/
│   ├── utils/
│   └── middleware/
├── config/
├── app.ts           # NEW: App setup
└── server.ts        # Updated
```

## 📊 Module Mapping

### Old → New

| Old Location                            | New Location                                   |
| --------------------------------------- | ---------------------------------------------- |
| `v1/webhooks/sanityWebhook.ts`          | `modules/webhooks/handlers/` (split by entity) |
| `v1/webhooks/sanityDeletionWebhooks.ts` | `modules/webhooks/handlers/` (split by entity) |
| `v1/webhooks/sanity.controller.ts`      | `modules/webhooks/webhooks.controller.ts`      |
| `v1/routes/webhooks.routes.ts`          | `modules/webhooks/webhooks.routes.ts`          |
| `v1/services/PlayerStats.ts`            | Can stay or move to `modules/players/stats/`   |
| `middleware/error.ts`                   | `shared/middleware/error.ts`                   |

## 🔌 Webhook Handler Migration

### Before (v1)

```typescript
// v1/webhooks/sanityWebhook.ts
export const handleSanityTeamWebhook = async (body: any) => {
  // All logic mixed together
  const sport = await prisma.sports.findFirst({ where: { name: sport } });
  await prisma.team.upsert({ ... });
};
```

### After (Modular)

```typescript
// modules/webhooks/handlers/team-webhook.handler.ts
export const handleTeamCreateOrUpdate = async (context: WebhookContext) => {
  validatePayload(payload, ['_id', 'name', 'sport']);

  const teamData = { ... };
  await teamsService.upsert(teamData);
};

// modules/teams/teams.service.ts
export class TeamsService {
  async upsert(teamData: any) {
    const sport = await sportsRepo.ensureSportExists(teamData.sport);
    return await teamsRepo.upsertTeam(data);
  }
}

// modules/teams/teams.repository.ts
export const upsertTeam = async (id: string, data: any) => {
  return await prisma.team.upsert({ ... });
};
```

## 🚀 Running the New Backend

### 1. The new structure is already in place!

All modules have been created:

- ✅ Sports module
- ✅ Teams module
- ✅ Seasons module
- ✅ Players module
- ✅ Matches module
- ✅ Webhooks module

### 2. Start the server

```bash
npm run dev
```

The server will start with the new modular structure!

### 3. Test the endpoints

```bash
# Health check
curl http://localhost:3000

# Get all teams
curl http://localhost:3000/api/v1/teams

# Test webhook (create/update)
curl -X POST http://localhost:3000/api/v1/webhooks/sanity \
  -H "Content-Type: application/json" \
  -d '{"_type":"teams","_id":"123","name":"Test Team","sport":"Football"}'

# Test webhook (delete)
curl -X DELETE http://localhost:3000/api/v1/webhooks/sanity \
  -H "Content-Type: application/json" \
  -d '{"_type":"teams","_id":"123"}'
```

## 📝 Updating Sanity Webhook Configuration

Update your Sanity webhook URLs from:

```
OLD: http://your-domain.com/v1/webhook/test
```

To:

```
NEW: http://your-domain.com/api/v1/webhooks/sanity
```

## 🗑️ Cleanup Old Files (Optional)

After verifying the new structure works, you can optionally remove:

```bash
# Old v1 structure (keep for reference during transition)
src/v1/
src/module/  # Empty folders from old structure
```

**⚠️ Important**: Keep these for now until you've fully tested the new structure!

## 🔧 PlayerStats Integration

The old `v1/services/PlayerStats.ts` and `v1/controllers/playerstats.controller.ts` still exist and work with the new structure. You can:

### Option 1: Keep as is (works fine)

The existing player stats routes are still registered.

### Option 2: Integrate into Players module (recommended)

Move player stats into the players module:

```
modules/
└── players/
    ├── stats/
    │   ├── player-stats.repository.ts
    │   ├── player-stats.service.ts
    │   ├── player-stats.controller.ts
    │   └── player-stats.routes.ts
    ├── players.repository.ts
    ├── players.service.ts
    └── ...
```

## ✅ Verification Checklist

- [ ] Server starts without errors
- [ ] Health check endpoint responds: `GET /`
- [ ] Team endpoints work: `GET /api/v1/teams`
- [ ] Match endpoints work: `GET /api/v1/matches`
- [ ] Webhook creation works: `POST /api/v1/webhooks/sanity`
- [ ] Webhook deletion works: `DELETE /api/v1/webhooks/sanity`
- [ ] Sanity webhooks successfully sync data
- [ ] Database operations complete successfully

## 🐛 Troubleshooting

### Issue: Module not found errors

**Solution**: Make sure all imports use the correct paths:

```typescript
// ✅ Correct
import prisma from "../../config/prisma";
import { TeamsService } from "../../teams/teams.service";

// ❌ Wrong
import prisma from "../config/prisma";
```

### Issue: Webhook not processing

**Solution**: Check that the `_type` field in webhook payload matches handler registry:

- `teams` → team-webhook.handler.ts
- `fixtures` → match-webhook.handler.ts
- `seasons` → season-webhook.handler.ts
- `players` → player-webhook.handler.ts

### Issue: Database connection errors

**Solution**: Verify your `.env` file has correct credentials:

```env
DATABASE_URL="postgresql://..."
DIRECT_URL="postgresql://..."
```

## 🎯 Benefits You'll See

1. **Better Organization**: Each domain has its own folder
2. **Easier Testing**: Each layer can be tested independently
3. **Clearer Dependencies**: Service → Repository → Database
4. **Type Safety**: Full TypeScript support throughout
5. **Scalability**: Easy to extract modules to microservices later
6. **Maintainability**: Clear where to add new features

## 📚 Next Steps

1. Test all existing functionality
2. Update any frontend API calls if endpoints changed
3. Update Sanity webhook URLs
4. Consider adding authentication middleware
5. Add API documentation
6. Write tests for critical paths

## 🆘 Need Help?

If you encounter issues:

1. Check the console logs for detailed error messages
2. Review `ARCHITECTURE.md` for structure details
3. Ensure all dependencies are installed: `npm install`
4. Verify database migrations are up to date
