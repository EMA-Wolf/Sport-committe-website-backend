# Backend Architecture Documentation

## 🏗️ Modular Monolith Architecture

This backend is built using a **modular monolith architecture** with clean separation of concerns and a hybrid functional/class-based approach.

## 📁 Project Structure

```
Backend/
├── src/
│   ├── config/                    # Configuration files
│   │   ├── prisma.ts             # Prisma client setup
│   │   └── sanityClient.ts       # Sanity client setup
│   │
│   ├── shared/                    # Shared kernel (cross-cutting concerns)
│   │   ├── types/
│   │   │   ├── sanity.types.ts   # Sanity webhook types
│   │   │   ├── common.types.ts   # Common API types
│   │   │   └── index.ts
│   │   ├── interfaces/
│   │   │   └── base.interface.ts # Base interfaces for services/repos
│   │   ├── utils/
│   │   │   └── validators.ts     # Validation utilities
│   │   └── middleware/
│   │       └── error.ts          # Error handling middleware
│   │
│   ├── modules/                   # Domain modules
│   │   │
│   │   ├── sports/               # Sports module
│   │   │   ├── sports.repository.ts
│   │   │   ├── sports.service.ts
│   │   │   ├── sports.controller.ts
│   │   │   ├── sports.routes.ts
│   │   │   └── sports.module.ts
│   │   │
│   │   ├── teams/                # Teams module
│   │   │   ├── teams.repository.ts
│   │   │   ├── teams.service.ts
│   │   │   ├── teams.controller.ts
│   │   │   ├── teams.routes.ts
│   │   │   └── teams.module.ts
│   │   │
│   │   ├── seasons/              # Seasons module
│   │   │   ├── seasons.repository.ts
│   │   │   ├── seasons.service.ts
│   │   │   ├── seasons.controller.ts
│   │   │   ├── seasons.routes.ts
│   │   │   └── seasons.module.ts
│   │   │
│   │   ├── players/              # Players module
│   │   │   ├── players.repository.ts
│   │   │   ├── players.service.ts
│   │   │   ├── players.controller.ts
│   │   │   ├── players.routes.ts
│   │   │   └── players.module.ts
│   │   │
│   │   ├── matches/              # Matches module
│   │   │   ├── matches.repository.ts
│   │   │   ├── matches.service.ts
│   │   │   ├── matches.controller.ts
│   │   │   ├── matches.routes.ts
│   │   │   └── matches.module.ts
│   │   │
│   │   └── webhooks/             # Webhooks module
│   │       ├── handlers/
│   │       │   ├── base-webhook.handler.ts
│   │       │   ├── team-webhook.handler.ts
│   │       │   ├── match-webhook.handler.ts
│   │       │   ├── season-webhook.handler.ts
│   │       │   ├── player-webhook.handler.ts
│   │       │   └── index.ts
│   │       ├── webhooks.controller.ts
│   │       ├── webhooks.routes.ts
│   │       └── webhooks.module.ts
│   │
│   ├── app.ts                    # Express app setup
│   └── server.ts                 # Entry point
│
├── prisma/
│   └── schema.prisma             # Database schema
├── package.json
└── tsconfig.json
```

## 🎯 Architectural Principles

### 1. **Layered Architecture**

Each module follows a layered architecture:

```
Controller (HTTP Layer)
    ↓
Service (Business Logic Layer)
    ↓
Repository (Data Access Layer)
    ↓
Database (Prisma + PostgreSQL)
```

### 2. **Separation of Concerns**

- **Controllers**: Handle HTTP requests/responses (functional approach)
- **Services**: Contain business logic (class-based approach)
- **Repositories**: Manage database operations (functional approach)
- **Routes**: Define API endpoints (functional approach)
- **Modules**: Package related functionality together

### 3. **Hybrid Functional/Class Approach**

We use a pragmatic mix of paradigms:

✅ **Functions for:**

- Controllers (stateless request handlers)
- Repositories (database operations)
- Routes (endpoint definitions)
- Utilities (pure functions)
- Middleware (Express middleware)

✅ **Classes for:**

- Services (complex business logic with state/dependencies)

## 🔄 Data Flow

### Regular API Request Flow

```
HTTP Request
    ↓
Route → Controller → Service → Repository → Prisma → Database
    ↓
HTTP Response
```

### Webhook Flow

