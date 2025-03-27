import { exec } from "child_process";
import { promisify } from "util";

const execAsync = promisify(exec);

async function setupDatabase() {
  try {
    console.log("🔄 Starting database setup...");
    
    // Generate Prisma client
    console.log("⚙️ Generating Prisma client...");
    await execAsync("npx prisma generate");
    
    // Push schema to database
    console.log("📊 Pushing schema to database...");
    await execAsync("npx prisma db push");
    
    // Seed the database with initial data
    console.log("🌱 Seeding database with initial data...");
    await execAsync("npm run db:seed");
    
    console.log("✅ Database setup completed successfully!");
  } catch (error) {
    console.error("❌ Database setup failed:", error);
    process.exit(1);
  }
}

setupDatabase(); 