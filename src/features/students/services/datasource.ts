import type { IHttpHandler } from '@/core/interfaces/IHttpHandler'
import type {
  ICreateStudent,
  IStudent,
  IUpdateStudent,
} from '../interfaces/IStudent'
import { AxiosClient } from '@/core/infrastructure/http/axios-client'
import { API_ROUTES } from '@/core/api/routes/api-routes'

interface StudentDataSource {
  getAll(): Promise<IStudent[]>
  getById(id: number): Promise<IStudent | null>
  getAllByTrainer(id: number): Promise<IStudent[]>
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
    const { data } = await this.httpClient.get<IStudent[]>(
      API_ROUTES.STUDENTS.GET_ALL,
    )
    return data
  }

  async getById(id: number) {
    const { data } = await this.httpClient.get<IStudent>(
      API_ROUTES.STUDENTS.GET_BY_ID(id),
    )
    return data
  }

  async getAllByTrainer(id: number) {
    const { data } = await this.httpClient.get<IStudent[]>(
      API_ROUTES.STUDENTS.GET_ALL_BY_TRAINER(id),
    )
    return data
  }

  async create(student: ICreateStudent) {
    const { data } = await this.httpClient.post<IStudent>(
      API_ROUTES.STUDENTS.CREATE,
      student,
    )
    return data
  }

  async update(id: number, student: IUpdateStudent) {
    const { data } = await this.httpClient.patch<IStudent>(
      API_ROUTES.STUDENTS.UPDATE(id),
      student,
    )
    return data
  }

  async remove(id: number) {
    const { data } = await this.httpClient.delete<IStudent>(
      API_ROUTES.STUDENTS.REMOVE(id),
    )
    return data
  }
}
