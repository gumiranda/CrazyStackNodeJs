export type OrderData = {
    _id?: string;
    createdById: string;
    name: string;
    active?: boolean;
    createdAt?: Date;
    updatedAt?: Date;
    percentageAdopted?: number;
    paymentForm?: string;
    orderPaidByClient?: boolean;
    comissionPaidByOwner?: boolean;
    comissionValue?: number;
    totalValue?: number;
    professionalId?: string;
    ownerId?: string;
    requestId?: string;
    clientId?: string;
    extraCost?: number;
    normalCost?: number;
    haveFidelity?: boolean;
    haveDelivery?: boolean;
    pointsUsed?: number;
    appointmentDate?: Date;
};

export type OrderPaginated = {
    orders: OrderData[];
    total: number;
};

export class OrderEntity {
    createdById: string;
    name: string;
    active?: boolean;
    createdAt?: Date;
    updatedAt?: Date;
    percentageAdopted?: number;
    paymentForm?: string;
    orderPaidByClient?: boolean;
    comissionPaidByOwner?: boolean;
    comissionValue?: number;
    totalValue?: number;
    professionalId?: string;
    ownerId?: string;
    requestId?: string;
    clientId?: string;
    extraCost?: number;
    normalCost?: number;
    haveFidelity?: boolean;
    haveDelivery?: boolean;
    pointsUsed?: number;
    appointmentDate?: Date;
    constructor(data: OrderData) {
        this.createdById = data.createdById;
        this.name = data.name;
        this.active = false;
        this.createdAt = new Date();
        this.updatedAt = new Date();
        this.percentageAdopted = data.percentageAdopted;
        this.paymentForm = data.paymentForm;
        this.orderPaidByClient = data.orderPaidByClient;
        this.comissionPaidByOwner = data.comissionPaidByOwner;
        this.comissionValue = data.comissionValue;
        this.totalValue = data.totalValue;
        this.professionalId = data.professionalId;
        this.ownerId = data.ownerId;
        this.requestId = data.requestId;
        this.clientId = data.clientId;
        this.extraCost = data.extraCost;
        this.normalCost = data.normalCost;
        this.haveFidelity = data.haveFidelity;
        this.haveDelivery = data.haveDelivery;
        this.pointsUsed = data.pointsUsed;
        this.appointmentDate = data.appointmentDate;
    }
}
