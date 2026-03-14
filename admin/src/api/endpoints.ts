import { api } from "./client";
import type {
  LoginRequest,
  LoginResponse,
  User,
  Owner,
  Category,
  Service,
  Appointment,
  Request as RequestEntity,
  Photo,
  PageQuery,
} from "./types";

// Auth
export const authApi = {
  login: (data: LoginRequest) =>
    api.post<LoginResponse>("/auth/login", data).then((r) => r.data),
};

// Generic CRUD factory
function createCrud<T>(entity: string) {
  return {
    loadByPage: (query: PageQuery = {}) =>
      api
        .get<{ [key: string]: T[] | number; total: number }>(
          `/${entity}/loadByPage`,
          { params: { page: 1, sortBy: "createdAt", typeSort: "desc", ...query } },
        )
        .then((r) => r.data),

    load: (id: string) =>
      api.get<T>(`/${entity}/load`, { params: { _id: id } }).then((r) => r.data),

    add: (data: Partial<T>) =>
      api.post<T>(`/${entity}/add`, data).then((r) => r.data),

    update: (id: string, data: Partial<T>) =>
      api.patch<T>(`/${entity}/update`, data, { params: { _id: id } }).then((r) => r.data),

    delete: (id: string) =>
      api.delete(`/${entity}/delete`, { params: { _id: id } }).then((r) => r.data),
  };
}

export const userApi = createCrud<User>("user");
export const ownerApi = createCrud<Owner>("owner");
export const categoryApi = createCrud<Category>("category");
export const serviceApi = createCrud<Service>("service");
export const appointmentApi = {
  ...createCrud<Appointment>("appointment"),
  loadAvailableTimes: (params: Record<string, string>) =>
    api.get("/appointment/loadAvailableTimes", { params }).then((r) => r.data),
  loadInvoice: (params: Record<string, string>) =>
    api.get("/appointment/loadInvoice", { params }).then((r) => r.data),
};
export const requestApi = createCrud<RequestEntity>("request");
export const photoApi = createCrud<Photo>("photo");
