import CVHeader from "@/components/cv-header"
import CVSummary from "@/components/cv-summary"
import CVSkills from "@/components/cv-skills"
import CVExperience from "@/components/cv-experience"
import CVEducation from "@/components/cv-education"
import CVPortfolio from "@/components/cv-portfolio"
import CVContact from "@/components/cv-contact"
import Navigation from "@/components/navigation"

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <Navigation />
      <CVHeader />
      <CVSummary />
      <CVSkills />
      <CVExperience />
      <CVEducation />
      <CVPortfolio />
      <CVContact />
    </main>
  )
}
