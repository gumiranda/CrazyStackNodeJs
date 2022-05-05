export type OwnerData = {
    _id?: string;
    createdById: string;
    name: string;
    active?: boolean;
    createdAt?: Date;
    updatedAt?: Date;
    appointmentsTotal: number;
    ratingsTotal: number;
    haveDelivery: boolean;
    typeTax: string; //fixed or bytime
    costByTimeDriving?: number;
    fidelityTaxPoints?: number; //percentage of service
    fixedTax?: number;
    minimumTimeForReSchedule?: number; //in minutes
    description?: string;
    days1?: any;
    days2?: any;
    hourStart1?: string;
    hourStart2?: string;
    hourEnd1?: string;
    hourEnd2?: string;
    hourLunchStart1?: string;
    hourLunchEnd1?: string;
    hourLunchStart2?: string;
    hourLunchEnd2?: string;
    days3?: any;
    days4?: any;
    hourStart3?: string;
    hourStart4?: string;
    hourEnd3?: string;
    hourEnd4?: string;
    hourLunchStart3?: string;
    hourLunchEnd3?: string;
    hourLunchStart4?: string;
    hourLunchEnd4?: string;
};

export type OwnerPaginated = {
    owners: OwnerData[];
    total: number;
};

export class OwnerEntity {
    createdById: string;
    name: string;
    active?: boolean;
    createdAt?: Date;
    updatedAt?: Date;
    appointmentsTotal: number;
    ratingsTotal: number;
    haveDelivery: boolean;
    typeTax: string; //fixed or bytime
    costByTimeDriving?: number;
    fidelityTaxPoints?: number; //percentage of service
    fixedTax?: number;
    minimumTimeForReSchedule?: number; //in minutes
    description?: string;
    days1?: any;
    days2?: any;
    hourStart1?: string;
    hourStart2?: string;
    hourEnd1?: string;
    hourEnd2?: string;
    hourLunchStart1?: string;
    hourLunchEnd1?: string;
    hourLunchStart2?: string;
    hourLunchEnd2?: string;
    days3?: any;
    days4?: any;
    hourStart3?: string;
    hourStart4?: string;
    hourEnd3?: string;
    hourEnd4?: string;
    hourLunchStart3?: string;
    hourLunchEnd3?: string;
    hourLunchStart4?: string;
    hourLunchEnd4?: string;
    constructor(data: OwnerData) {
        this.createdById = data.createdById;
        this.name = data.name;
        this.active = false;
        this.createdAt = new Date();
        this.updatedAt = new Date();
        this.appointmentsTotal = 0;
        this.ratingsTotal = 0;
        this.haveDelivery = data.haveDelivery;
        this.typeTax = data.typeTax;
        this.costByTimeDriving = data.costByTimeDriving;
        this.fidelityTaxPoints = data.fidelityTaxPoints;
        this.fixedTax = data.fixedTax;
        this.minimumTimeForReSchedule = data.minimumTimeForReSchedule;
        this.description = data.description;
        this.days1 = data.days1;
        this.days2 = data.days2;
        this.hourStart1 = data.hourStart1;
        this.hourStart2 = data.hourStart2;
        this.hourEnd1 = data.hourEnd1;
        this.hourEnd2 = data.hourEnd2;
        this.hourLunchStart1 = data.hourLunchStart1;
        this.hourLunchEnd1 = data.hourLunchEnd1;
        this.hourLunchStart2 = data.hourLunchStart2;
        this.hourLunchEnd2 = data.hourLunchEnd2;
        this.days3 = data.days3;
        this.days4 = data.days4;
        this.hourStart3 = data.hourStart3;
        this.hourStart4 = data.hourStart4;
        this.hourEnd3 = data.hourEnd3;
        this.hourEnd4 = data.hourEnd4;
        this.hourLunchStart3 = data.hourLunchStart3;
        this.hourLunchEnd3 = data.hourLunchEnd3;
        this.hourLunchStart4 = data.hourLunchStart4;
        this.hourLunchEnd4 = data.hourLunchEnd4;
    }
}
