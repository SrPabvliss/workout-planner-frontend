import type { IApiTrainer, ITrainer } from '../interfaces/ITrainer'

export class TrainerAdapter {
  static mapToTrainer(apiTrainer: IApiTrainer): ITrainer {
    return {
      id: apiTrainer.id,
      specialization: apiTrainer.specialization,
      yearsOfExperience: apiTrainer.years_of_experience,
      user: apiTrainer.user,
    }
  }

  static mapManyToTrainer(apiTrainers: IApiTrainer[]): ITrainer[] {
    return apiTrainers.map(trainer => TrainerAdapter.mapToTrainer(trainer))
  }
}
