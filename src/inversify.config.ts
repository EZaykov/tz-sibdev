import { Container } from 'inversify';
import { ClientRepoImpl } from './domain/Client/ClientRepoImpl';
import { ClientRepo } from './domain/Client/ClientRepo';
import { ClientService } from './domain/Client/ClientService';
import { DealRepo as DomainDealRepo } from './domain/Deal/DealRepo';
import { DealRepo as AppDealRepo } from './app/Controllers/Deals/DealRepo';
import { DealsFromCSVService } from './app/Controllers/Deals/services/DealsFromCSV/DealsFromCSV';
import { DealRepoImpl } from './infra/DB/repos/DealRepoImpl';

const CONTAINER = new Container;

CONTAINER.bind<AppDealRepo>(AppDealRepo.TYPE).to(DealRepoImpl);
CONTAINER.bind<DomainDealRepo>(DomainDealRepo.TYPE).to(DealRepoImpl);
CONTAINER.bind<ClientRepo>(ClientRepo.TYPE).to(ClientRepoImpl);
CONTAINER.bind(ClientService).toSelf();
CONTAINER.bind(DealsFromCSVService).toSelf();

export default CONTAINER;
