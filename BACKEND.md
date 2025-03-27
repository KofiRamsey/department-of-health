# Department of Health Backend

This document provides instructions for setting up and using the backend for the Department of Health application.

## 🔧 Technologies Used

- **Next.js API Routes**: Server-side API endpoints
- **Prisma ORM**: Database access and modeling
- **PostgreSQL**: Database
- **NextAuth.js**: Authentication

## 🚀 Getting Started

### Setup Database

1. Make sure your `.env` file contains the correct PostgreSQL connection string:

```
DATABASE_URL="your-postgres-connection-string"
```

2. Install dependencies:

```bash
npm install
```

3. Run the database setup script:

```bash
npx ts-node --compiler-options '{"module":"CommonJS"}' scripts/setup-db.ts
```

Alternatively, you can run the individual commands:

```bash
npx prisma generate
npx prisma db push
npm run db:seed
```

### Available Commands

- `npm run dev`: Start development server
- `npm run db:push`: Push schema changes to database
- `npm run db:generate`: Generate Prisma client
- `npm run db:seed`: Seed database with test data
- `npm run db:studio`: Open Prisma Studio to explore/edit data

## 🔐 Authentication

### Default Test Users

After running the seed script, the following test users will be available:

| Email                    | Password     | Role      |
|--------------------------|--------------|-----------|
| admin@health.gov         | admin123     | ADMIN     |
| sarah.johnson@health.gov | doctor123    | DOCTOR    |
| michael.chen@health.gov  | doctor123    | DOCTOR    |
| john.smith@example.com   | patient123   | PATIENT   |
| emily.brown@example.com  | patient123   | PATIENT   |

### Authentication Flow

1. Users can register via the `/api/register` endpoint
2. Login is handled via NextAuth.js using the `/api/auth/...` endpoints
3. Session management is automatically handled by NextAuth.js
4. Protected routes check for authentication and roles

## 📚 API Endpoints

### Authentication

- `POST /api/register`: Register a new user
- `POST /api/auth/signin`: Sign in a user
- `GET /api/auth/signout`: Sign out the current user
- `GET /api/auth/session`: Get the current session

### Users

- `GET /api/users/me`: Get the current user's profile
- `PATCH /api/users/me`: Update the current user's profile

### Doctors

- `GET /api/doctors`: Get all doctors (with optional specialization filter)
- `GET /api/doctors/:id`: Get a specific doctor by ID
- `PATCH /api/doctors/:id`: Update a doctor's profile

### Services

- `GET /api/services`: Get all services
- `POST /api/services`: Create a new service (admin only)
- `GET /api/services/:id`: Get a specific service
- `PATCH /api/services/:id`: Update a service (admin only)
- `DELETE /api/services/:id`: Delete a service (admin only)

### Appointments

- `GET /api/appointments`: Get all appointments (filtered by user role)
- `POST /api/appointments`: Create a new appointment
- `GET /api/appointments/:id`: Get a specific appointment
- `PATCH /api/appointments/:id`: Update an appointment status
- `DELETE /api/appointments/:id`: Cancel/delete an appointment

## 🔒 Security

- Role-based access control is implemented via middleware
- Password hashing is handled with bcrypt
- Session management is handled by NextAuth.js
- API routes are protected based on authentication and roles 