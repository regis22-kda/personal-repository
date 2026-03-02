import { useEffect, useState } from 'react'
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
            {visibleProjects.map((project) => (
                <div key={project.id}>
                    <h2>{project.title}</h2>
                    <p>{project.description}</p>
                </div>
            ))}
        </div>
    )
}

export default PortfolioPage
