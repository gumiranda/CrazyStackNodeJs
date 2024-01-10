import { RequestData } from "@/slices/request/entities";

export interface IUpdateRequestById {
  updateRequestById(id: string, data: RequestData): Promise<any>;
}
