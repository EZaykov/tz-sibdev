import "reflect-metadata";
import * as express from "express";
import * as morgan from "morgan";

import "./app/Controllers/controllers";
import { InversifyExpressServer } from "inversify-express-utils";
import CONTAINER from "./inversify.config";

const app = express();
app.use(morgan("dev"));

const server = new InversifyExpressServer(
  CONTAINER,
  null,
  { rootPath: "/api" },
  app
);
server.build();

const port = process.env.APP_PORT || 3000;

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
