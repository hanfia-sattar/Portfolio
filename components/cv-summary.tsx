"use client"

import { useEffect, useState } from "react"

export default function CVSummary() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 },
    )

    const element = document.getElementById("summary")
    if (element) {
      observer.observe(element)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <section id="summary" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className={`transition-all duration-1000 ${isVisible ? "animate-fade-in-up" : "opacity-0"}`}>
          <h2 className="font-work-sans font-bold text-4xl text-center text-primary mb-12">Professional Summary</h2>

          <div className="max-w-4xl mx-auto">
            <div className="bg-card rounded-2xl p-8 shadow-lg border border-border">
              <p className="text-lg leading-relaxed text-card-foreground text-pretty">
                Seeking a challenging role as a{" "}
                <span className="font-semibold text-accent">Senior Lead Software Engineer</span> to leverage leadership
                and management skills, driving team motivation and enhancing productivity. Former IT Head with over
                <span className="font-semibold text-accent"> 8 years of hands-on experience</span> in database concepts,
                software development, and maintenance. Proficient in scalable, single-solution development to address
                varied customer requirements. Adept turnaround and startup specialist, skilled at adapting swiftly to
                evolving demands. Demonstrated expertise in leadership and management, fostering collaborative
                relationships among high-functioning teams and external stakeholders.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
