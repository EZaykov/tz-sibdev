import { injectable } from "inversify";
import { DealModel } from "../models/Deal";
import { DealRepo as AppDealRepo } from "../../../app/Controllers/Deals/DealRepo";
import { DealRepo as DomainDealRepo } from "../../../domain/Deal/DealRepo";
import { Deal } from "../../../domain/Deal/Deal";
import { Cache } from "./Cache";

@injectable()
export class DealRepoImpl implements DomainDealRepo, AppDealRepo {
  private model = DealModel;
  private cache = new Cache();

  public async findAll() {
    if (this.cache.has()) return this.cache.get();
    const data = await this.model.findAll();
    this.cache.set(data);
    return data;
  }

  public async insert(deals: Deal[]) {
    this.cache.drop();
    await this.model.bulkCreate(deals);
  }
}
