import { Card, Tag } from 'antd'
import type { Project } from '../../types/project'

interface ProjectCardProps {
    project: Project
}

function ProjectCard({ project }: ProjectCardProps) {
    return (
        <Card
            cover={<img src={project.image} alt={project.title} />}
        >
            <Card.Meta title={project.title} description={project.description} />
            <div>
                {project.technologies.map((technology) => (
                    <Tag key={`${project.id}-${technology}`}>{technology}</Tag>
                ))}
            </div>
        </Card>
    )
}

export default ProjectCard
