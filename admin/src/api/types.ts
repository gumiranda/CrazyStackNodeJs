export interface User {
  _id: string;
  createdById: string;
  name: string;
  email: string;
  role: "client" | "owner" | "visitor" | "professional" | "admin";
  active: boolean;
  confirmedEmail?: boolean;
  phone?: string;
  cpf?: string;
  cnpj?: string;
  photoUrl?: string;
  photoId?: string;
  ownerId?: string;
  myOwnerId?: string;
  clientId?: string;
  coord?: { type: "Point"; coordinates: number[] };
  city?: string;
  uf?: string;
  address?: string;
  complement?: string;
  slug?: string;
  payDay?: string;
  plan?: string;
  bio?: string;
  cover?: string;
  link?: string;
  cash?: boolean;
  creditcard?: boolean;
  debitcard?: boolean;
  transferbank?: boolean;
  pix?: boolean;
  appointmentsTotal?: number;
  serviceIds?: string[];
  createdAt: string;
  updatedAt?: string;
}

export interface Owner {
  _id: string;
  createdById: string;
  name: string;
  active: boolean;
  description?: string;
  appointmentsTotal?: number;
  ratingsTotal?: number;
  haveDelivery?: boolean;
  typeTax?: string;
  fixedTax?: number;
  costByTimeDriving?: number;
  fidelityTaxPoints?: number;
  minimumTimeForReSchedule?: number;
  days1?: { monday?: boolean; tuesday?: boolean; wednesday?: boolean; thursday?: boolean; friday?: boolean; saturday?: boolean; sunday?: boolean };
  hourStart1?: string;
  hourEnd1?: string;
  hourLunchStart1?: string;
  hourLunchEnd1?: string;
  days2?: Record<string, boolean>;
  hourStart2?: string;
  hourEnd2?: string;
  hourLunchStart2?: string;
  hourLunchEnd2?: string;
  days3?: Record<string, boolean>;
  hourStart3?: string;
  hourEnd3?: string;
  hourLunchStart3?: string;
  hourLunchEnd3?: string;
  days4?: Record<string, boolean>;
  hourStart4?: string;
  hourEnd4?: string;
  hourLunchStart4?: string;
  hourLunchEnd4?: string;
  createdAt: string;
  updatedAt?: string;
}

export interface Category {
  _id: string;
  createdById: string;
  name: string;
  active: boolean;
  description?: string;
  image?: string;
  createdAt: string;
  updatedAt?: string;
}

export interface Service {
  _id: string;
  createdById: string;
  name: string;
  active: boolean;
  categoryId: string;
  duration: number;
  description?: string;
  price?: number;
  promotionalPrice?: number;
  finalPrice?: number;
  havePromotionalPrice?: boolean;
  comission?: number;
  hasFidelityGenerator?: boolean;
  generateHowManyPoints?: number;
  canPayWithFidelityPoints?: boolean;
  howManyPointsIsNeededToRescue?: number;
  appointmentsTotal?: number;
  createdAt: string;
  updatedAt?: string;
}

export interface Appointment {
  _id: string;
  createdById: string;
  name: string;
  active: boolean;
  status?: number;
  read?: boolean;
  cancelled?: boolean;
  requestId?: string;
  serviceId?: string;
  ownerId?: string;
  clientId?: string;
  professionalId?: string;
  createdForId?: string;
  initDate?: string;
  endDate?: string;
  cancelledAt?: string | null;
  cancelledBy?: string;
  message?: string;
  serviceName?: string;
  professionalName?: string;
  clientName?: string;
  ownerName?: string;
  createdAt: string;
  updatedAt?: string;
}

export interface Request {
  _id: string;
  createdById: string;
  name: string;
  active: boolean;
  status?: number;
  message: string;
  read: boolean;
  push: boolean;
  email: boolean;
  serviceId: string;
  ownerId: string;
  clientId: string;
  clientUserId?: string;
  professionalId: string;
  createdForId: string;
  initDate: string;
  endDate: string;
  duration?: number;
  cancelledAt?: string | null;
  updatedById?: string | null;
  updatedByRole?: string | null;
  haveDelivery?: boolean;
  haveRecurrence?: boolean;
  haveFidelity?: boolean;
  haveRide?: boolean;
  serviceName?: string;
  professionalName?: string;
  clientName?: string;
  ownerName?: string;
  createdAt: string;
  updatedAt?: string;
}

export interface Photo {
  _id: string;
  createdById?: string;
  key: string;
  provider: string;
  url?: string;
  active: boolean;
  expiresIn?: string;
  expiresInSeconds?: number;
  createdAt: string;
  updatedAt?: string;
}

export interface LoginRequest {
  email: string;
  password: string;
  passwordConfirmation: string;
}

export interface LoginResponse {
  refreshToken: string;
  accessToken: string;
  user: User;
}

export interface PaginatedResponse<T> {
  [key: string]: T[] | number;
  total: number;
}

export interface PageQuery {
  page?: number;
  sortBy?: string;
  typeSort?: "asc" | "desc";
  [key: string]: unknown;
}
