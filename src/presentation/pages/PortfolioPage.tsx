import { Empty, Segmented, Spin } from 'antd'
import { useMemo, useState } from 'react'
import type { SegmentedValue } from 'antd/es/segmented'
import { PAGE_METADATA } from '../../core/constants/metadata'
import type { ProjectCategory } from '../../domain/entities/project'
import { useProjects } from '../../usecases/useProjects'
import { SEO } from '../components/SEO'
import { PageIntro } from '../components/common/PageIntro'
import { Reveal } from '../components/motion/Reveal'
import { PortfolioProjectCard } from '../components/projects/PortfolioProjectCard'

type FilterOption = 'all' | ProjectCategory

const filterOptions: Array<{ value: FilterOption; label: string }> = [
  { value: 'all', label: 'All' },
  { value: 'app', label: 'Applications' },
  { value: 'web', label: 'Web Development' },
  { value: 'uiux', label: 'UI/UX' },
]

export default function PortfolioPage() {
  const [selectedCategory, setSelectedCategory] = useState<FilterOption>('all')
  const { visibleProjects, loading } = useProjects(selectedCategory)

  const items = useMemo(
    () =>
      filterOptions.map((option) => ({
        label: option.label,
        value: option.value,
      })),
    [],
  )

  return (
    <>
      <SEO title={PAGE_METADATA['/portfolio'].title} description={PAGE_METADATA['/portfolio'].description} />

      <section className="page-wrap">
        <Reveal>
          <div className="project-filter-row">
            <PageIntro title="Portfolio" subtitle="Exploring the digital frontier with modern technology." />
            <Segmented
              options={items}
              value={selectedCategory}
              onChange={(value: SegmentedValue) => setSelectedCategory(value as FilterOption)}
            />
          </div>
        </Reveal>

        <Reveal className="delay-1">
          {loading ? (
            <Spin />
          ) : visibleProjects.length === 0 ? (
            <Empty description="No projects in this category" />
          ) : (
            <div className="projects-grid">
              {visibleProjects.map((project) => (
                <PortfolioProjectCard key={project.id} project={project} />
              ))}
            </div>
          )}
        </Reveal>
      </section>
    </>
  )
}
