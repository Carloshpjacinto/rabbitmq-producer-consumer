import { RabbitMqSetup } from "./rabbitmq/rabbitmq.setup";
import { Request, Response } from "express";
import { ServerSetup } from "./server/server.setup";
import { validationMiddleware } from "./middleware/validate.middleware";
import { CreatePeditoDto } from "./dtos/create-pedido.dto";
require("dotenv").config();

(async (): Promise<void> => {
  const server = new ServerSetup(3000);

  const producer = new RabbitMqSetup();

  server
    .getApp()
    .post(
      "/pedidos",
      validationMiddleware(CreatePeditoDto),
      (req: Request, res: Response) => {
        producer.sendMessage(req.body);
        res.status(200).send({ response: "data sent to queue" });
      }
    );
})();
