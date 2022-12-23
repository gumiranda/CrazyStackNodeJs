import { AddSilvioSantosRepository } from "@/slices/silvioSantos/repositories";
import { SilvioSantosEntity, SilvioSantosData } from "@/slices/silvioSantos/entities";

export type AddSilvioSantos = (
    data: SilvioSantosData
) => Promise<SilvioSantosEntity | null>;
export type AddSilvioSantosSignature = (
    addSilvioSantos: AddSilvioSantosRepository
) => AddSilvioSantos;
export const addSilvioSantos: AddSilvioSantosSignature =
    (addSilvioSantosRepository: AddSilvioSantosRepository) => (data: SilvioSantosData) => {
        return addSilvioSantosRepository.addSilvioSantos(new SilvioSantosEntity(data));
    };
