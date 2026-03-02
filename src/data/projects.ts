import type { Project } from '../types/project'

export const projects: Project[] = [
  {
    id: 'project-1',
    title: 'Task Manager App',
    description: 'A simple task tracking application.',
    category: 'app',
    technologies: ['React', 'TypeScript'],
    image: "/projects/app1.png",
  },
  {
    id: 'project-2',
    title: 'Company Website',
    description: 'A responsive company profile website.',
    category: 'web',
    technologies: ['React', 'CSS'],
    image: "/projects/app1.png",
  },
  {
    id: 'project-3',
    title: 'Finance Dashboard UI',
    description: 'A clean dashboard interface concept.',
    category: 'uiux',
    technologies: ['Figma', 'Design System'],
    image: "/projects/app1.png",
  },
]
