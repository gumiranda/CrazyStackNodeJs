export type ServiceData = {
    _id?: string;
    createdById: string;
    name: string;
    active?: boolean;
    createdAt?: Date;
    updatedAt?: Date;
    categoryId: string;
    duration: number;
    description?: string;
    productsQuantityNeeded?: number;
    productId?: string;
    promotionalPrice?: number;
    price?: number;
    finalPrice?: number;
    comission?: number;
    havePromotionalPrice?: boolean;
    hasFidelityGenerator?: boolean;
    generateHowManyPoints?: number;
    appointmentsTotal?: number;
    canPayWithFidelityPoints?: boolean;
    howManyPointsIsNeededToRescue?: number;
};

export type ServicePaginated = {
    services: ServiceData[];
    total: number;
};

export class ServiceEntity {
    createdById: string;
    name: string;
    active?: boolean;
    createdAt?: Date;
    updatedAt?: Date;
    categoryId: string;
    duration: number;
    description?: string;
    productsQuantityNeeded?: number;
    productId?: string;
    promotionalPrice?: number;
    price?: number;
    finalPrice?: number;
    comission?: number;
    havePromotionalPrice?: boolean;
    hasFidelityGenerator?: boolean;
    generateHowManyPoints?: number;
    appointmentsTotal?: number;
    canPayWithFidelityPoints?: boolean;
    howManyPointsIsNeededToRescue?: number;
    constructor(data: ServiceData) {
        this.createdById = data.createdById;
        this.name = data.name;
        this.active = false;
        this.createdAt = new Date();
        this.updatedAt = new Date();
        this.name = data.name;
        this.description = data.description;
        this.createdById = data.createdById;
        this.productsQuantityNeeded = data.productsQuantityNeeded;
        this.productId = data.productId;
        this.promotionalPrice = data.promotionalPrice;
        this.price = data.price;
        this.finalPrice = data.finalPrice;
        this.comission = data.comission;
        this.havePromotionalPrice = data.havePromotionalPrice;
        this.hasFidelityGenerator = data.hasFidelityGenerator;
        this.appointmentsTotal = 0;
        this.canPayWithFidelityPoints = data.canPayWithFidelityPoints;
        this.categoryId = data.categoryId;
        this.duration = data.duration;
    }
}
