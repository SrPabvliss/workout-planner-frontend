import type { IHttpHandler } from '@/core/interfaces/IHttpHandler'
import type {
  IApiStudent,
  ICreateStudent,
  IStudent,
  IUpdateStudent,
} from '../interfaces/IStudent'
import { AxiosClient } from '@/core/infrastructure/http/axios-client'
import { API_ROUTES } from '@/core/api/routes/api-routes'
import { StudentAdapter } from '../adapters/student-adapter'

interface StudentDataSource {
  getAll(): Promise<IStudent[]>
  getById(id: number): Promise<IStudent | null>
  getAllByTrainer(id: number): Promise<IStudent[]>
  getByUserId(id: number): Promise<IStudent | null>
  create(student: ICreateStudent): Promise<IStudent>
  update(id: number, student: IUpdateStudent): Promise<IStudent>
  remove(id: number): Promise<IStudent>
}

export class StudentDataSourceImpl implements StudentDataSource {
  private httpClient: IHttpHandler
  private static instance: StudentDataSource

  constructor() {
    this.httpClient = AxiosClient.getInstance()
  }

  static getInstance(): StudentDataSource {
    if (!this.instance) {
      this.instance = new StudentDataSourceImpl()
    }
    return this.instance
  }

  async getAll() {
    const { data } = await this.httpClient.get<IApiStudent[]>(
      API_ROUTES.STUDENTS.GET_ALL,
    )
    return StudentAdapter.mapManyToStudent(data)
  }

  async getById(id: number) {
    const { data } = await this.httpClient.get<IApiStudent>(
      API_ROUTES.STUDENTS.GET_BY_ID(id),
    )
    return StudentAdapter.mapToStudent(data)
  }

  async getAllByTrainer(id: number) {
    const { data } = await this.httpClient.get<IApiStudent[]>(
      API_ROUTES.STUDENTS.GET_ALL_BY_TRAINER(id),
    )
    return StudentAdapter.mapManyToStudent(data)
  }

  async getByUserId(id: number) {
    const { data } = await this.httpClient.get<IApiStudent>(
      API_ROUTES.STUDENTS.GET_BY_USER_ID(id),
    )
    console.log('data', data)
    return StudentAdapter.mapToStudent(data)
  }

  async create(student: ICreateStudent) {
    const { data } = await this.httpClient.post<IApiStudent>(
      API_ROUTES.STUDENTS.CREATE,
      StudentAdapter.mapToApiStudent(student),
    )
    return StudentAdapter.mapToStudent(data)
  }

  async update(id: number, student: IUpdateStudent) {
    const { data } = await this.httpClient.patch<IApiStudent>(
      API_ROUTES.STUDENTS.UPDATE(id),
      StudentAdapter.mapToApiStudent(student),
    )
    return StudentAdapter.mapToStudent(data)
  }

  async remove(id: number) {
    const { data } = await this.httpClient.delete<IApiStudent>(
      API_ROUTES.STUDENTS.REMOVE(id),
    )
    return StudentAdapter.mapToStudent(data)
  }
}
