# Backend File Structure

Complete visual representation of the new modular monolith architecture.

## 📁 Complete Directory Tree

```
Backend/
│
├── 📄 package.json                    # Dependencies and scripts
├── 📄 tsconfig.json                   # TypeScript configuration
├── 📄 .env                            # Environment variables
├── 📄 .gitignore                      # Git ignore rules
│
├── 📘 README.md                       # Project overview
├── 📘 ARCHITECTURE.md                 # Architecture documentation
├── 📘 MIGRATION_GUIDE.md              # Migration guide from v1
├── 📘 IMPLEMENTATION_SUMMARY.md       # Implementation summary
├── 📘 STRUCTURE.md                    # This file
│
├── 📂 prisma/
│   └── 📄 schema.prisma              # Database schema
│
└── 📂 src/
    │
    ├── 📄 server.ts                   # Entry point
    ├── 📄 app.ts                      # Express app setup
    │
    ├── 📂 config/                     # Configuration
    │   ├── 📄 prisma.ts              # Prisma client
    │   └── 📄 sanityClient.ts        # Sanity client
    │
    ├── 📂 shared/                     # Shared utilities
    │   │
    │   ├── 📂 types/                  # Type definitions
    │   │   ├── 📄 sanity.types.ts    # Webhook types
    │   │   ├── 📄 common.types.ts    # Common API types
    │   │   ├── 📄 base.types.ts      # Base entity types
    │   │   └── 📄 index.ts           # Type exports
    │   │
    │   ├── 📂 interfaces/             # Shared interfaces
    │   │   └── 📄 base.interface.ts  # IRepository, IService
    │   │
    │   ├── 📂 utils/                  # Utility functions
    │   │   └── 📄 validators.ts      # Validation helpers
    │   │
    │   └── 📂 middleware/             # Express middleware
    │       └── 📄 error.ts           # Error handling
    │
    └── 📂 modules/                    # Domain modules
        │
        ├── 📂 sports/                 # Sports module
        │   ├── 📄 sports.repository.ts    # DB operations
        │   ├── 📄 sports.service.ts       # Business logic
        │   ├── 📄 sports.controller.ts    # HTTP handlers
        │   ├── 📄 sports.routes.ts        # API routes
        │   └── 📄 sports.module.ts        # Module export
        │
        ├── 📂 teams/                  # Teams module
        │   ├── 📄 teams.repository.ts     # DB operations
        │   ├── 📄 teams.service.ts        # Business logic
        │   ├── 📄 teams.controller.ts     # HTTP handlers
        │   ├── 📄 teams.routes.ts         # API routes
        │   └── 📄 teams.module.ts         # Module export
        │
        ├── 📂 seasons/                # Seasons module
        │   ├── 📄 seasons.repository.ts   # DB operations
        │   ├── 📄 seasons.service.ts      # Business logic
        │   ├── 📄 seasons.controller.ts   # HTTP handlers
        │   ├── 📄 seasons.routes.ts       # API routes
        │   └── 📄 seasons.module.ts       # Module export
        │
        ├── 📂 players/                # Players module
        │   ├── 📄 players.repository.ts   # DB operations
        │   ├── 📄 players.service.ts      # Business logic
        │   ├── 📄 players.controller.ts   # HTTP handlers
        │   ├── 📄 players.routes.ts       # API routes
        │   └── 📄 players.module.ts       # Module export
        │
        ├── 📂 matches/                # Matches module
        │   ├── 📄 matches.repository.ts   # DB operations
        │   ├── 📄 matches.service.ts      # Business logic
        │   ├── 📄 matches.controller.ts   # HTTP handlers
        │   ├── 📄 matches.routes.ts       # API routes
        │   └── 📄 matches.module.ts       # Module export
        │
        └── 📂 webhooks/               # Webhooks module
            ├── 📂 handlers/           # Webhook handlers
            │   ├── 📄 base-webhook.handler.ts     # Base interface
            │   ├── 📄 team-webhook.handler.ts     # Team sync
            │   ├── 📄 match-webhook.handler.ts    # Match sync
            │   ├── 📄 season-webhook.handler.ts   # Season sync
            │   ├── 📄 player-webhook.handler.ts   # Player sync
            │   └── 📄 index.ts                    # Handler exports
            │
            ├── 📄 webhooks.controller.ts  # Webhook routing
            ├── 📄 webhooks.routes.ts      # Webhook endpoints
            └── 📄 webhooks.module.ts      # Module export
```

## 🗂️ Old Structure (v1) - Still Present

