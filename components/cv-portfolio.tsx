"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { Plus, Edit, Trash2, ExternalLink, Github, X } from "lucide-react"

interface PortfolioItem {
  id: string
  title: string
  description: string
  technologies: string[]
  imageUrl: string
  liveUrl?: string
  githubUrl?: string
  category: string
}

export default function CVPortfolio() {
  const [isVisible, setIsVisible] = useState(false)
  const [portfolioItems, setPortfolioItems] = useState<PortfolioItem[]>([])
  const [isEditing, setIsEditing] = useState(false)
  const [editingItem, setEditingItem] = useState<PortfolioItem | null>(null)
  const [showModal, setShowModal] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 },
    )

    const element = document.getElementById("portfolio")
    if (element) {
      observer.observe(element)
    }

    // Load portfolio items from localStorage
    const savedItems = localStorage.getItem("portfolioItems")
    if (savedItems) {
      setPortfolioItems(JSON.parse(savedItems))
    } else {
      // Default portfolio items
      const defaultItems: PortfolioItem[] = [
        {
          id: "1",
          title: "Point of Sale System",
          description:
            "Comprehensive POS application developed using C# and MS SQL Server for various industries including saloons, supermarkets, and restaurants.",
          technologies: ["C#", "MS SQL Server", "WinForms", ".NET"],
          imageUrl: "/point-of-sale-interface.png",
          category: "Desktop Application",
        },
        {
          id: "2",
          title: "Employee Salary Voucher System",
          description: "Automated salary voucher system for National Bank of Pakistan with SOAP/REST API integration.",
          technologies: ["PHP", "MySQL", "SOAP", "REST API"],
          imageUrl: "/banking-software-interface.jpg",
          category: "Web Application",
        },
        {
          id: "3",
          title: "Data Science Projects",
          description:
            "Various data analysis and machine learning projects using Python, Pandas, and visualization tools.",
          technologies: ["Python", "Pandas", "NumPy", "Matplotlib", "Jupyter"],
          imageUrl: "/data-science-dashboard.jpg",
          category: "Data Science",
        },
      ]
      setPortfolioItems(defaultItems)
      localStorage.setItem("portfolioItems", JSON.stringify(defaultItems))
    }

    return () => observer.disconnect()
  }, [])

  const saveToLocalStorage = (items: PortfolioItem[]) => {
    localStorage.setItem("portfolioItems", JSON.stringify(items))
  }

  const handleAddItem = () => {
    setEditingItem({
      id: Date.now().toString(),
      title: "",
      description: "",
      technologies: [],
      imageUrl: "",
      category: "",
    })
    setIsEditing(true)
    setShowModal(true)
  }

  const handleEditItem = (item: PortfolioItem) => {
    setEditingItem(item)
    setIsEditing(true)
    setShowModal(true)
  }

  const handleDeleteItem = (id: string) => {
    const updatedItems = portfolioItems.filter((item) => item.id !== id)
    setPortfolioItems(updatedItems)
    saveToLocalStorage(updatedItems)
  }

  const handleSaveItem = (e: React.FormEvent) => {
    e.preventDefault()
    if (!editingItem) return

    const updatedItems =
      editingItem.id && portfolioItems.find((item) => item.id === editingItem.id)
        ? portfolioItems.map((item) => (item.id === editingItem.id ? editingItem : item))
        : [...portfolioItems, editingItem]

    setPortfolioItems(updatedItems)
    saveToLocalStorage(updatedItems)
    setShowModal(false)
    setEditingItem(null)
    setIsEditing(false)
  }

  const categories = ["All", ...Array.from(new Set(portfolioItems.map((item) => item.category)))]
  const [selectedCategory, setSelectedCategory] = useState("All")

  const filteredItems =
    selectedCategory === "All" ? portfolioItems : portfolioItems.filter((item) => item.category === selectedCategory)

  return (
    <section id="portfolio" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className={`transition-all duration-1000 ${isVisible ? "animate-fade-in-up" : "opacity-0"}`}>
          <div className="flex justify-between items-center mb-12">
            <h2 className="font-work-sans font-bold text-4xl text-primary">Portfolio & Projects</h2>
            <button
              onClick={handleAddItem}
              className="bg-accent hover:bg-accent/90 text-accent-foreground px-4 py-2 rounded-lg font-medium transition-colors flex items-center gap-2"
            >
              <Plus className="w-4 h-4" />
              Add Project
            </button>
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap gap-2 mb-8 justify-center">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  selectedCategory === category
                    ? "bg-accent text-accent-foreground"
                    : "bg-muted text-muted-foreground hover:bg-accent/10"
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Portfolio Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredItems.map((item, index) => (
              <div
                key={item.id}
                className={`bg-card rounded-2xl overflow-hidden shadow-lg border border-border hover:shadow-xl transition-all duration-500 group ${
                  isVisible ? "animate-fade-in-up" : "opacity-0"
                }`}
                style={{ animationDelay: `${index * 150}ms` }}
              >
                <div className="relative overflow-hidden">
                  <img
                    src={item.imageUrl || "/placeholder.svg?height=300&width=400&query=project placeholder"}
                    alt={item.title}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-2 right-2 flex gap-2">
                    <button
                      onClick={() => handleEditItem(item)}
                      className="bg-background/80 hover:bg-background text-foreground p-2 rounded-lg transition-colors"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDeleteItem(item.id)}
                      className="bg-background/80 hover:bg-destructive text-foreground hover:text-destructive-foreground p-2 rounded-lg transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <div className="p-6">
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="font-work-sans font-semibold text-lg text-card-foreground">{item.title}</h3>
                    <span className="text-xs bg-accent/10 text-accent px-2 py-1 rounded-full">{item.category}</span>
                  </div>

                  <p className="text-muted-foreground text-sm mb-4 line-clamp-3">{item.description}</p>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {item.technologies.map((tech, techIndex) => (
                      <span key={techIndex} className="text-xs bg-muted text-muted-foreground px-2 py-1 rounded-md">
                        {tech}
                      </span>
                    ))}
                  </div>

                  <div className="flex gap-2">
                    {item.liveUrl && (
                      <a
                        href={item.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1 text-accent hover:text-accent/80 text-sm font-medium"
                      >
                        <ExternalLink className="w-4 h-4" />
                        Live Demo
                      </a>
                    )}
                    {item.githubUrl && (
                      <a
                        href={item.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1 text-accent hover:text-accent/80 text-sm font-medium"
                      >
                        <Github className="w-4 h-4" />
                        Code
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredItems.length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground text-lg">No projects found in this category.</p>
            </div>
          )}
        </div>
      </div>

      {/* Modal for adding/editing portfolio items */}
      {showModal && editingItem && (
        <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-card rounded-2xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto border border-border">
            <div className="flex justify-between items-center mb-6">
              <h3 className="font-work-sans font-semibold text-xl text-card-foreground">
                {editingItem.id && portfolioItems.find((item) => item.id === editingItem.id)
                  ? "Edit Project"
                  : "Add New Project"}
              </h3>
              <button onClick={() => setShowModal(false)} className="text-muted-foreground hover:text-foreground">
                <X className="w-6 h-6" />
              </button>
            </div>

            <form onSubmit={handleSaveItem} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-card-foreground mb-2">Project Title</label>
                <input
                  type="text"
                  value={editingItem.title}
                  onChange={(e) => setEditingItem({ ...editingItem, title: e.target.value })}
                  className="w-full p-3 bg-input border border-border rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-card-foreground mb-2">Description</label>
                <textarea
                  value={editingItem.description}
                  onChange={(e) => setEditingItem({ ...editingItem, description: e.target.value })}
                  rows={4}
                  className="w-full p-3 bg-input border border-border rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-card-foreground mb-2">
                  Technologies (comma-separated)
                </label>
                <input
                  type="text"
                  value={editingItem.technologies.join(", ")}
                  onChange={(e) =>
                    setEditingItem({ ...editingItem, technologies: e.target.value.split(",").map((t) => t.trim()) })
                  }
                  className="w-full p-3 bg-input border border-border rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent"
                  placeholder="React, TypeScript, Node.js"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-card-foreground mb-2">Category</label>
                <input
                  type="text"
                  value={editingItem.category}
                  onChange={(e) => setEditingItem({ ...editingItem, category: e.target.value })}
                  className="w-full p-3 bg-input border border-border rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent"
                  placeholder="Web Application, Mobile App, etc."
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-card-foreground mb-2">Image URL</label>
                <input
                  type="url"
                  value={editingItem.imageUrl}
                  onChange={(e) => setEditingItem({ ...editingItem, imageUrl: e.target.value })}
                  className="w-full p-3 bg-input border border-border rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent"
                  placeholder="https://example.com/image.jpg"
                />
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-card-foreground mb-2">Live URL (optional)</label>
                  <input
                    type="url"
                    value={editingItem.liveUrl || ""}
                    onChange={(e) => setEditingItem({ ...editingItem, liveUrl: e.target.value })}
                    className="w-full p-3 bg-input border border-border rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent"
                    placeholder="https://project-demo.com"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-card-foreground mb-2">GitHub URL (optional)</label>
                  <input
                    type="url"
                    value={editingItem.githubUrl || ""}
                    onChange={(e) => setEditingItem({ ...editingItem, githubUrl: e.target.value })}
                    className="w-full p-3 bg-input border border-border rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent"
                    placeholder="https://github.com/username/repo"
                  />
                </div>
              </div>

              <div className="flex gap-4 pt-4">
                <button
                  type="submit"
                  className="bg-accent hover:bg-accent/90 text-accent-foreground px-6 py-3 rounded-lg font-medium transition-colors flex-1"
                >
                  Save Project
                </button>
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="bg-muted hover:bg-muted/80 text-muted-foreground px-6 py-3 rounded-lg font-medium transition-colors"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  )
}
