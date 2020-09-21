import { Client } from "../../../../domain/Client/Client";
import { DTO } from "./DTO";

export default (clients: Client[]): DTO => {
  return {
    Status: "OK",
    response: clients.map((v) => {
      return {
        gems: Array.from(v.gemNames),
        spent_money: v.totalMoneySpent,
        username: v.username,
      };
    }),
  };
};
