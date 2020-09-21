import { injectable } from 'inversify';
import { Deal } from './Deal';

export interface DealRepo {
  findAll(): Promise<Deal[]>;
}

export namespace DealRepo {
  export const TYPE = Symbol();

  @injectable()
  export class Fake implements DealRepo {
    public async findAll(){
      return [];
    }
  }
}
