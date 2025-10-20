# Acity Sports Backend API

A modular monolith backend API for the Acity Sports management system, built with Express, TypeScript, Prisma, and PostgreSQL.

## 🚀 Features

- **Modular Architecture**: Clean separation of concerns with domain-driven modules
- **Sanity CMS Integration**: Real-time webhook synchronization
- **Type-Safe**: Full TypeScript support throughout
- **RESTful API**: Well-structured endpoints for all resources
- **Database ORM**: Prisma for type-safe database operations
- **Error Handling**: Centralized error handling middleware

## 📁 Project Structure

```
Backend/
├── src/
│   ├── modules/          # Domain modules
│   │   ├── teams/
│   │   ├── matches/
│   │   ├── seasons/
│   │   ├── players/
│   │   ├── sports/
│   │   └── webhooks/
│   ├── shared/           # Shared utilities
│   │   ├── types/
│   │   ├── interfaces/
│   │   ├── utils/
│   │   └── middleware/
│   ├── config/
│   ├── app.ts
│   └── server.ts
├── prisma/
│   └── schema.prisma
├── ARCHITECTURE.md       # Detailed architecture documentation
├── MIGRATION_GUIDE.md    # Guide for migrating from v1
└── package.json
```

## 🛠️ Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Language**: TypeScript
- **Database**: PostgreSQL
- **ORM**: Prisma
- **CMS**: Sanity.io

## 📦 Installation

1. **Clone the repository**

```bash
cd Backend
```

2. **Install dependencies**

```bash
npm install
```

3. **Set up environment variables**

```bash
cp .env.example .env
```

Edit `.env` with your credentials:

```env
DATABASE_URL="postgresql://user:password@localhost:5432/acity_sports"
DIRECT_URL="postgresql://user:password@localhost:5432/acity_sports"
PORT=3000
NODE_ENV=development
```

4. **Run Prisma migrations**

```bash
npx prisma migrate dev
```

5. **Generate Prisma client**

```bash
npx prisma generate
```

## 🚀 Running the Application

### Development Mode

```bash
npm run dev
```

### Production Build

```bash
npm run build
npm start
```

The server will start on `http://localhost:3000`

## 📡 API Endpoints

### Health Check

- `GET /` - Server health check

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

- `GET /api/v1/matches` - Get all matches
- `GET /api/v1/matches?seasonId=xyz` - Get matches by season
- `GET /api/v1/matches?sportId=xyz` - Get matches by sport ID
- `GET /api/v1/matches?sport=basketball` - Get matches by sport name
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

- `GET /api/v1/players` - Get all players
- `GET /api/v1/players?teamId=xyz` - Get players by team
- `GET /api/v1/players?sportId=xyz` - Get players by sport ID
- `GET /api/v1/players?sport=basketball` - Get players by sport name
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

## API Responses

All API responses follow a consistent format for easy parsing and error handling.

### Success Responses

#### Successful GET/POST/PUT Request

```json
{
  "success": true,
  "data": {
    // Resource data object or array
  }
}
```

**Status Codes:**

- `200 OK` - Successful GET, PUT request
- `201 Created` - Successful POST request
- `204 No Content` - Successful DELETE request (empty response body)

**Example:**

```json
{
  "success": true,
  "data": {
    "id": "123e4567-e89b-12d3-a456-426614174000",
    "name": "Team Alpha",
    "sportId": "sport-123",
    "createdAt": "2025-01-15T10:30:00.000Z",
    "updatedAt": "2025-01-15T10:30:00.000Z"
  }
}
```

### Error Responses

#### Not Found (404)

```json
{
  "success": false,
  "message": "Resource not found"
}
```

#### Server Error (500)

```json
{
  "success": false,
  "error": "Internal Server Error"
}
```

#### Validation Error (400)

```json
{
  "success": false,
  "error": "Validation failed: required field missing"
}
```

**Error Status Codes:**

- `400 Bad Request` - Invalid request data or validation error
- `404 Not Found` - Resource does not exist
- `500 Internal Server Error` - Server-side error

### Response Examples by Endpoint

#### Get All Teams

**Request:**

```bash
GET /api/v1/teams
```

**Response:**

```json
{
  "success": true,
  "data": [
    {
      "id": "team-1",
      "name": "Team Alpha",
      "sportId": "sport-123"
    },
    {
      "id": "team-2",
      "name": "Team Beta",
      "sportId": "sport-456"
    }
  ]
}
```

#### Get Single Match

**Request:**

```bash
GET /api/v1/matches/match-123
```

**Response:**

```json
{
  "success": true,
  "data": {
    "id": "match-123",
    "homeTeamId": "team-1",
    "awayTeamId": "team-2",
    "date": "2025-03-15T14:00:00.000Z",
    "location": "Main Stadium",
    "status": "scheduled"
  }
}
```

#### Get Players by Sport

**Request:**

```bash
GET /api/v1/players?sport=basketball
# or
GET /api/v1/players?sportId=sport-123
```

**Response:**

```json
{
  "success": true,
  "data": [
    {
      "id": "player-1",
      "name": "John Doe",
      "teamId": "team-1",
      "jerseyNumber": 10,
      "team": {
        "id": "team-1",
        "name": "Team Alpha",
        "sports": {
          "id": "sport-123",
          "name": "Basketball"
        }
      }
    }
  ]
}
```

