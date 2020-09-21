import { injectable } from 'inversify';
import { Deal } from '../../../domain/Deal/Deal';

export interface DealRepo {
  insert(deals: Deal[]): Promise<void>;
}

export namespace DealRepo {
  export const TYPE = Symbol();

  @injectable()
  export class Fake implements DealRepo {
    public async insert(){

    }
  }
}
