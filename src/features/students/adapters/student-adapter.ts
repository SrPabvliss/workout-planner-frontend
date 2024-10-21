import type { IApiStudent, IStudent } from '../interfaces/IStudent'

export class StudentAdapter {
  static mapToStudent(apiStudent: IApiStudent): IStudent {
    return {
      id: apiStudent.id,
      height: apiStudent.height,
      weight: apiStudent.weight,
      trainedBefore: apiStudent.trained_before,
      medicalConditions: apiStudent.medical_conditions,
      user: apiStudent.user,
      trainer: apiStudent.trainer,
    }
  }

  static mapManyToStudent(apiStudents: IApiStudent[]): IStudent[] {
    return apiStudents.map(student => StudentAdapter.mapToStudent(student))
  }
}
