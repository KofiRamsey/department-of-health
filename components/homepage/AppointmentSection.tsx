import Image from 'next/image'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardHeader, CardContent } from "@/components/ui/card"

export function AppointmentSection() {
  return (
    <section className="container mx-auto py-16 px-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
        <Card className="lg:sticky lg:top-24">
          <CardHeader>
            <h2 className="text-2xl font-bold text-center">MAKE AN APPOINTMENT</h2>
          </CardHeader>
          <CardContent>
            <form className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Input type="text" placeholder="Name *" />
                <Input type="email" placeholder="Email *" />
                <Input type="tel" placeholder="Phone *" />
                <Input type="text" placeholder="Doctor *" />
                <Input type="date" placeholder="Date *" />
                <Input type="time" placeholder="Time *" />
              </div>
              <Textarea 
                placeholder="Your Message *" 
                className="resize-none" 
                rows={4}
              />
              <Button type="submit" className="w-full">
                APPOINTMENT
              </Button>
            </form>
          </CardContent>
        </Card>

        <div className="relative w-full h-[600px] lg:h-[800px]">
          <Image 
            src="/nurse.png" 
            alt="Medical Professional" 
            fill
            className="object-cover object-center rounded-lg"
            sizes="(max-width: 1024px) 100vw, 50vw"
            quality={100}
          />
        </div>
      </div>
    </section>
  )
} 