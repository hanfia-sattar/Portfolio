"use client"

import { useEffect, useState } from "react"
import { Calendar, MapPin, Building } from "lucide-react"

export default function CVExperience() {
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

    const element = document.getElementById("experience")
    if (element) {
      observer.observe(element)
    }

    return () => observer.disconnect()
  }, [])

  const experiences = [
    {
      title: "Freelance Software Technical Support and Development",
      company: "Self-Employed",
      location: "Dubai, UAE",
      period: "Jan 2020 – Present",
      achievements: [
        "Provided technical support for software applications, troubleshooting issues and ensuring optimal performance",
        "Developed and implemented website fixes and custom plugins to enhance functionality and user experience",
        "Created desktop applications tailored to client specifications, improving operational efficiency",
        "Collaborated with clients to identify needs and deliver solutions on time and within budget",
        "Currently applying Data Science skills gained from diploma program to enhance project outcomes",
      ],
    },
    {
      title: "Senior Software Engineer",
      company: "Class Point Technology",
      location: "Karachi, PK",
      period: "Jun 2014 – Oct 2016",
      achievements: [
        "Spearheaded end-to-end development of comprehensive Point of Sale (POS) application using C# and MS SQL Server",
        "Established and led dedicated Support Team for POS application, ensuring seamless functionality",
        "Created tailored variants of POS system for specific industries (saloons, supermarkets, hospitality)",
        "Managed team of junior developers, testers, and content writers, providing mentorship and guidance",
        "Played pivotal role in marketing the POS application by strategizing promotional materials",
      ],
    },
    {
      title: "Web Developer",
      company: "E-Nexus Solution",
      location: "Karachi, PK",
      period: "Jan 2014 – Jun 2014",
      achievements: [
        "Spearheaded development of numerous websites and web applications using PHP and MySQL",
        "Utilized WordPress to design and deploy customized websites for diverse clientele",
        "Demonstrated proficiency in creating dynamic and interactive web solutions",
        "Collaborated with cross-functional teams to ensure seamless integration and functionality",
      ],
    },
    {
      title: "Game Designer",
      company: "Social Hull",
      location: "Karachi, PK",
      period: "Jul 2013 – Dec 2013",
      achievements: [
        "Excelled as game landscape designer utilizing Unreal Engine 3",
        "Brought creative visions to life through innovative game design",
      ],
    },
    {
      title: "Software Engineer (Internship)",
      company: "National Bank of Pakistan",
      location: "Karachi, PK",
      period: "Feb 2012 – Jul 2012",
      achievements: [
        "Helped plan automation of employee salary voucher system",
        "Worked with ERP team to provide SOAP/REST API for branch integration",
        "Developed customized application for branch automation using PHP and MySQL",
      ],
    },
  ]

  return (
    <section id="experience" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className={`transition-all duration-1000 ${isVisible ? "animate-fade-in-up" : "opacity-0"}`}>
          <h2 className="font-work-sans font-bold text-4xl text-center text-primary mb-12">Professional Experience</h2>

          <div className="max-w-4xl mx-auto">
            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-accent"></div>

              {experiences.map((exp, index) => (
                <div
                  key={index}
                  className={`relative mb-12 transition-all duration-700 ${
                    isVisible ? "animate-slide-in-left" : "opacity-0"
                  }`}
                  style={{ animationDelay: `${index * 200}ms` }}
                >
                  {/* Timeline dot */}
                  <div className="absolute left-6 w-4 h-4 bg-accent rounded-full border-4 border-background"></div>

                  {/* Content */}
                  <div className="ml-20 bg-card rounded-2xl p-6 shadow-lg border border-border hover:shadow-xl transition-shadow">
                    <div className="mb-4">
                      <h3 className="font-work-sans font-semibold text-xl text-card-foreground mb-2">{exp.title}</h3>

                      <div className="flex flex-wrap gap-4 text-sm text-muted-foreground mb-3">
                        <div className="flex items-center gap-1">
                          <Building className="w-4 h-4" />
                          <span>{exp.company}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <MapPin className="w-4 h-4" />
                          <span>{exp.location}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          <span>{exp.period}</span>
                        </div>
                      </div>
                    </div>

                    <ul className="space-y-2">
                      {exp.achievements.map((achievement, achIndex) => (
                        <li key={achIndex} className="flex items-start gap-3 text-card-foreground">
                          <div className="w-1.5 h-1.5 bg-accent rounded-full mt-2 flex-shrink-0"></div>
                          <span className="text-sm leading-relaxed">{achievement}</span>
                        </li>
                      ))}
                    </ul>
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
