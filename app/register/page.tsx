import { Navbar } from "@/components/homepage/Navbar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export default function Register() {
  return (
    <main className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="container mx-auto px-4 py-10">
        <Card className="max-w-3xl mx-auto">
          <CardHeader>
            <CardTitle className="text-3xl font-bold text-center">
              Register
            </CardTitle>
          </CardHeader>
          
          <CardContent>
            <form className="space-y-6">
              {/* Account Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Account Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-medium">
                      Email Address
                    </label>
                    <Input
                      id="email"
                      type="email"
                      required
                      placeholder="Enter your email"
                    />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="password" className="text-sm font-medium">
                      Password
                    </label>
                    <Input
                      id="password"
                      type="password"
                      required
                      placeholder="Create a password"
                    />
                  </div>

                  <div className="space-y-2 md:col-span-2">
                    <label htmlFor="confirmPassword" className="text-sm font-medium">
                      Confirm Password
                    </label>
                    <Input
                      id="confirmPassword"
                      type="password"
                      required
                      placeholder="Retype your password"
                    />
                  </div>
                </div>
              </div>

              {/* Personal Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Personal Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label htmlFor="patientID" className="text-sm font-medium">
                      Patient ID
                    </label>
                    <Input
                      id="patientID"
                      type="text"
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="idNumber" className="text-sm font-medium">
                      ID Number
                    </label>
                    <Input
                      id="idNumber"
                      type="text"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="name" className="text-sm font-medium">
                      Name
                    </label>
                    <Input
                      id="name"
                      type="text"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="surname" className="text-sm font-medium">
                      Surname
                    </label>
                    <Input
                      id="surname"
                      type="text"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="age" className="text-sm font-medium">
                      Age
                    </label>
                    <Input
                      id="age"
                      type="number"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="nationality" className="text-sm font-medium">
                      Nationality
                    </label>
                    <Input
                      id="nationality"
                      type="text"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="billingGroup" className="text-sm font-medium">
                      Billing Group
                    </label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select billing group" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="government">Government</SelectItem>
                        <SelectItem value="private">Private</SelectItem>
                        <SelectItem value="insurance">Insurance</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="dob" className="text-sm font-medium">
                      Date of Birth
                    </label>
                    <Input
                      id="dob"
                      type="date"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="sex" className="text-sm font-medium">
                      Sex
                    </label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select sex" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="male">Male</SelectItem>
                        <SelectItem value="female">Female</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="maritalStatus" className="text-sm font-medium">
                      Marital Status
                    </label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select marital status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="single">Single</SelectItem>
                        <SelectItem value="married">Married</SelectItem>
                        <SelectItem value="divorced">Divorced</SelectItem>
                        <SelectItem value="widowed">Widowed</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="race" className="text-sm font-medium">
                      Race
                    </label>
                    <Input
                      id="race"
                      type="text"
                      required
                    />
                  </div>

                  <div className="space-y-2 md:col-span-2">
                    <label htmlFor="address" className="text-sm font-medium">
                      Mailing Address
                    </label>
                    <Input
                      id="address"
                      type="text"
                      required
                    />
                  </div>

                  <div className="space-y-2 md:col-span-2">
                    <label htmlFor="contact" className="text-sm font-medium">
                      Contact Numbers
                    </label>
                    <Input
                      id="contact"
                      type="tel"
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Next of Kin */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Next of Kin</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label htmlFor="kinName" className="text-sm font-medium">
                      Name
                    </label>
                    <Input
                      id="kinName"
                      type="text"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="kinAddress" className="text-sm font-medium">
                      Address
                    </label>
                    <Input
                      id="kinAddress"
                      type="text"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="kinPhone" className="text-sm font-medium">
                      Tel Number
                    </label>
                    <Input
                      id="kinPhone"
                      type="tel"
                      required
                    />
                  </div>
                </div>
              </div>

              <Button type="submit" className="w-full">
                Register
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </main>
  )
}
