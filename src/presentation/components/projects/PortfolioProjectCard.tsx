import { Tag } from 'antd'
import type { Project } from '../../../domain/entities/project'
import { getTechnologyTagColor } from '../../../core/constants/skillColors'

interface PortfolioProjectCardProps {
  project: Project
}

export function PortfolioProjectCard({ project }: PortfolioProjectCardProps) {
  return (
    <article className="project-card">
      <img src={project.image} alt={project.title} className="project-card-image" loading="lazy" />
      <div className="project-card-content">
        <h3>{project.title}</h3>
        <div className="project-section">
          <h4>App Detail</h4>
          <p className="project-description">{project.description}</p>
        </div>
        <div className="project-section">
          <h4>Involvement</h4>
          <p className="project-description">{project.involvement}</p>
        </div>
        <div className="tag-wrap">
          {project.technologies.map((technology) => (
            <Tag key={`${project.id}-${technology}`} color={getTechnologyTagColor(technology)}>
              {technology}
            </Tag>
          ))}
        </div>
      </div>
    </article>
  )
}
