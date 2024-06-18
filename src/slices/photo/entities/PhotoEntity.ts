export type PhotoData = {
    _id?: string;
    createdById: string;
    name: string;
    active?: boolean;
    createdAt?: Date;
    updatedAt?: Date;
};

export type PhotoPaginated = {
    photos: PhotoData[];
    total: number;
};

export class PhotoEntity {
    createdById: string;
    name: string;
    active?: boolean;
    createdAt?: Date;
    updatedAt?: Date;
    constructor(data: PhotoData) {
        this.createdById = data.createdById;
        this.name = data.name;
        this.active = false;
        this.createdAt = new Date();
        this.updatedAt = new Date();
    }
}
