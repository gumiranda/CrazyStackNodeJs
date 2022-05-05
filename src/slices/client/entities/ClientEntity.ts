export type ClientData = {
    _id?: string;
    createdById: string;
    name: string;
    active?: boolean;
    createdAt?: Date;
    updatedAt?: Date;
    cpf?: string;
    phone?: string;
    userId: string;
    ownerId: string;
    birthDate?: Date;
    appointmentsTotal?: number;
};

export type ClientPaginated = {
    clients: ClientData[];
    total: number;
};

export class ClientEntity {
    createdById: string;
    name: string;
    active?: boolean;
    createdAt?: Date;
    updatedAt?: Date;
    cpf?: string;
    phone?: string;
    userId: string;
    ownerId: string;
    birthDate?: Date;
    appointmentsTotal?: number;
    constructor(data: ClientData) {
        this.createdById = data.createdById;
        this.name = data.name;
        this.active = false;
        this.createdAt = new Date();
        this.updatedAt = new Date();
        this.phone = data.phone;
        this.cpf = data.cpf;
        this.userId = data.userId;
        this.ownerId = data.ownerId;
        this.birthDate = data.birthDate;
        this.appointmentsTotal = 0;
    }
}
