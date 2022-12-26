export type FidelityData = {
    _id?: string;
    createdById: string;
    name: string;
    active?: boolean;
    createdAt?: Date;
    updatedAt?: Date;
    ownerId: string;
    requestId: string;
    points: number;
    clientId: string;
};

export type FidelityPaginated = {
    fidelitys: FidelityData[];
    total: number;
};

export class FidelityEntity {
    createdById: string;
    name: string;
    active?: boolean;
    createdAt?: Date;
    updatedAt?: Date;
    ownerId: string;
    requestId: string;
    points: number;
    clientId: string;
    constructor(data: FidelityData) {
        this.createdById = data.createdById;
        this.name = data.name;
        this.active = false;
        this.createdAt = new Date();
        this.updatedAt = new Date();
        this.ownerId = data.ownerId;
        this.requestId = data.requestId;
        this.clientId = data.clientId;
        this.points = data.points;
    }
}
