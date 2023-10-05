import { Repository } from "@/application/infra/contracts/repository";
import { CarData, CarPaginated } from "@/slices/car/entities";
import {
  AddCarRepository,
  DeleteCarRepository,
  LoadCarByPageRepository,
  LoadCarRepository,
  UpdateCarRepository,
} from "./contracts";
import { Query } from "@/application/types";
export class CarRepository
  implements
    AddCarRepository,
    DeleteCarRepository,
    LoadCarByPageRepository,
    LoadCarRepository,
    UpdateCarRepository
{
  constructor(private readonly repository: Repository) {}
  async addCar(car: CarData): Promise<CarData | null> {
    return this.repository.add(car);
  }
  async deleteCar(query: Query): Promise<CarData | null> {
    return this.repository.deleteOne(query?.fields);
  }
  async loadCarByPage(query: Query): Promise<CarPaginated | null> {
    const cars = await this.repository.getPaginate(
      query?.options?.page ?? 0,
      query?.fields ?? {},
      query?.options?.sort ?? { createdAt: -1 },
      10,
      query?.options?.projection ?? {}
    );
    const total = await this.repository.getCount(query?.fields ?? {});
    return { cars, total };
  }
  async loadCar(query: Query): Promise<CarData | null> {
    return this.repository.getOne(query?.fields ?? {}, query?.options ?? {});
  }
  async updateCar(query: Query, data: CarData): Promise<CarData | null> {
    return this.repository.update(query?.fields ?? {}, data);
  }
}
