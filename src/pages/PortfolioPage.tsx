import { useEffect, useState } from 'react'
import { Col, Row } from 'antd'
import ProjectCard from '../components/projects/ProjectCard'
import { getProjects } from '../services/projectService'
import type { Project } from '../types/project'

type ProjectFilter = 'all' | Project['category']

function PortfolioPage() {
    const [projects, setProjects] = useState<Project[]>([])
    const [selectedCategory, setSelectedCategory] = useState<ProjectFilter>('all')

    useEffect(() => {
        let isMounted = true

        const loadProjects = async () => {
            const data = await getProjects()
            if (isMounted) {
                setProjects(data)
            }
        }

        void loadProjects()

        return () => {
            isMounted = false
        }
    }, [])

    const visibleProjects =
        selectedCategory === 'all'
            ? projects
            : projects.filter((project) => project.category === selectedCategory)

    return (
        <div>
            <h1>Portfolio</h1>
            <div>
                <button type="button" onClick={() => setSelectedCategory('all')}>
                    All
                </button>
                <button type="button" onClick={() => setSelectedCategory('app')}>
                    Applications
                </button>
                <button type="button" onClick={() => setSelectedCategory('web')}>
                    Web Development
                </button>
                <button type="button" onClick={() => setSelectedCategory('uiux')}>
                    UI/UX
                </button>
            </div>
            <Row gutter={[16, 16]}>
                {visibleProjects.map((project) => (
                    <Col key={project.id} xs={24} md={12} lg={8}>
                        <ProjectCard project={project} />
                    </Col>
                ))}
            </Row>
        </div>
    )
}

export default PortfolioPage
