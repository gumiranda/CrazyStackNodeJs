import { Optional, Query } from "@/application/types";
import { UserData } from "@/slices/user/entities";

type UpdateUserDataInput = Optional<
  UserData,
  "createdById" | "name" | "email" | "password" | "role"
>;

export interface UpdateUserRepository {
  updateUser(query: Query, data: UpdateUserDataInput): Promise<UserData | null>;
  incrementAppointmentsTotal(query: Query): Promise<UserData | null>;
}
