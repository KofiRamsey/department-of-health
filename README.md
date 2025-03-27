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
# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
CLERK_SECRET_KEY=your_clerk_secret_key
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/select-dashboard
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/select-dashboard
```

4. Run the development server:
   ```bash
   npm run dev
   ```

## Clerk Authentication Setup

1. Create a Clerk account at [clerk.com](https://clerk.com)
2. Create a new application
3. Go to API Keys in the Clerk dashboard
4. Copy the Publishable Key and Secret Key to your `.env.local` file
5. Configure the JWT templates to include user roles

### Setting up User Roles in Clerk

To use roles with Clerk:

1. Go to your Clerk dashboard
2. Navigate to JWT Templates
3. Create a template with the following claims:

```json
{
  "role": "{{public_metadata.role}}"
}
```

4. Use the template for your application

## Features

- **Authentication**: User authentication using Clerk
- **Role-based Access Control**: Different dashboards for patients, doctors, and administrators
- **Profile Management**: User profile editing with Clerk
- **Health Services**: View and book health services
- **Appointment Management**: Schedule and manage appointments
- **Doctor Directory**: Browse and filter healthcare providers

## Architecture

The application is built with:

- Next.js 15 with App Router
- Clerk for authentication
- Prisma ORM
- PostgreSQL database
- Tailwind CSS for styling
- shadcn/ui components
