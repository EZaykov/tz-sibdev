import { Deal } from '../../../../../domain/Deal/Deal';
import { DealFromRecord } from './DealFromRecord';
import { ParsedRecord } from './ParseCSV/ParsedRecord';

export class DealFromRecordFactory {
  public create(record: ParsedRecord): Deal {
    return new DealFromRecord(record);
  }
}
