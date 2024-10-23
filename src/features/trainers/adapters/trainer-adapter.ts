import { UserAdapter } from '@/features/users/adpaters/user-adapter'
import type {
  IApiTrainer,
  ITrainer,
} from '../interfaces/ITrainer'
import { toSnakeCase } from '@/lib/case-converter'

export class TrainerAdapter {
  static mapToTrainer(apiTrainer: IApiTrainer): ITrainer {
    return {
      id: apiTrainer.id,
      specialization: apiTrainer.specialization,
      yearsOfExperience: apiTrainer.years_of_experience,
      user: UserAdapter.mapToUser(apiTrainer.user),
    }
  }

  static mapManyToTrainer(apiTrainers: IApiTrainer[]): ITrainer[] {
    return apiTrainers.map(trainer => TrainerAdapter.mapToTrainer(trainer))
  }

  static mapToApiTrainer(trainer: Partial<ITrainer>): Partial<IApiTrainer> {
    return toSnakeCase(trainer) as Partial<IApiTrainer>
  }
}
