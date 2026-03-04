import type { ResumeRepository } from '../../domain/repositories/resumeRepository'
import {
  mapExperienceRow,
  mapProfileRow,
  mapSkillGroupRow,
  mapSocialLinkRow,
  type ExperienceRow,
  type ProfileRow,
  type SkillGroupRow,
  type SocialLinkRow,
} from '../mappers/resumeMapper'
import type { SupabaseClient } from '../supabase/client'

export class SupabaseResumeRepository implements ResumeRepository {
  private readonly client: SupabaseClient

  constructor(client: SupabaseClient) {
    this.client = client
  }

  async getProfile() {
    const profileRows = await this.client.selectRows<ProfileRow>('portfolio_profile', {
      select: 'id,name,title,email,phone,location,image,real_profile_image_url,cv_url,about_video_url,is_available,bio_paragraph_1,bio_paragraph_2,is_active',
      is_active: 'eq.true',
      order: 'updated_at.desc',
      limit: '1',
    })

    const profile = profileRows[0]
    if (!profile) {
      throw new Error('No active profile found')
    }

    const socialRows = await this.client.selectRows<SocialLinkRow>('portfolio_social_links', {
      select: 'id,profile_id,name,url,sort_order',
      profile_id: `eq.${profile.id}`,
      order: 'sort_order.asc',
    })

    return mapProfileRow(profile, socialRows.map(mapSocialLinkRow))
  }

  async getExperiences() {
    const rows = await this.client.selectRows<ExperienceRow>('portfolio_experiences', {
      select: 'id,title,subtitle,description,technologies,year,sort_order,is_published',
      is_published: 'eq.true',
      order: 'sort_order.asc',
    })

    return rows.map(mapExperienceRow)
  }

  async getSkillGroups() {
    const rows = await this.client.selectRows<SkillGroupRow>('portfolio_skill_groups', {
      select: 'id,group_name,skills,sort_order,is_published',
      is_published: 'eq.true',
      order: 'sort_order.asc',
    })

    return rows.map(mapSkillGroupRow)
  }
}
