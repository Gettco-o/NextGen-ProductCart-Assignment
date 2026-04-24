export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  stock: number;
  imageUrl?: string;
  owner?: any;
  category: Category;
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
  categoryId: number;
}

export interface Category {
  id: number;
  name: string;
  description: string;
  createdAt: string;
  updatedAt: string;
}

export type UpdateProductDto = Partial<CreateProductDto>;

export interface DeleteProductDto {
  id?: string;
}


/* ?

{
  "success": true,
  "data": {
    "id": 1,
    "name": "Nunex",
    "description": "Good nunex",
    "price": "20000.00",
    "stock": 30,
    "imageUrl": "https://ng.jumia.is/unsafe/fit-in/680x680/filters:fill(white)/product/91/6994793/1.jpg?4273",
    "owner": {
      "id": 2,
      "firstName": "Nuno",
      "lastName": "Espirito",
      "email": "nuno@web.com",
      "phoneNumber": "2438028181248",
      "createdAt": "2026-03-14T14:05:18.065Z",
      "updatedAt": "2026-03-14T14:05:18.065Z"
    },
    "category": {
      "id": 1,
      "name": "Electronics",
      "description": "Phones, laptops, accessories, and other electronic devices.",
      "createdAt": "2026-04-24T21:38:42.783Z",
      "updatedAt": "2026-04-24T21:38:42.783Z"
    },
    "createdAt": "2026-03-14T14:16:35.961Z",
    "updatedAt": "2026-03-27T09:34:33.182Z"
  }
}

 */
