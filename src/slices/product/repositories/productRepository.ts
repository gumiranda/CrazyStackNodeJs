import { Repository } from "@/application/infra/contracts/repository";
import { ProductData, ProductPaginated } from "@/slices/product/entities";
import {
  AddProductRepository,
  DeleteProductRepository,
  LoadProductByPageRepository,
  LoadProductRepository,
  UpdateProductRepository,
} from "./contracts";
import { Query } from "@/application/types";
export class ProductRepository
  implements
    AddProductRepository,
    DeleteProductRepository,
    LoadProductByPageRepository,
    LoadProductRepository,
    UpdateProductRepository
{
  constructor(private readonly repository: Repository) {}
  async addProduct(product: ProductData): Promise<ProductData | null> {
    return this.repository.add(product);
  }
  async deleteProduct(query: Query): Promise<ProductData | null> {
    return this.repository.deleteOne(query?.fields);
  }
  async loadProductByPage(query: Query): Promise<ProductPaginated | null> {
    const products = await this.repository.getPaginate(
      query?.options?.page ?? 0,
      query?.fields ?? {},
      query?.options?.sort ?? { createdAt: -1 },
      10,
      query?.options?.projection ?? {}
    );
    const total = await this.repository.getCount(query?.fields ?? {});
    return { products, total };
  }
  async loadProduct(query: Query): Promise<ProductData | null> {
    return this.repository.getOne(query?.fields ?? {}, query?.options ?? {});
  }
  async updateProduct(query: Query, data: ProductData): Promise<ProductData | null> {
    return this.repository.update(query?.fields ?? {}, data);
  }
}
