import type { ProjectRepository } from '../../domain/repositories/projectRepository'
import { mapProjectRow, type ProjectRow } from '../mappers/projectMapper'
import type { SupabaseClient } from '../supabase/client'

export class SupabaseProjectRepository implements ProjectRepository {
  private readonly client: SupabaseClient

  constructor(client: SupabaseClient) {
    this.client = client
  }

  async getAll() {
    const rows = await this.client.selectRows<ProjectRow>('portfolio_projects', {
      select: 'id,title,description,category,technologies,image,sort_order,is_published',
      is_published: 'eq.true',
      order: 'sort_order.asc',
    })

    return rows.map(mapProjectRow)
  }
}
