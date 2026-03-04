export interface SocialLink {
  name: string
  url: string
}

export interface Profile {
  name: string
  title: string
  email: string
  phone: string
  location: string
  image: string
  cvUrl: string
  isAvailable: boolean
  bioParagraph1: string
  bioParagraph2: string
  socials: SocialLink[]
}

export interface Experience {
  title: string
  description: string
  technologies: string[]
  year: string
}

export interface SkillGroup {
  groupName: string
  skills: string[]
}
