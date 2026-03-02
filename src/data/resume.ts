import type { Experience, Profile, SkillGroup } from '../types/resume'

export const profile: Profile = {
  name: 'Regis',
  title: 'Frontend Developer',
  email: 'regis@example.com',
  phone: '+62 812-3456-7890',
  location: 'Jakarta, Indonesia',
  image: '/images/profile.png',
  socials: [
    { name: 'GitHub', url: 'https://github.com/regis' },
    { name: 'LinkedIn', url: 'https://linkedin.com/in/regis' },
  ],
}

export const experiences: Experience[] = [
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

export const skillGroups: SkillGroup[] = [
  {
    groupName: 'Frontend',
    skills: ['React', 'TypeScript', 'JavaScript', 'HTML', 'CSS'],
  },
  {
    groupName: 'Tools',
    skills: ['Git', 'Vite', 'ESLint', 'Figma'],
  },
]
