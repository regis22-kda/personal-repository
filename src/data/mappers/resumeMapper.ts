import type { Experience, Profile, SkillGroup, SocialLink } from '../../domain/entities/resume'

export interface ProfileRow {
  id: string
  name: string
  title: string
  email: string
  phone: string
  location: string
  image: string
  real_profile_image_url: string | null
  cv_url: string | null
  about_video_url: string | null
  is_available: boolean | null
  bio_paragraph_1: string | null
  bio_paragraph_2: string | null
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
    realProfileImageUrl: row.real_profile_image_url ?? row.image,
    cvUrl: row.cv_url ?? '',
    aboutVideoUrl: row.about_video_url ?? '',
    isAvailable: row.is_available ?? true,
    bioParagraph1: row.bio_paragraph_1 ?? '',
    bioParagraph2: row.bio_paragraph_2 ?? '',
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
