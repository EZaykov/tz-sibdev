import { injectable } from "inversify";
import { ParseCSV } from "./ParseCSV/ParseCSV";
import { DealFromRecordFactory } from "./DealFromRecordFactory";

@injectable()
export class DealsFromCSVService {
  private parseCSV = new ParseCSV();
  private dealFactory = new DealFromRecordFactory();

  public async convert(csv: Buffer) {
    const parsed = await this.parseCSV.parse(csv);
    return parsed.map((v) => this.dealFactory.create(v));
  }
}
