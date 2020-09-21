import * as _ from "lodash";
import * as parse from "csv-parse";
import { Options } from "csv-parse";
import { ParsedCSV } from "./ParsedCSV";

export class ParseCSV {
  private static properHeader = [
    "customer",
    "item",
    "total",
    "quantity",
    "date",
  ];

  public async parse(csv: Buffer): Promise<ParsedCSV> {
    const parsed = await this._parse(csv);
    this.validateHeader(parsed);
    return parsed;
  }

  private _parse(csv: Buffer): Promise<ParsedCSV> {
    const opts: Options = {
      delimiter: ",",
      columns: true,
    };
    return new Promise((resolve, reject) => {
      parse(csv, opts, (err, rawDealsData) => {
        if (err) return reject(err);
        resolve(rawDealsData);
      });
    });
  }

  private validateHeader(parsed: ParsedCSV) {
    const header = Object.keys(parsed[0]);
    if (!_.isEqual(header, ParseCSV.properHeader))
      throw new Error(`Invalid CSV header: ${JSON.stringify(header, null, 2)}`);
  }
}
