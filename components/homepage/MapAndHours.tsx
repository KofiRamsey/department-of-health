import { Card, CardHeader, CardContent } from "@/components/ui/card"

export function MapAndHours() {
  return (
    <section className="grid grid-cols-2">
      <div className="h-[400px] relative">
        <iframe 
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1234.5678!2d28.1234!3d-23.5678!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjPCsDM0JzE2LjgiUyAyOMKwMDcnMjQuNCJF!5e0!3m2!1sen!2sza!4v1234567890"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
        ></iframe>
      </div>
      <Card className="bg-orange-500 text-white rounded-none">
        <CardHeader>
          <h2 className="text-2xl font-bold">Working Hours</h2>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              ['Monday - Friday', '09:00 - 20:00'],
              ['Saturday', '09:00 - 20:00'],
              ['Sunday', '09:00 - 20:00'],
            ].map(([day, hours]) => (
              <div key={day} className="flex justify-between">
                <span>{day}</span>
                <span>{hours}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </section>
  )
} 