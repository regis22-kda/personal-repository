import { Tag } from 'antd'
import type { Project } from '../../../domain/entities/project'

interface PortfolioProjectCardProps {
  project: Project
}

export function PortfolioProjectCard({ project }: PortfolioProjectCardProps) {
  return (
    <article className="project-card">
      <img src={project.image} alt={project.title} className="project-card-image" loading="lazy" />
      <div className="project-card-content">
        <h3>{project.title}</h3>
        <p className="project-description">{project.description}</p>
        <div>
          {project.technologies.map((technology) => (
            <Tag key={`${project.id}-${technology}`} color="processing">
              {technology}
            </Tag>
          ))}
        </div>
      </div>
    </article>
  )
}
