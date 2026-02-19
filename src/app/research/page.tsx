'use client'

import { useState } from 'react'
import { Section } from '@/components/layout/Section'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { ResearchDocument } from '@/components/ui/ResearchDocument'
import { Icon } from '@/components/ui/Icon'
import { Pagination } from '@/components/ui/Pagination'
import { Newsletter } from '@/components/ui/Newsletter'
import { researchPageContent } from '@/lib/constants'

export default function ResearchPage() {
  const { hero, categories, documents } = researchPageContent
  const [searchQuery, setSearchQuery] = useState('')
  const [activeCategory, setActiveCategory] = useState('all')
  const [currentPage, setCurrentPage] = useState(1)
  const documentsPerPage = 5

  // Filter documents based on category and search
  const filteredDocuments = documents.filter(doc => {
    const matchesCategory = activeCategory === 'all' || doc.category.toLowerCase() === activeCategory
    const matchesSearch = doc.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         doc.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         doc.author.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

  // Pagination
  const totalPages = Math.ceil(filteredDocuments.length / documentsPerPage)
  const startIndex = (currentPage - 1) * documentsPerPage
  const paginatedDocuments = filteredDocuments.slice(startIndex, startIndex + documentsPerPage)

  return (
    <>
      {/* Hero Section */}
      <Section background="white" className="border-b border-neutral-100">
        <div className="max-w-3xl">
          <SectionHeading
            badge={hero.badge}
            title={hero.title}
            titleHighlight={hero.titleHighlight}
            description={hero.description}
            align="left"
          />
          <div className="flex flex-wrap gap-4 mt-8">
            {hero.stats.map((stat, index) => (
              <div key={index} className="flex items-center gap-2 text-sm font-medium text-neutral-500">
                <Icon name={stat.icon} size="sm" />
                <span>{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* Search & Filter Controls */}
      <div className="sticky top-[73px] z-40 bg-background-light py-6 border-b border-neutral-200">
        <div className="max-w-7xl mx-auto px-6 lg:px-20">
          <div className="flex flex-col lg:flex-row gap-6 items-center justify-between">
            {/* Search Bar */}
            <div className="relative w-full lg:max-w-md">
              <Icon 
                name="search" 
                size="sm" 
                className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400" 
              />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search papers, authors, or keywords..."
                className="w-full bg-white border border-neutral-300 rounded-lg py-3 pl-12 pr-4 focus:ring-1 focus:ring-accent-burgundy focus:border-accent-burgundy outline-none transition-all placeholder:text-neutral-400 text-sm"
              />
            </div>

            {/* Category Filters */}
            <div className="flex items-center gap-2 w-full lg:w-auto overflow-x-auto pb-2 lg:pb-0">
              <span className="text-xs font-bold text-neutral-400 uppercase tracking-wider mr-2">
                Filter by:
              </span>
              {categories.map((category) => (
                <button
                  key={category.value}
                  onClick={() => {
                    setActiveCategory(category.value)
                    setCurrentPage(1)
                  }}
                  className={`whitespace-nowrap px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    activeCategory === category.value
                      ? 'bg-primary text-white'
                      : 'bg-white border border-neutral-200 text-neutral-600 hover:border-accent-burgundy hover:text-accent-burgundy'
                  }`}
                >
                  {category.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Document List */}
      <Section>
        <div className="flex flex-col gap-1">
          {paginatedDocuments.map((doc) => (
            <ResearchDocument key={doc.id} {...doc} />
          ))}
        </div>

        {/* Pagination */}
        {filteredDocuments.length > 0 && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        )}

        {/* No Results */}
        {filteredDocuments.length === 0 && (
          <div className="text-center py-12">
            <p className="text-neutral-500">No documents found matching your criteria.</p>
          </div>
        )}
      </Section>

      {/* Newsletter */}
      <Newsletter variant="dark" />
    </>
  )
}