```
Sanity Webhook
    ↓
Webhook Route → Webhook Controller → Handler → Service → Repository → Prisma → Database
    ↓
HTTP Response
```

## 📡 API Endpoints

### Webhooks

- `POST /api/v1/webhooks/sanity` - Handle Sanity creation/update webhook
- `DELETE /api/v1/webhooks/sanity` - Handle Sanity deletion webhook

### Teams

- `GET /api/v1/teams` - Get all teams
- `GET /api/v1/teams/:id` - Get team by ID
- `POST /api/v1/teams` - Create team
- `PUT /api/v1/teams/:id` - Update team
- `DELETE /api/v1/teams/:id` - Delete team

### Matches

- `GET /api/v1/matches` - Get all matches (query: ?seasonId=xyz)
- `GET /api/v1/matches/:id` - Get match by ID
- `POST /api/v1/matches` - Create match
- `PUT /api/v1/matches/:id` - Update match
- `DELETE /api/v1/matches/:id` - Delete match

### Seasons

- `GET /api/v1/seasons` - Get all seasons
- `GET /api/v1/seasons/:id` - Get season by ID
- `POST /api/v1/seasons` - Create season
- `PUT /api/v1/seasons/:id` - Update season
- `DELETE /api/v1/seasons/:id` - Delete season

### Players

- `GET /api/v1/players` - Get all players (query: ?teamId=xyz)
- `GET /api/v1/players/:id` - Get player by ID
- `POST /api/v1/players` - Create player
- `PUT /api/v1/players/:id` - Update player
- `DELETE /api/v1/players/:id` - Delete player

### Sports

- `GET /api/v1/sports` - Get all sports
- `GET /api/v1/sports/:id` - Get sport by ID
- `POST /api/v1/sports` - Create sport
- `PUT /api/v1/sports/:id` - Update sport
- `DELETE /api/v1/sports/:id` - Delete sport

## 🔌 Sanity Webhooks

The webhooks module handles real-time synchronization with Sanity CMS:

### Supported Document Types

- `teams` - Team creation/update/deletion
- `fixtures` - Match creation/update/deletion
- `seasons` - Season creation/update/deletion
- `players` - Player creation/update/deletion

### Webhook Handlers

Each document type has dedicated handlers:

- **Create/Update Handler**: Upserts data into PostgreSQL
- **Delete Handler**: Removes data from PostgreSQL

### Adding New Webhook Handlers

1. Create handler in `modules/webhooks/handlers/`:

```typescript
export const handleNewTypeCreateOrUpdate = async (context: WebhookContext) => {
  // Implementation
};

export const handleNewTypeDelete = async (context: WebhookContext) => {
  // Implementation
};
```

2. Register in `modules/webhooks/webhooks.controller.ts`:

```typescript
const createHandlers = {
  // ...existing handlers
  newType: newTypeHandlers.handleNewTypeCreateOrUpdate,
};

const deleteHandlers = {
  // ...existing handlers
  newType: newTypeHandlers.handleNewTypeDelete,
};
```

## 🧪 Module Example

Each module is self-contained:

```typescript
// Repository (functional)
export const findById = async (id: string) => { ... }
export const create = async (data: any) => { ... }

// Service (class-based)
export class EntityService {
  async get(id: string) { ... }
  async create(data: any) { ... }
}

// Controller (functional)
export const getEntity = async (req, res, next) => { ... }
export const createEntity = async (req, res, next) => { ... }

// Routes (functional)
export const entityRouter = Router();
entityRouter.get('/', getAllEntities);
entityRouter.post('/', createEntity);

// Module (functional)
export const getEntityRouter = () => entityRouter;
```

## 🚀 Benefits

1. **Modularity**: Each domain is isolated and self-contained
2. **Scalability**: Easy to extract modules into microservices
3. **Testability**: Each layer can be tested independently
4. **Maintainability**: Clear structure, easy to navigate
5. **Type Safety**: Full TypeScript support
6. **Flexibility**: Mix of functional and OOP paradigms

## 🔧 Development

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

## 📝 Environment Variables

```env
DATABASE_URL=postgresql://...
DIRECT_URL=postgresql://...
PORT=3000
NODE_ENV=development
```

## 🎯 Future Enhancements

- Add authentication/authorization middleware
- Implement rate limiting
- Add request validation middleware
- Add logging service
- Implement caching layer
- Add API documentation (Swagger/OpenAPI)
- Add automated tests
