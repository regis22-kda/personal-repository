import type { Experience, Profile, SkillGroup } from '../../domain/entities/resume'

export const profileMock: Profile = {
  name: 'Rheganandar Bagas',
  title: 'Software Engineer',
  email: 'rheganandar.bi@gmail.com',
  phone: '+62 895-1335-8568',
  location: 'Bandung, Indonesia',
  image: '/projects/app1.png',
  socials: [
    { name: 'GitHub', url: 'https://github.com/' },
    { name: 'LinkedIn', url: 'https://linkedin.com/in/' },
  ],
}

export const experienceMocks: Experience[] = [
  {
    title: 'Task Manager App',
    description: 'Built a task tracking application with reusable components and typed services.',
    technologies: ['React', 'TypeScript', 'Ant Design'],
    year: '2025',
  },
  {
    title: 'Company Website',
    description: 'Developed a responsive website for business profile and service showcase.',
    technologies: ['React', 'CSS', 'Vite'],
    year: '2024',
  },
]

export const skillGroupMocks: SkillGroup[] = [
  {
    groupName: 'Frontend',
    skills: ['React', 'TypeScript', 'JavaScript', 'HTML', 'CSS'],
  },
  {
    groupName: 'Tools',
    skills: ['Git', 'Vite', 'ESLint', 'Figma'],
  },
]
