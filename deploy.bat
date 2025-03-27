@echo off
echo Setting up for deployment...

rem Copy production env for build
copy .env.production .env.local

rem Set Vercel environment variables (this will prompt for values)
echo Setting up environment variables in Vercel...
call vercel env add NEXTAUTH_URL production
call vercel env add NEXTAUTH_SECRET production
call vercel env add DATABASE_URL production

rem Deploy to production
echo Deploying to production...
call vercel --prod

echo Deployment process completed. Please check the output for any errors. 