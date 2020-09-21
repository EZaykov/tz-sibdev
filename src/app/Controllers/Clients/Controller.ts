import { inject } from "inversify";
import { controller, httpGet } from "inversify-express-utils";
import { Request, Response } from "express";
import { ClientService } from "@root/domain/Client/ClientService";
import toDTO from "./DTO/toDTO";

@controller("/client")
export class ClientController {
  constructor(@inject(ClientService) private clientService: ClientService) {}

  @httpGet("/topFiveByTotalMoneySpent")
  private async topFiveByTotalMoneySpent(req: Request, res: Response) {
    const AMOUNT = 5;
    const topFiveClients = await this.clientService
      .getTopClientsByTotalMoneySpent(AMOUNT);
    res.json(toDTO(topFiveClients));
  }
}
