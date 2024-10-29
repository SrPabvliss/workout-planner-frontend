import { CategoryAdapter } from '@/features/categories/adapters/category-adapter'
import { toSnakeCase } from '@/lib/case-converter'
import type {
  IApiExercise,
  ICreateExercise,
  IExercise,
  IUpdateExercise,
} from '../interfaces/IExercise'
import { ExerciseImageAdapter } from './exercise-image-adapter'

export class ExerciseAdapter {
  static mapToExercise(apiExercise: IApiExercise): IExercise {
    return {
      id: apiExercise.id,
      name: apiExercise.name,
      description: apiExercise.description,
      youtubeUrl: apiExercise.youtube_url,
      normalizedName: apiExercise.normalized_name,
      createdBy: apiExercise.created_by,
      createdAt: apiExercise.created_at,
      updatedAt: apiExercise.updated_at,
      images: ExerciseImageAdapter.mapManyToExerciseImage(apiExercise.images),
      categories: CategoryAdapter.mapManyToCategory(apiExercise.categories),
    }
  }

  static mapManyToExercise(apiExercises: IApiExercise[]): IExercise[] {
    return apiExercises.map(exercise => ExerciseAdapter.mapToExercise(exercise))
  }

  static mapToApiExercise(
    exercise: Partial<IExercise> | ICreateExercise | IUpdateExercise,
  ): Partial<IApiExercise> {
    return toSnakeCase(exercise) as Partial<IApiExercise>
  }
}
