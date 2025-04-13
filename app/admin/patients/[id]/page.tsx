import { db } from "@/lib/db";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { notFound } from "next/navigation";

export default async function PatientDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const patient = await db.user.findUnique({
    where: {
      id: params.id,
      role: "PATIENT",
    },
    select: {
      id: true,
      name: true,
      email: true,
      createdAt: true,
    },
  });

  if (!patient) {
    notFound();
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Patient Details</h1>
        <div className="flex gap-2">
          <Button variant="outline" asChild>
            <Link href="/admin/patients">Back to List</Link>
          </Button>
          <Button asChild>
            <Link href={`/admin/patients/${patient.id}/edit`}>Edit Patient</Link>
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Patient Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h3 className="font-medium">Name</h3>
            <p className="text-gray-600">{patient.name}</p>
          </div>
          <div>
            <h3 className="font-medium">Email</h3>
            <p className="text-gray-600">{patient.email}</p>
          </div>
          <div>
            <h3 className="font-medium">Joined</h3>
            <p className="text-gray-600">{new Date(patient.createdAt).toLocaleDateString()}</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
} 