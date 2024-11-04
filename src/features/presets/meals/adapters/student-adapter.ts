import { UserAdapter } from '@/features/users/adpaters/user-adapter'
import type {
  IApiStudent,
  ICreateStudent,
  IStudent,
  IUpdateStudent,
} from '../interfaces/IStudent'
import { TrainerAdapter } from '@/features/trainers/adapters/trainer-adapter'
import { toSnakeCase } from '@/lib/case-converter'

export class StudentAdapter {
  static mapToStudent(apiStudent: IApiStudent): IStudent {
    return {
      id: apiStudent.id,
      height: apiStudent.height,
      weight: apiStudent.weight,
      trainedBefore: apiStudent.trained_before,
      medicalConditions: apiStudent.medical_conditions,
      user: UserAdapter.mapToUser(apiStudent.user),
      trainer: TrainerAdapter.mapToTrainer(apiStudent.trainer),
    }
  }

  static mapManyToStudent(apiStudents: IApiStudent[]): IStudent[] {
    return apiStudents.map(student => StudentAdapter.mapToStudent(student))
  }

  static mapToApiStudent(
    student: Partial<IStudent> | ICreateStudent | IUpdateStudent,
  ): Partial<IApiStudent> {
    return toSnakeCase(student) as Partial<IApiStudent>
  }
}
