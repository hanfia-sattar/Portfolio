"use client"

import { useEffect, useState } from "react"
import { Mail, Phone, MapPin } from "lucide-react"

export default function CVHeader() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  return (
    <section
      id="header"
      className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background to-muted pt-16"
    >
      <div className="container mx-auto px-4 text-center">
        <div className={`transition-all duration-1000 ${isVisible ? "animate-fade-in-up" : "opacity-0"}`}>
          <div className="w-32 h-32 mx-auto mb-8 rounded-full bg-gradient-to-br from-accent to-accent/80 flex items-center justify-center text-4xl font-bold text-accent-foreground">
            HM
          </div>

          <h1 className="font-work-sans font-bold text-5xl md:text-7xl text-primary mb-4 text-balance">
            Hanfia Mujahid
          </h1>

          <h2 className="font-work-sans font-semibold text-2xl md:text-3xl text-accent mb-6">
            Senior Software Engineer
          </h2>

          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto text-pretty">
            Crafting innovative software solutions with 8+ years of experience in full-stack development, team
            leadership, and cutting-edge technologies.
          </p>

          <div className="flex flex-wrap justify-center gap-6 text-sm text-muted-foreground mb-8">
            <div className="flex items-center gap-2">
              <Mail className="w-4 h-4" />
              <span>hanfiasattar@gmail.com</span>
            </div>
            <div className="flex items-center gap-2">
              <Phone className="w-4 h-4" />
              <span>+971506123529</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4" />
              <span>Al Rashidiya 3, Ajman - UAE</span>
            </div>
          </div>

          <div className="flex justify-center gap-4">
            <button className="bg-accent hover:bg-accent/90 text-accent-foreground px-8 py-3 rounded-lg font-medium transition-colors">
              Download CV
            </button>
            <button className="border border-border hover:bg-muted text-foreground px-8 py-3 rounded-lg font-medium transition-colors">
              View Portfolio
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
