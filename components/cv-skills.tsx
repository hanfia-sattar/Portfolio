"use client"

import { useEffect, useState } from "react"

export default function CVSkills() {
  const [isVisible, setIsVisible] = useState(false)
  const [animateSkills, setAnimateSkills] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          setTimeout(() => setAnimateSkills(true), 500)
        }
      },
      { threshold: 0.1 },
    )

    const element = document.getElementById("skills")
    if (element) {
      observer.observe(element)
    }

    return () => observer.disconnect()
  }, [])

  const keySkills = [
    "Data Analysis & Visualization",
    "Object-Oriented Programming",
    "Problem Analysis & Resolution",
    "Requirements Gathering & Analysis",
    "Team Management & Communications",
    "Web Development & Maintenance",
    "Technical & End User Support",
    "Machine Learning",
    "Data Cleaning & Preparation",
    "Agile & Scrum Methodology",
  ]

  const technicalSkills = [
    { name: "Python", level: 90 },
    { name: "C#", level: 85 },
    { name: "JavaScript", level: 88 },
    { name: "PHP", level: 82 },
    { name: "SQL/MySQL", level: 90 },
    { name: "Flask/Django", level: 85 },
    { name: "Data Science", level: 80 },
    { name: "Machine Learning", level: 75 },
  ]

  return (
    <section id="skills" className="py-20 bg-muted">
      <div className="container mx-auto px-4">
        <div className={`transition-all duration-1000 ${isVisible ? "animate-fade-in-up" : "opacity-0"}`}>
          <h2 className="font-work-sans font-bold text-4xl text-center text-primary mb-12">Skills & Expertise</h2>

          <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto">
            {/* Key Skills */}
            <div className="bg-card rounded-2xl p-8 shadow-lg border border-border">
              <h3 className="font-work-sans font-semibold text-2xl text-card-foreground mb-6">Key Skills</h3>
              <div className="grid grid-cols-1 gap-3">
                {keySkills.map((skill, index) => (
                  <div
                    key={skill}
                    className={`flex items-center p-3 bg-background rounded-lg border border-border transition-all duration-500 ${
                      isVisible ? "animate-slide-in-left" : "opacity-0"
                    }`}
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <div className="w-2 h-2 bg-accent rounded-full mr-3"></div>
                    <span className="text-foreground">{skill}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Technical Skills */}
            <div className="bg-card rounded-2xl p-8 shadow-lg border border-border">
              <h3 className="font-work-sans font-semibold text-2xl text-card-foreground mb-6">Technical Proficiency</h3>
              <div className="space-y-4">
                {technicalSkills.map((skill, index) => (
                  <div key={skill.name} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="font-medium text-card-foreground">{skill.name}</span>
                      <span className="text-sm text-muted-foreground">{skill.level}%</span>
                    </div>
                    <div className="w-full bg-background rounded-full h-2 border border-border">
                      <div
                        className={`bg-gradient-to-r from-accent to-accent/80 h-2 rounded-full skill-bar ${
                          animateSkills ? "opacity-100" : "opacity-0"
                        }`}
                        style={{
                          width: animateSkills ? `${skill.level}%` : "0%",
                          transitionDelay: `${index * 200}ms`,
                        }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
