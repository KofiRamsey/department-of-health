import { Navbar } from "@/components/homepage/Navbar"
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function Login() {
  return (
    <main className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="container mx-auto flex items-center justify-center px-4 py-20">
        <Card className="w-full max-w-md">
          <CardHeader className="space-y-1">
            <CardTitle className="text-3xl font-bold text-center">
              Login
            </CardTitle>
          </CardHeader>
          
          <CardContent>
            <form className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="identifier" className="text-sm font-medium">
                  Email or ID Number
                </label>
                <Input
                  id="identifier"
                  type="text"
                  placeholder="Enter your email or ID number"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <label htmlFor="password" className="text-sm font-medium">
                  Password
                </label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  required
                />
              </div>

              <div className="flex items-center justify-between">
                <label className="flex items-center gap-2 text-sm">
                  <input type="checkbox" className="rounded border-gray-300" />
                  Remember me
                </label>
                <Link 
                  href="/forgot-password" 
                  className="text-sm text-primary hover:underline"
                >
                  Forgot Password?
                </Link>
              </div>

              <Button type="submit" className="w-full">
                Login
              </Button>
            </form>
          </CardContent>

          <CardFooter className="flex flex-col space-y-4">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-white px-2 text-muted-foreground">
                  Don't have an account?
                </span>
              </div>
            </div>

            <Button 
              variant="outline" 
              className="w-full"
              asChild
            >
              <Link href="/register">
                Register Now
              </Link>
            </Button>
          </CardFooter>
        </Card>
      </div>
    </main>
  )
}
