import type { Project } from '../../domain/entities/project'

export const projectMocks: Project[] = [
  {
    id: 'project-1',
    title: 'Task Manager App',
    description: 'A simple task tracking application.',
    involvement: 'Internal Product Team',
    category: 'app',
    technologies: ['React', 'TypeScript'],
    image: '/projects/app1.png',
  },
  {
    id: 'project-2',
    title: 'Company Website',
    description: 'A responsive company profile website.',
    involvement: 'Client Delivery Team',
    category: 'web',
    technologies: ['React', 'CSS'],
    image: '/projects/app1.png',
  },
  {
    id: 'project-3',
    title: 'Finance Dashboard UI',
    description: 'A clean dashboard interface concept.',
    involvement: 'Design Systems Team',
    category: 'uiux',
    technologies: ['Figma', 'Design System'],
    image: '/projects/app1.png',
  },
]
