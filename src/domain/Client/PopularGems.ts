import * as _ from "lodash";
import { Client } from "./Client";

export class PopularGems {
  public static apply(topClients: Client[]) {
    const popularGems = new PopularGems(topClients);
    topClients.forEach((v) => popularGems.apply(v));
  }

  private get popularGems() {
    const MIN_BUYS = 2;
    return _(this.topClients)
      .map((v) => Array.from(v.gemNames))
      .flatten()
      .groupBy()
      .pickBy((v) => v.length >= MIN_BUYS)
      .keys()
      .value();
  }

  private constructor(private topClients: Client[]) {}

  private apply(topClient: Client) {
    const popularOnly = Array.from(topClient.gemNames).filter((v) =>
      this.popularGems.includes(v)
    );
    topClient.gemNames = new Set(popularOnly);
  }
}
