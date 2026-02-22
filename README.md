# Find'em! — Backend API

Backend server for the Find'em! photo tagging game. Provides authentication, character data, and leaderboard functionality.

[Frontend Repository](https://github.com/yab-sh/odin-image-tagging)

---

## Overview

This is the Express backend for Find'em!. It handles user registration, login, character management, and leaderboard tracking. Built with Prisma ORM and PostgreSQL.

---

## Built With

- Node.js + Express
- TypeScript
- PostgreSQL
- Prisma ORM
- bcrypt for password hashing

---

## API Endpoints

### Auth
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | /api/v1/auth/register | Create new player (requires nickname, secret) |
| POST | /api/v1/auth/login | Login existing player (requires nickname, secret) |

### Characters
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /api/v1/characters | Get all characters (optional photoId query param) |
| GET | /api/v1/characters/:id | Get specific character by ID |

### Leaderboard
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /api/v1/leaderboard | Get top players (optional limit query param, defaults to 10) |
| POST | /api/v1/leaderboard | Save game result (requires playerId, durationMs) |

---

## Getting Started

1. Clone the repository
```
git clone https://github.com/yab-sh/findem-backend.git
cd findem-backend
```

2. Install dependencies
```
npm install
```

3. Set up PostgreSQL database
```
createdb findem
```

4. Create a .env file
```
DATABASE_URL="postgresql://user:password@localhost:5432/findem"
PORT=3000
```

5. Run Prisma migrations
```
npx prisma migrate dev --name init
```

6. Start the server
```
npm run dev
```

The API will be available at http://localhost:3000/api/v1

---

## Database Schema
```Prisma
model Player {
  id           String   @id @default(uuid())
  nickname     String   @unique
  passwordHash String
  createdAt    DateTime @default(now())
  leaderboard  LeaderboardEntry?
}

model Character {
  id        String   @id @default(uuid())
  name      String
  photoId   String
  centerX   Float
  centerY   Float
  radius    Float
  createdAt DateTime @default(now())
}

model LeaderboardEntry {
  id         String   @id @default(uuid())
  playerId   String   @unique
  player     Player   @relation(fields: [playerId], references: [id], onDelete: Cascade)
  bestTimeMs Int
  updatedAt  DateTime @updatedAt
}
```
---

## Author

yasin-sh — [GitHub]([yab-sh](https://github.com/yab-sh) | LinkedIn: [yasin-sh](https://www.linkedin.com/in/yasin-sh/)

---

## License

MIT
