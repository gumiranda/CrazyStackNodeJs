import { Repository } from "@/application/infra/contracts/repository";
import { CustomerData, CustomerPaginated } from "@/slices/payment/customer/entities";
import {
  AddCustomerRepository,
  DeleteCustomerRepository,
  LoadCustomerByPageRepository,
  LoadCustomerRepository,
  UpdateCustomerRepository,
} from "./contracts";
import { Query } from "@/application/types";
export class CustomerRepository
  implements
    AddCustomerRepository,
    DeleteCustomerRepository,
    LoadCustomerByPageRepository,
    LoadCustomerRepository,
    UpdateCustomerRepository
{
  constructor(private readonly repository: Repository) {}
  async addCustomer(customer: CustomerData): Promise<CustomerData | null> {
    return this.repository.add(customer);
  }
  async deleteCustomer(query: Query): Promise<CustomerData | null> {
    return this.repository.deleteOne(query?.fields);
  }
  async loadCustomerByPage(query: Query): Promise<CustomerPaginated | null> {
    const customers = await this.repository.getPaginate(
      query?.options?.page ?? 0,
      query?.fields ?? {},
      query?.options?.sort ?? { createdAt: -1 },
      10,
      query?.options?.projection ?? {}
    );
    const total = await this.repository.getCount(query?.fields ?? {});
    return { customers, total };
  }
  async loadCustomer(query: Query): Promise<CustomerData | null> {
    return this.repository.getOne(query?.fields ?? {}, query?.options ?? {});
  }
  async updateCustomer(query: Query, data: CustomerData): Promise<CustomerData | null> {
    return this.repository.update(query?.fields ?? {}, data);
  }
}
