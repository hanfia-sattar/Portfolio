"use client"

import { useEffect, useState } from "react"
import { GraduationCap, Award, Calendar } from "lucide-react"

export default function CVEducation() {
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

    const element = document.getElementById("education")
    if (element) {
      observer.observe(element)
    }

    return () => observer.disconnect()
  }, [])

  const education = [
    {
      degree: "PGD (Data Science in Artificial Intelligence)",
      institution: "NED University",
      location: "Karachi, PK",
      period: "Currently Enrolled",
      status: "In Progress",
      achievements: [],
    },
    {
      degree: "BSCS Computer Science",
      institution: "Bahria University",
      location: "Karachi, PK",
      period: "2013",
      status: "Completed",
      achievements: [
        "Awarded best final year project",
        "Selected for advance database training from HQSP Canada",
        "3rd Position in Web Development Competition at SPARC'13 at MAJU",
      ],
    },
    {
      degree: "Intermediate (Computer Science)",
      institution: "NCR – College of Emerging Technology",
      location: "Karachi, PK",
      period: "2009",
      status: "Completed",
      achievements: [],
    },
    {
      degree: "Metric (Computer Science)",
      institution: "The Karachi Academy",
      location: "Karachi, PK",
      period: "2007",
      status: "Completed",
      achievements: [],
    },
  ]

  return (
    <section id="education" className="py-20 bg-muted">
      <div className="container mx-auto px-4">
        <div className={`transition-all duration-1000 ${isVisible ? "animate-fade-in-up" : "opacity-0"}`}>
          <h2 className="font-work-sans font-bold text-4xl text-center text-primary mb-12">
            Education & Qualifications
          </h2>

          <div className="max-w-4xl mx-auto">
            <div className="grid gap-6">
              {education.map((edu, index) => (
                <div
                  key={index}
                  className={`bg-card rounded-2xl p-6 shadow-lg border border-border hover:shadow-xl transition-all duration-500 ${
                    isVisible ? "animate-slide-in-left" : "opacity-0"
                  }`}
                  style={{ animationDelay: `${index * 150}ms` }}
                >
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center">
                        <GraduationCap className="w-6 h-6 text-accent" />
                      </div>
                    </div>

                    <div className="flex-grow">
                      <div className="flex flex-wrap items-start justify-between gap-2 mb-3">
                        <div>
                          <h3 className="font-work-sans font-semibold text-lg text-card-foreground mb-1">
                            {edu.degree}
                          </h3>
                          <p className="text-muted-foreground font-medium">{edu.institution}</p>
                        </div>

                        <div className="flex items-center gap-2 text-sm">
                          <Calendar className="w-4 h-4 text-muted-foreground" />
                          <span className="text-muted-foreground">{edu.period}</span>
                          <span
                            className={`px-2 py-1 rounded-full text-xs font-medium ${
                              edu.status === "In Progress"
                                ? "bg-accent/10 text-accent"
                                : "bg-muted text-muted-foreground"
                            }`}
                          >
                            {edu.status}
                          </span>
                        </div>
                      </div>

                      {edu.achievements.length > 0 && (
                        <div className="space-y-2">
                          <div className="flex items-center gap-2 text-sm font-medium text-card-foreground">
                            <Award className="w-4 h-4 text-accent" />
                            <span>Achievements</span>
                          </div>
                          <ul className="space-y-1 ml-6">
                            {edu.achievements.map((achievement, achIndex) => (
                              <li key={achIndex} className="flex items-start gap-2 text-sm text-muted-foreground">
                                <div className="w-1.5 h-1.5 bg-accent rounded-full mt-2 flex-shrink-0"></div>
                                <span>{achievement}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
