import { inject } from "inversify";
import { controller, httpPost } from "inversify-express-utils";
import { Response } from "express";
import { DealRepo } from "./DealRepo";
import { DealsFromCSVService } from "./services/DealsFromCSV/DealsFromCSV";
import patchedUpload, { PatchedRequest } from "./middleware/patchedUpload";

@controller("/deal")
export class DealsController {
  constructor(
    @inject(DealRepo.TYPE) private dealRepo: DealRepo,
    @inject(DealsFromCSVService) private csvDeals: DealsFromCSVService
  ) {}

  @httpPost("/uploadCSV", patchedUpload)
  private async uploadCSV(req: PatchedRequest, res: Response) {
    if (req.uploadError)
      return res.status(400).json({
        Status: "Error",
        Desc: req.uploadError.message,
      });
    if(!req.file?.buffer)
      return res.status(400).json({
        Status: "Error",
        Desc: 'Invalid CSV file',
      });
    try {
      const deals = await this.csvDeals.convert(req.file.buffer);
      await this.dealRepo.insert(deals);
      return res.json({ Status: "OK" });
    } catch (err) {
      return res.status(400).json({ Status: "Error", Desc: err.message });
    }
  }
}
