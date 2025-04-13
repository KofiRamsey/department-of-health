import { db } from "@/lib/db";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { notFound } from "next/navigation";

export default async function EditDoctorPage({
  params,
}: {
  params: { id: string };
}) {
  const doctor = await db.user.findUnique({
    where: {
      id: params.id,
      role: "DOCTOR",
    },
    select: {
      id: true,
      name: true,
      email: true,
    },
  });

  if (!doctor) {
    notFound();
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Edit Doctor</h1>
        <Button variant="outline" asChild>
          <Link href={`/admin/doctors/${doctor.id}`}>Back to Doctor</Link>
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Doctor Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input id="name" defaultValue={doctor.name} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" defaultValue={doctor.email} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="specialty">Specialty</Label>
            <Input id="specialty" placeholder="Enter doctor's specialty" />
          </div>
          <div className="flex justify-end">
            <Button>Save Changes</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
} 