```
src/
└── 📂 v1/                             # Legacy structure
    ├── 📂 controllers/
    │   └── 📄 playerstats.controller.ts
    ├── 📂 routes/
    │   ├── 📄 index.ts
    │   ├── 📄 playerstats.routes.ts
    │   └── 📄 webhooks.routes.ts      # Old webhook routes
    ├── 📂 services/
    │   └── 📄 PlayerStats.ts
    └── 📂 webhooks/
        ├── 📄 sanity.controller.ts    # Old webhook controller
        ├── 📄 sanityWebhook.ts        # Old webhook logic
        └── 📄 sanityDeletionWebhooks.ts # Old deletion logic
```

> **Note**: The v1 structure is kept for reference. You can remove it after testing the new structure.

## 📊 Module Breakdown

### Each Module Contains:

```
module-name/
├── module-name.repository.ts  # 🗄️  Database operations (Functional)
├── module-name.service.ts     # 💼 Business logic (Class-based)
├── module-name.controller.ts  # 🎮 HTTP handlers (Functional)
├── module-name.routes.ts      # 🛣️  Route definitions (Functional)
└── module-name.module.ts      # 📦 Module export (Functional)
```

### Responsibilities:

| Layer          | Responsibility   | Pattern   | Example                          |
| -------------- | ---------------- | --------- | -------------------------------- |
| **Repository** | Database CRUD    | Functions | `findTeamById()`, `createTeam()` |
| **Service**    | Business Logic   | Classes   | `TeamsService.upsert()`          |
| **Controller** | HTTP Handling    | Functions | `getTeam()`, `createTeam()`      |
| **Routes**     | Endpoint Mapping | Functions | `router.get('/', ...)`           |
| **Module**     | Export Router    | Functions | `getTeamsRouter()`               |

## 🔄 Request Flow

### API Request Example:

```
1. Client → GET /api/v1/teams/123

2. app.ts → Routes to teams module

3. teams.routes.ts → Maps to teamsController.getTeam

4. teams.controller.ts → Calls teamsService.get(id)

5. teams.service.ts → Calls teamsRepo.findTeamById(id)

6. teams.repository.ts → Calls prisma.team.findUnique()

7. Database → Returns team data

8. Response flows back through the layers

9. Client ← Receives JSON response
```

### Webhook Request Example:

```
1. Sanity CMS → POST /api/v1/webhooks/sanity
   Body: { _type: "teams", _id: "123", name: "Team A", ... }

2. app.ts → Routes to webhooks module

3. webhooks.routes.ts → Maps to webhooks.controller

4. webhooks.controller.ts → Determines handler by _type

5. team-webhook.handler.ts → Validates and transforms data

6. teams.service.ts → Executes business logic

7. teams.repository.ts → Upserts to database

8. Database → Data saved

9. Sanity CMS ← Receives success response
```

## 📈 Scalability Path

The modular structure allows easy evolution:

### Current: Modular Monolith

```
Single Deployment
├── Teams Module
├── Matches Module
├── Players Module
└── All share DB
```

### Future: Microservices (if needed)

```
Team Service (Port 3001)
├── Teams Module
└── Team Database

Match Service (Port 3002)
├── Matches Module
└── Match Database

Player Service (Port 3003)
├── Players Module
└── Player Database
```

Each module can be extracted into its own service with minimal changes!

## 🎯 Key Files

### Entry Points

- `src/server.ts` - Main entry point
- `src/app.ts` - Express app configuration

### Core Modules

- `src/modules/webhooks/` - Sanity webhook handling
- `src/modules/teams/` - Team management
- `src/modules/matches/` - Match management
- `src/modules/players/` - Player management
- `src/modules/seasons/` - Season management
- `src/modules/sports/` - Sport management

### Shared Infrastructure

- `src/shared/types/` - Type definitions
- `src/shared/middleware/` - Express middleware
- `src/shared/utils/` - Utility functions

## 📏 Code Metrics

| Category            | Count   |
| ------------------- | ------- |
| Modules             | 6       |
| Repositories        | 6       |
| Services            | 6       |
| Controllers         | 6       |
| Routes              | 6       |
| Webhook Handlers    | 5       |
| Shared Utilities    | 5       |
| Documentation Files | 5       |
| **Total Files**     | **50+** |

## 🎨 Color Key

- 📄 File
- 📂 Directory
- 📘 Documentation
- 🗄️ Data Layer
- 💼 Business Layer
- 🎮 Presentation Layer
- 🛣️ Routing
- 📦 Module

---

This structure provides:

- ✅ Clear organization
- ✅ Easy navigation
- ✅ Scalable architecture
- ✅ Maintainable codebase
