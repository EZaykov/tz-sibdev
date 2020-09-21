import { Deal } from "../../../domain/Deal/Deal";

export class Cache {
  private cache: Deal[] | undefined;

  public get(): Deal[] {
    if (!this.has()) throw new Error("Cache is empty!");
    return this.cache!;
  }

  public has() {
    return !!this.cache && !!this.cache.length;
  }

  public set(deals: Deal[]) {
    this.cache = deals;
  }

  public drop() {
    this.cache = undefined;
  }
}
