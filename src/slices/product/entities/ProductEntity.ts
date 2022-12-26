export type ProductData = {
    _id?: string;
    createdById: string;
    name: string;
    active?: boolean;
    createdAt?: Date;
    updatedAt?: Date;
    quantity: number;
};

export type ProductPaginated = {
    products: ProductData[];
    total: number;
};

export class ProductEntity {
    createdById: string;
    name: string;
    active?: boolean;
    createdAt?: Date;
    updatedAt?: Date;
    quantity: number;
    constructor(data: ProductData) {
        this.createdById = data.createdById;
        this.name = data.name;
        this.active = false;
        this.createdAt = new Date();
        this.updatedAt = new Date();
        this.quantity = data.quantity;
    }
}
