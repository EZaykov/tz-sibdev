import { Client } from './Client';

export interface ClientRepo {
  findAll(): Promise<Client[]>
}

export namespace ClientRepo {
  export const TYPE = Symbol();
}
