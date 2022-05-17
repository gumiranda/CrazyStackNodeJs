import { AbstractHandler } from "../contracts";
import { AddFidelityRepository } from "@/slices/fidelity/repositories";

export class FidelityHandler extends AbstractHandler {
    constructor(private readonly addFidelityRepository: AddFidelityRepository) {
        super();
    }
    override async handle(request: any): Promise<any> {
        if (
            request?.haveFidelity === true &&
            (request?.status === 10 || request?.status === 11)
        ) {
            const fidelityAdded = await this.addFidelityRepository.addFidelity({
                active: true,
                ownerId: request?.ownerId,
                createdById: request?.createdById,
                name: request?.name,
                requestId: request?.requestId,
                points: request?.fidelity?.points,
                clientId: request?.clientId,
                createdAt: new Date(),
                updatedAt: new Date(),
            });
            if (!fidelityAdded) {
                throw new Error("Erro ao adicionar os pontos de fidelidade pro cliente");
            }
        }
        return super.handle(request);
    }
}
