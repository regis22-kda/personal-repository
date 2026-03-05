import type { Experience, Profile, SkillGroup } from '../../domain/entities/resume'

export const profileMock: Profile = {
  name: 'John Doe',
  siteTitle: 'John Doe Portfolio',
  title: 'Software Engineer',
  email: 'mail@gmail.com',
  phone: '+62 000-0000-0000',
  location: 'Location, Country',
  image: '/assets/profile.png',
  realProfileImageUrl: '/assets/profile.png',
  cvUrl: '/assets/cv.txt',
  aboutVideoUrl: '/assets/about-profile.mp4',
  isAvailable: true,
  bioParagraph1:
    'With practical product experience, I focus on turning complex requirements into clean interfaces and maintainable frontend architecture.',
  bioParagraph2:
    'I work at the intersection of system thinking and storytelling, where design and engineering should both serve real user outcomes.',
  faviconUrl: '/vite.svg',
  socials: [
    { name: 'GitHub', url: 'https://github.com/', iconUrl: '/assets/social-github.svg' },
    { name: 'LinkedIn', url: 'https://linkedin.com/in/', iconUrl: '/assets/social-linkedin.svg' },
  ],
}

export const experienceMocks: Experience[] = [
  {
    title: 'PT Bank Jago Tbk (Project-Based), Bandung (Remote)',
    subtitle: 'Software Engineer',
    description: 'Built a task tracking application with reusable components and typed services.',
    technologies: ['React', 'TypeScript', 'Ant Design'],
    year: '2025',
  },
  {
    title: 'PT. Smooets Teknologi Outsourcing, Bandung',
    subtitle: 'Software Engineer',
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
