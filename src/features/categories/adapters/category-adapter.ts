import type { IApiCategory, ICategory } from '../interfaces/ICategory'
import { toSnakeCase } from '@/lib/case-converter'

export class CategoryAdapter {
  static mapToCategory(apiCategory: IApiCategory): ICategory {
    return {
      id: apiCategory.id,
      name: apiCategory.name,
      description: apiCategory.description,
      type: apiCategory.type,
      color: apiCategory.color,
      normalizedName: apiCategory.normalized_name,
      createdAt: apiCategory.created_at,
      updatedAt: apiCategory.updated_at,
    }
  }

  static mapManyToCategory(apiCategories: IApiCategory[]): ICategory[] {
    return apiCategories.map(category =>
      CategoryAdapter.mapToCategory(category),
    )
  }

  static mapToApiCategory(category: Partial<ICategory>): Partial<IApiCategory> {
    return toSnakeCase(category) as Partial<IApiCategory>
  }
}
