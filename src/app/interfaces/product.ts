export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  stock: number;
  imageUrl?: string;
  owner?: ProductOwner;
  createdAt: string;
  updatedAt: string;
}

export interface ProductOwner {
  id: number;
  name?: string;
  email?: string;
}

export interface CreateProductDto {
  name: string;
  description: string;
  price: number;
  stock?: number;
  imageUrl?: string;
}

export type UpdateProductDto = Partial<CreateProductDto>;

export interface DeleteProductDto {
  id?: string;
}
