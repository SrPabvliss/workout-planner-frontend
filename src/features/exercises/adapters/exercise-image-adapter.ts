import type {
  IApiExerciseImage,
  IExerciseImage,
} from '../interfaces/IExerciseImage'

export class ExerciseImageAdapter {
  static mapToExerciseImage(apiImage: IApiExerciseImage): IExerciseImage {
    return {
      id: apiImage.id,
      url: apiImage.url,
      publicId: apiImage.public_id,
      isMain: apiImage.is_main,
      createdAt: apiImage.created_at,
    }
  }

  static mapManyToExerciseImage(
    apiImages: IApiExerciseImage[],
  ): IExerciseImage[] {
    return apiImages.map(image =>
      ExerciseImageAdapter.mapToExerciseImage(image),
    )
  }
}
