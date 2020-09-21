import { Deal } from "../../../../../domain/Deal/Deal";
import { ParsedRecord } from "./ParseCSV/ParsedRecord";

export class DealFromRecord implements Deal {
  public readonly clientUsername: string;
  public readonly gemName: string;
  public readonly gemQuantity: number;
  public readonly total: number;
  public readonly date: Date;

  constructor(private record: ParsedRecord) {
    this.clientUsername = record.customer;
    this.gemName = record.item;
    this.gemQuantity = parseInt(record.quantity);
    this.total = parseFloat(record.total);
    this.date = new Date(record.date);
    this.validate();
  }

  private validate() {
    if (Object.values(this).some((v) => !v))
      throw new Error(
        `Invalid CSV Record ${JSON.stringify(this.record, null, 2)}`
      );
  }
}
