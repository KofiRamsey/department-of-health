import { db } from "@/lib/db";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { notFound } from "next/navigation";

export default async function ServiceDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const service = await db.service.findUnique({
    where: {
      id: params.id,
    },
    select: {
      id: true,
      name: true,
      description: true,
      price: true,
      duration: true,
      createdAt: true,
    },
  });

  if (!service) {
    notFound();
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Service Details</h1>
        <div className="flex gap-2">
          <Button variant="outline" asChild>
            <Link href="/admin/services">Back to List</Link>
          </Button>
          <Button asChild>
            <Link href={`/admin/services/${service.id}/edit`}>Edit Service</Link>
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Service Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h3 className="font-medium">Name</h3>
            <p className="text-gray-600">{service.name}</p>
          </div>
          <div>
            <h3 className="font-medium">Description</h3>
            <p className="text-gray-600">{service.description}</p>
          </div>
          <div>
            <h3 className="font-medium">Price</h3>
            <p className="text-gray-600">${service.price}</p>
          </div>
          <div>
            <h3 className="font-medium">Duration</h3>
            <p className="text-gray-600">{service.duration} minutes</p>
          </div>
          <div>
            <h3 className="font-medium">Created</h3>
            <p className="text-gray-600">{new Date(service.createdAt).toLocaleDateString()}</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
} 