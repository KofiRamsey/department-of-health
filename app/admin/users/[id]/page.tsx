import { db } from "@/lib/db";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { notFound } from "next/navigation";

export default async function UserDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const user = await db.user.findUnique({
    where: {
      id: params.id,
    },
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      createdAt: true,
    },
  });

  if (!user) {
    notFound();
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">User Details</h1>
        <div className="flex gap-2">
          <Button variant="outline" asChild>
            <Link href="/admin/users">Back to List</Link>
          </Button>
          <Button asChild>
            <Link href={`/admin/users/${user.id}/edit`}>Edit User</Link>
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>User Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h3 className="font-medium">Name</h3>
            <p className="text-gray-600">{user.name}</p>
          </div>
          <div>
            <h3 className="font-medium">Email</h3>
            <p className="text-gray-600">{user.email}</p>
          </div>
          <div>
            <h3 className="font-medium">Role</h3>
            <p className="text-gray-600">{user.role}</p>
          </div>
          <div>
            <h3 className="font-medium">Joined</h3>
            <p className="text-gray-600">{new Date(user.createdAt).toLocaleDateString()}</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
} 