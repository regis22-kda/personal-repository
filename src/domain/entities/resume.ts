export interface SocialLink {
  name: string
  url: string
  iconUrl: string
}

export interface Profile {
  name: string
  siteTitle: string
  title: string
  email: string
  phone: string
  location: string
  image: string
  realProfileImageUrl: string
  cvUrl: string
  aboutVideoUrl: string
  isAvailable: boolean
  bioParagraph1: string
  bioParagraph2: string
  faviconUrl: string
  socials: SocialLink[]
}

export interface Experience {
  title: string
  subtitle: string
  description: string
  technologies: string[]
  year: string
}

export interface SkillGroup {
  groupName: string
  skills: string[]
}
