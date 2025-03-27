#!/bin/bash

# Script to deploy to Vercel with proper environment variables

# Ensure we're using the production env for build
cp .env.production .env.local

# Set Vercel environment variables (if not already set)
echo "Setting up environment variables in Vercel..."
vercel env add NEXTAUTH_URL production
vercel env add NEXTAUTH_SECRET production
vercel env add DATABASE_URL production

# Deploy to production
echo "Deploying to production..."
vercel --prod

echo "Deployment process completed. Please check the output for any errors." 