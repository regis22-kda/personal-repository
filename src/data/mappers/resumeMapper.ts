import type { Experience, Profile, SkillGroup, SocialLink } from '../../domain/entities/resume'

export interface ProfileRow {
  id: string
  name: string
  title: string
  email: string
  phone: string
  location: string
  image: string
  is_active: boolean
}

export interface SocialLinkRow {
  id: string
  profile_id: string
  name: string
  url: string
  sort_order: number
}

export interface ExperienceRow {
  id: string
  title: string
  description: string
  technologies: string[] | null
  year: string
  sort_order: number
  is_published: boolean
}

export interface SkillGroupRow {
  id: string
  group_name: string
  skills: string[] | null
  sort_order: number
  is_published: boolean
}

export function mapSocialLinkRow(row: SocialLinkRow): SocialLink {
  return {
    name: row.name,
    url: row.url,
  }
}

export function mapProfileRow(row: ProfileRow, socials: SocialLink[]): Profile {
  return {
    name: row.name,
    title: row.title,
    email: row.email,
    phone: row.phone,
    location: row.location,
    image: row.image,
    socials,
  }
}

export function mapExperienceRow(row: ExperienceRow): Experience {
  return {
    title: row.title,
    description: row.description,
    technologies: row.technologies ?? [],
    year: row.year,
  }
}

export function mapSkillGroupRow(row: SkillGroupRow): SkillGroup {
  return {
    groupName: row.group_name,
    skills: row.skills ?? [],
  }
}
