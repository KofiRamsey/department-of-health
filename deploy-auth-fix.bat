@echo off
echo ===========================================
echo Authentication Fix for Vercel Deployment
echo ===========================================

rem Create backup of current env files
echo Creating backups of current environment files...
if exist .env copy .env .env.backup
if exist .env.local copy .env.local .env.local.backup
if exist .env.production copy .env.production .env.production.backup

rem Ensure .env.production has the correct settings
echo Updating .env.production with correct authentication settings...
(
  echo # Database URL for PostgreSQL
  echo DATABASE_URL="prisma+postgres://accelerate.prisma-data.net/?api_key=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcGlfa2V5IjoiZGY5YTA2OGEtNjA5Zi00YjZkLTg5N2ItMjEyMzNlOGNmMmQ2IiwidGVuYW50X2lkIjoiOGViOWIxYzFlYjI1NjZhZWE4MzM3MzhmZWVmMmIxMjQ1ZDUyZGU4MjZkZmUwMzI5MWE2OWFiZWRiY2ZkMzBhMSIsImludGVybmFsX3NlY3JldCI6ImIzM2IwMTJkLTA2ZDgtNGZmNC1iMDgxLWNlM2FiMjI2ZGU2OCJ9.TNlAfbN1fN398sTrr_DGIuB0P5t-4VCZf7Kb6uPtAFI"
  echo PULSE_API_KEY="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcGlfa2V5IjoiZGY5YTA2OGEtNjA5Zi00YjZkLTg5N2ItMjEyMzNlOGNmMmQ2IiwidGVuYW50X2lkIjoiOGViOWIxYzFlYjI1NjZhZWE4MzM3MzhmZWVmMmIxMjQ1ZDUyZGU4MjZkZmUwMzI5MWE2OWFiZWRiY2ZkMzBhMSIsImludGVybmFsX3NlY3JldCI6ImIzM2IwMTJkLTA2ZDgtNGZmNC1iMDgxLWNlM2FiMjI2ZGU2OCJ9.TNlAfbN1fN398sTrr_DGIuB0P5t-4VCZf7Kb6uPtAFI"
  echo. 
  echo # NextAuth configuration
  echo AUTH_SECRET="FfNi8uVzn3cFH6re1mI2lLvVR4AC1uCUZ87B9wGIA1M="
  echo NEXTAUTH_SECRET="FfNi8uVzn3cFH6re1mI2lLvVR4AC1uCUZ87B9wGIA1M="
  echo NEXTAUTH_URL="https://msebetsi-department-of-health.vercel.app"
) > .env.production

rem Copy to .env.local for local testing
echo Copying production environment to .env.local for testing...
copy .env.production .env.local

rem Set Vercel environment variables
echo Setting up environment variables in Vercel...
echo.
echo IMPORTANT: When prompted for values, use the following:
echo.
echo NEXTAUTH_SECRET = FfNi8uVzn3cFH6re1mI2lLvVR4AC1uCUZ87B9wGIA1M=
echo NEXTAUTH_URL = https://msebetsi-department-of-health.vercel.app
echo.
echo Press any key to continue...
pause > nul

echo Setting Vercel environment variables...
call vercel env add NEXTAUTH_URL production
call vercel env add NEXTAUTH_SECRET production
call vercel env add DATABASE_URL production

echo.
echo Verifying environment settings...
call vercel env ls

echo.
echo Do you want to deploy now? (Y/N)
set /p deploy=
if /i "%deploy%"=="Y" (
  echo.
  echo Deploying to production...
  call vercel --prod
  echo.
  echo Deployment completed. Please check the output for any errors.
) else (
  echo.
  echo Deployment skipped. You can deploy manually with 'vercel --prod' when ready.
)

echo.
echo Auth fix setup is complete. After deployment, try logging in with:
echo - admin@health.example.com / Admin123!
echo - doctor@health.example.com / Doctor123!
echo - patient@health.example.com / Patient123!
echo. 