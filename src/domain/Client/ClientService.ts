import * as _ from "lodash";
import { injectable, inject } from "inversify";
import { ClientRepo } from "./ClientRepo";
import { Client } from "./Client";
import { PopularGems } from "./PopularGems";

@injectable()
export class ClientService {
  constructor(@inject(ClientRepo.TYPE) private clientRepo: ClientRepo) {}

  public async getTopClientsByTotalMoneySpent(amount: number) {
    const clients = await this.clientRepo.findAll();
    const sorted = this.sortByTotalMoneySpent(clients);
    const topClients = sorted.slice(0, amount);
    PopularGems.apply(topClients);
    return topClients;
  }

  private sortByTotalMoneySpent(clients: Client[]) {
    return clients.sort((a, b) => b.totalMoneySpent - a.totalMoneySpent);
  }
}
