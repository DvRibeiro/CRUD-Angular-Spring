import { Client } from "src/app/clients/model/clients";

export interface Sale {
  _id: string;
  client: Client;
  product: string;
}
