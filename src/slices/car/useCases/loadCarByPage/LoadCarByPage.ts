import { LoadCarByPageRepository } from "@/slices/car/repositories";
import { CarPaginated } from "@/slices/car/entities";
import { Query } from "@/application/types";

export type LoadCarByPage = (query: Query) => Promise<CarPaginated | null>;
export type LoadCarByPageSignature = (
  loadCarByPage: LoadCarByPageRepository
) => LoadCarByPage;
export const loadCarByPage: LoadCarByPageSignature =
  (loadCarByPageRepository: LoadCarByPageRepository) => async (query: Query) => {
    return loadCarByPageRepository.loadCarByPage(query);
  };
