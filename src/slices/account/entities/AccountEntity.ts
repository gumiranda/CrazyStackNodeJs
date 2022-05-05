export type AccountData = {
    _id?: string;
    createdById: string;
    name: string;
    active?: boolean;
    createdAt?: Date;
    updatedAt?: Date;
    refreshToken: string;
    expiresAt?: string;
};

export type AccountPaginated = {
    accounts: AccountData[];
    total: number;
};

export class AccountEntity {
    createdById: string;
    name: string;
    active?: boolean;
    createdAt?: Date;
    updatedAt?: Date;
    refreshToken: string;
    expiresAt?: string;
    constructor(data: AccountData) {
        this.createdById = data.createdById;
        this.name = data.name;
        this.refreshToken = data.refreshToken;
        this.expiresAt = data.expiresAt;
        this.active = true;
        this.createdAt = new Date();
        this.updatedAt = new Date();
    }
}
