import { AxiosClient } from "@/core/infrastructure/http/axios-client"
import type { IHttpHandler } from "@/core/interfaces/IHttpHandler"
import type { IApiTrainer, ICreateTrainer, ITrainer, IUpdateTrainer } from "../interfaces/ITrainer"
import { API_ROUTES } from "@/core/api/routes/api-routes"
import { TrainerAdapter } from "../adapters/trainer-adapter"

interface TrainerDataSource {
  getAll(): Promise<ITrainer[]>
  getById(id: number): Promise<ITrainer | null>
  getByUserId(id: number): Promise<ITrainer | null>
  create(trainer: ICreateTrainer): Promise<ITrainer>
  update(id: number, trainer: IUpdateTrainer): Promise<ITrainer>
  remove(id: number): Promise<ITrainer>
}

export class TrainerDataSourceImpl implements TrainerDataSource {
  private httpClient: IHttpHandler
  private static instance: TrainerDataSource

  constructor() {
    this.httpClient = AxiosClient.getInstance()
  }

  static getInstance(): TrainerDataSource {
    if (!this.instance) {
      this.instance = new TrainerDataSourceImpl()
    }
    return this.instance
  }

  async getAll() {
    const { data } = await this.httpClient.get<IApiTrainer[]>(
      API_ROUTES.TRAINER.GET_ALL,
    )
    return TrainerAdapter.mapManyToTrainer(data)
  }

  async getById(id: number) {
    const { data } = await this.httpClient.get<IApiTrainer>(
      API_ROUTES.TRAINER.GET_BY_ID(id),
    )
    return TrainerAdapter.mapToTrainer(data)
  }

  async getByUserId(id: number) {
    const { data } = await this.httpClient.get<IApiTrainer>(
      API_ROUTES.TRAINER.GET_BY_USER_ID(id),
    )
    return TrainerAdapter.mapToTrainer(data)
  } 

  async create(trainer: ICreateTrainer) {
    const { data } = await this.httpClient.post<IApiTrainer>(
      API_ROUTES.TRAINER.CREATE,
      trainer,
    )
    return TrainerAdapter.mapToTrainer(data)
  }

  async update(id: number, trainer: IUpdateTrainer) {
    const { data } = await this.httpClient.patch<IApiTrainer>(
      API_ROUTES.TRAINER.UPDATE(id),
      trainer,
    )
    return TrainerAdapter.mapToTrainer(data)
  }

  async remove(id: number) {
    const { data } = await this.httpClient.delete<IApiTrainer>(
      API_ROUTES.TRAINER.REMOVE(id),
    )
    return TrainerAdapter.mapToTrainer(data)
  }

}