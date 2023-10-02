import { Client } from "src/app/clients/model/clients";
import { Product } from "src/app/products/model/product";

export interface Sale {
  _id: string;
  client: Client;
  product: Product;
}
