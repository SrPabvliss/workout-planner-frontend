import { NutritionalInfoAdapter } from './nutritional-info-adapter'
import type {
  IApiIngredient,
  ICreateIngredient,
  IIngredient,
  IUpdateIngredient,
} from '../interfaces/IIngredient'
import { toSnakeCase } from '@/lib/case-converter'

export class IngredientAdapter {
  static mapToIngredient(apiIngredient: IApiIngredient): IIngredient {
    console.log('apiIngredient', apiIngredient)
    return {
      id: apiIngredient.id,
      name: apiIngredient.name,
      normalizedName: apiIngredient.normalized_name,
      isActive: apiIngredient.is_active,
      nutritionalInfo: NutritionalInfoAdapter.mapToNutritionalInfo(
        apiIngredient.nutritional_info,
      ),
      createdAt: apiIngredient.created_at,
      updatedAt: apiIngredient.updated_at,
    }
  }

  static mapManyToIngredient(apiIngredients: IApiIngredient[]): IIngredient[] {
    console.log('apiIngredients', apiIngredients)
    return apiIngredients.map(ingredient =>
      IngredientAdapter.mapToIngredient(ingredient),
    )
  }

  static mapToApiIngredient(
    ingredient: Partial<IIngredient> | ICreateIngredient | IUpdateIngredient,
  ): Partial<IApiIngredient> {
    return toSnakeCase(ingredient) as Partial<IApiIngredient>
  }
}
