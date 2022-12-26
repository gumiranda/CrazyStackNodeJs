export type CategoryData = {
    _id?: string;
    createdById: string;
    name: string;
    active?: boolean;
    description?: string;
    image?: string;
    createdAt?: Date;
    updatedAt?: Date;
};

export type CategoryPaginated = {
    categorys: CategoryData[];
    total: number;
};

export class CategoryEntity {
    createdById: string;
    name: string;
    active?: boolean;
    description?: string;
    image?: string;
    createdAt?: Date;
    updatedAt?: Date;
    constructor(data: CategoryData) {
        this.createdById = data.createdById;
        this.name = data.name;
        this.active = false;
        this.description = data.description;
        this.image = data.image;
        this.createdAt = new Date();
        this.updatedAt = new Date();
    }
}
