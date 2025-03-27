# Department of Health Application

This is a Next.js application for a healthcare department, providing interfaces for patients, doctors, and administrators.

## Setup

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env.local` file in the root directory with the following environment variables:

```
# Database configuration
DATABASE_URL="your_database_url"

# NextAuth configuration
NEXTAUTH_SECRET="your_nextauth_secret"
NEXTAUTH_URL="http://localhost:3000"
```

4. Run the development server:
   ```bash
   npm run dev
   ```

## Production Deployment

When deploying to production, follow these steps to ensure authentication works properly:

1. Create a `.env.production` file with production environment variables:
```
DATABASE_URL="your_production_database_url"
NEXTAUTH_SECRET="your_production_secret"
NEXTAUTH_URL="https://your-production-domain.com"
```

2. For Vercel deployment, make sure to set the following environment variables in your Vercel project settings:
   - `NEXTAUTH_SECRET`: A secure random string (should be the same as in your `.env.production`)
   - `NEXTAUTH_URL`: The URL of your deployed application
   - `DATABASE_URL`: Your production database URL

3. Deploy to Vercel:
```bash
vercel --prod
```

Alternatively, you can use the included deployment script:
```bash
chmod +x deploy.sh
./deploy.sh
```

## Authentication

This application uses NextAuth.js for authentication with the following test accounts:

- **Admin**: 
  - Email: admin@health.example.com
  - Password: Admin123!

- **Doctor**: 
  - Email: doctor@health.example.com  
  - Password: Doctor123!

- **Patient**: 
  - Email: patient@health.example.com
  - Password: Patient123!

## Features

- **Authentication**: User authentication using NextAuth.js
- **Role-based Access Control**: Different dashboards for patients, doctors, and administrators
- **Profile Management**: User profile editing
- **Health Services**: View and book health services
- **Appointment Management**: Schedule and manage appointments
- **Doctor Directory**: Browse and filter healthcare providers

## Architecture

The application is built with:

- Next.js 15 with App Router
- NextAuth.js for authentication
- Prisma ORM
- PostgreSQL database
- Tailwind CSS for styling
- shadcn/ui components
