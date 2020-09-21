import * as _ from 'lodash';
import { inject, injectable } from "inversify";
import { Client } from "./Client";
import { ClientRepo } from "./ClientRepo";
import { DealRepo } from "../Deal/DealRepo";
import { Deal } from "../Deal/Deal";

@injectable()
export class ClientRepoImpl implements ClientRepo {
  constructor(@inject(DealRepo.TYPE) private dealRepo: DealRepo) {
    this.findAll();
  }

  public async findAll(): Promise<Client[]> {
    const deals = await this.dealRepo.findAll();
    return this.fromDeals(deals);
  }

  private fromDeals(deals: Deal[]): Client[] {
    const map = deals.reduce((acc: Map<string, Client>, v) => {
      const client = acc.get(v.clientUsername);
      if (!client)
        acc.set(v.clientUsername, {
          gemNames: new Set([v.gemName]),
          totalMoneySpent: v.total,
          username: v.clientUsername,
        });
      else {
        client.gemNames.add(v.gemName);
        client.totalMoneySpent += v.total;
      }
      return acc;
    }, new Map());
    return [...map.values()];
  }
}
