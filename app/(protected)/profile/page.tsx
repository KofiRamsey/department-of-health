'use client';

import { useState } from 'react';
import { useUser, UserProfile } from '@clerk/nextjs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export default function ProfilePage() {
  const { user, isLoaded } = useUser();
  const [activeTab, setActiveTab] = useState('clerk');

  if (!isLoaded) {
    return (
      <div className="flex items-center justify-center min-h-[70vh]">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold mb-8">Profile Management</h1>
      
      <Tabs defaultValue="clerk" onValueChange={setActiveTab}>
        <TabsList className="grid w-full max-w-md grid-cols-2 mb-8">
          <TabsTrigger value="clerk">Clerk Profile</TabsTrigger>
          <TabsTrigger value="additional">Additional Info</TabsTrigger>
        </TabsList>
        
        <TabsContent value="clerk" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>User Profile</CardTitle>
              <CardDescription>Manage your personal information</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="w-full max-w-4xl mx-auto">
                <UserProfile
                  appearance={{
                    elements: {
                      rootBox: {
                        boxShadow: 'none',
                        width: '100%',
                      },
                      card: {
                        border: 'none',
                        boxShadow: 'none',
                        width: '100%',
                      },
                    },
                  }}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="additional" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Additional Information</CardTitle>
              <CardDescription>Health-specific data not covered by Clerk</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <p>
                  This section would include health-specific information such as:
                </p>
                <ul className="list-disc pl-5 space-y-2">
                  <li>Medical history</li>
                  <li>Insurance information</li>
                  <li>Emergency contacts</li>
                  <li>Preferred healthcare providers</li>
                </ul>
                <p className="text-sm text-muted-foreground mt-4">
                  This section would be connected to your database for storing healthcare-specific user data.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
} 