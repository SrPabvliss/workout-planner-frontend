import type {
  IApiNutritionalInfo,
  INutritionalInfo,
} from '../interfaces/INutritionalInfo'
import { toSnakeCase } from '@/lib/case-converter'

export class NutritionalInfoAdapter {
  static mapToNutritionalInfo(
    apiNutritionalInfo: IApiNutritionalInfo,
  ): INutritionalInfo {
    return {
      calories: apiNutritionalInfo.calories,
      protein: apiNutritionalInfo.protein,
      carbs: apiNutritionalInfo.carbs,
      fat: apiNutritionalInfo.fat,
      fiber: apiNutritionalInfo.fiber,
      sugar: apiNutritionalInfo.sugar,
      sodium: apiNutritionalInfo.sodium,
      servingSize: apiNutritionalInfo.serving_size,
      servingUnit: apiNutritionalInfo.serving_unit,
    }
  }

  static mapToApiNutritionalInfo(
    nutritionalInfo: Partial<INutritionalInfo>,
  ): Partial<IApiNutritionalInfo> {
    return toSnakeCase(nutritionalInfo) as Partial<IApiNutritionalInfo>
  }
}