#### Get Matches by Sport

**Request:**

```bash
GET /api/v1/matches?sport=football
# or
GET /api/v1/matches?sportId=sport-456
```

**Response:**

```json
{
  "success": true,
  "data": [
    {
      "id": "match-1",
      "homeTeamId": "team-1",
      "awayTeamId": "team-2",
      "matchDate": "2025-03-15T14:00:00.000Z",
      "homeTeam": {
        "id": "team-1",
        "name": "Team Alpha",
        "sports": {
          "id": "sport-456",
          "name": "Football"
        }
      },
      "awayTeam": {
        "id": "team-2",
        "name": "Team Beta"
      }
    }
  ]
}
```

#### Create Player

**Request:**

```bash
POST /api/v1/players
Content-Type: application/json

{
  "name": "John Doe",
  "teamId": "team-1",
  "jerseyNumber": 10
}
```

**Response:**

```json
{
  "success": true,
  "data": {
    "id": "player-789",
    "name": "John Doe",
    "teamId": "team-1",
    "jerseyNumber": 10,
    "createdAt": "2025-01-15T10:30:00.000Z"
  }
}
```

#### Delete Season

**Request:**

```bash
DELETE /api/v1/seasons/season-456
```

**Response:**

```
204 No Content
(empty response body)
```

#### Error Response - Not Found

**Request:**

```bash
GET /api/v1/teams/non-existent-id
```

**Response:**

```json
{
  "success": false,
  "message": "Team not found"
}
```

## 🔌 Sanity Webhook Configuration

Configure webhooks in Sanity Studio:

1. Go to your Sanity project settings
2. Navigate to Webhooks
3. Create new webhook with:
   - **URL**: `https://your-domain.com/api/v1/webhooks/sanity`
   - **Dataset**: production
   - **Trigger on**: Create, Update, Delete
   - **Filter**: Leave empty or specify document types

### Supported Document Types

- `teams` - Team data synchronization
- `fixtures` - Match data synchronization
- `seasons` - Season data synchronization
- `players` - Player data synchronization

## 🏗️ Architecture

This project follows a **modular monolith architecture** with clean separation of concerns:

### Layered Architecture

```
Controller (HTTP Layer)
    ↓
Service (Business Logic)
    ↓
Repository (Data Access)
    ↓
Database (Prisma + PostgreSQL)
```

### Module Structure

Each module contains:

- **Repository**: Database operations (functional)
- **Service**: Business logic (class-based)
- **Controller**: HTTP handlers (functional)
- **Routes**: Endpoint definitions (functional)
- **Module**: Package exports (functional)

For detailed architecture information, see [ARCHITECTURE.md](./ARCHITECTURE.md)

## 🔄 Migration from v1

If you're migrating from the old v1 structure, see [MIGRATION_GUIDE.md](./MIGRATION_GUIDE.md) for detailed instructions.

## 🧪 Testing

```bash
# Run tests (when implemented)
npm test

# Run tests in watch mode
npm run test:watch

# Generate coverage report
npm run test:coverage
```

## 📝 Development Guidelines

### Adding a New Module

1. Create module directory: `src/modules/new-module/`
2. Create repository: `new-module.repository.ts`
3. Create service: `new-module.service.ts`
4. Create controller: `new-module.controller.ts`
5. Create routes: `new-module.routes.ts`
6. Create module: `new-module.module.ts`
7. Register in `src/app.ts`

### Adding a New Webhook Handler

1. Create handler: `src/modules/webhooks/handlers/new-handler.ts`
2. Export from: `src/modules/webhooks/handlers/index.ts`
3. Register in: `src/modules/webhooks/webhooks.controller.ts`

## 🐛 Debugging

Enable detailed logging:

```bash
NODE_ENV=development npm run dev
```

View Prisma queries:

```bash
DEBUG=prisma:query npm run dev
```

## 🔒 Security

- CORS enabled for cross-origin requests
- Environment variables for sensitive data
- Error messages sanitized in production
- Input validation on all endpoints

## 📚 Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build for production
- `npm start` - Start production server
- `npx prisma studio` - Open Prisma Studio (database GUI)
- `npx prisma migrate dev` - Create and apply migrations
- `npx prisma generate` - Generate Prisma client

## 🤝 Contributing

1. Create a feature branch
2. Make your changes
3. Test thoroughly
4. Submit a pull request

## 📄 License

See [LICENSE](./LICENSE) file for details.

## 🆘 Support

For issues or questions:

1. Check [ARCHITECTURE.md](./ARCHITECTURE.md) for structure details
2. Review [MIGRATION_GUIDE.md](./MIGRATION_GUIDE.md) for migration help
3. Check console logs for error details
4. Open an issue in the repository

## 🎯 Roadmap

- [ ] Add authentication/authorization
- [ ] Implement rate limiting
- [ ] Add request validation middleware
- [ ] Add comprehensive logging
- [ ] Implement caching layer
- [ ] Add API documentation (Swagger)
- [ ] Write automated tests
- [ ] Add CI/CD pipeline

---

Built with ❤️ for Acity Sports Committee
