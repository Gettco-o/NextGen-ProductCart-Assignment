export interface Product {
      id: number;
      name: string;
      description: string;
      price: number;
      category: string;
      imageUrl: string;
      inStock: boolean;
      rating: number;
      properties: p[];
}


interface p {
    color: string;
    weight: string;
}
