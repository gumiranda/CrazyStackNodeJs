import { SilvioSantosData } from "@/slices/silvioSantos/entities";

export interface AddSilvioSantosRepository {
    addSilvioSantos(silvioSantos: SilvioSantosData): Promise<SilvioSantosData | null>;
}
