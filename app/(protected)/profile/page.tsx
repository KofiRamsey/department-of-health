'use client';

import { useState } from 'react';
import { useSession } from 'next-auth/react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useRouter } from 'next/navigation';

export default function ProfilePage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('account');

  if (status === 'loading') {
    return (
      <div className="flex items-center justify-center min-h-[70vh]">
        <p>Loading...</p>
      </div>
    );
  }

  if (!session) {
    router.push('/login');
    return null;
  }

  return (
    <div className="container mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold mb-8">Profile Management</h1>
      
      <Tabs defaultValue="account" onValueChange={setActiveTab}>
        <TabsList className="grid w-full max-w-md grid-cols-2 mb-8">
          <TabsTrigger value="account">Account</TabsTrigger>
          <TabsTrigger value="additional">Health Info</TabsTrigger>
        </TabsList>
        
        <TabsContent value="account" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>User Profile</CardTitle>
              <CardDescription>Manage your personal information</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="w-full max-w-4xl mx-auto space-y-6">
                <div className="space-y-2">
                  <h3 className="text-lg font-medium">Profile Information</h3>
                  <div className="grid gap-4 py-4">
                    <div className="grid gap-2">
                      <label htmlFor="name">Name</label>
                      <Input id="name" defaultValue={session.user?.name || ''} disabled />
                    </div>
                    <div className="grid gap-2">
                      <label htmlFor="email">Email</label>
                      <Input id="email" defaultValue={session.user?.email || ''} disabled />
                    </div>
                    <div className="grid gap-2">
                      <label htmlFor="role">Role</label>
                      <Input id="role" defaultValue={session.user?.role || ''} disabled />
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Contact an administrator to update your account information.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="additional" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Health Information</CardTitle>
              <CardDescription>Health-specific data for your profile</CardDescription>
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
                  This section would be connected to the database for storing healthcare-specific user data.
                </p>
                <Button className="mt-4">Update Health Information</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
} 