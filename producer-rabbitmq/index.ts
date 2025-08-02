import { RabbitMqSetup } from "./rabbitmq/rabbitmq.setup";
import { Request, Response } from "express";
import { ServerSetup } from "./server/server.setup";
require("dotenv").config();

(async (): Promise<void> => {
  const server = new ServerSetup(3000);

  const producer = new RabbitMqSetup();

  server.getApp().post("/pedidos", (req: Request, res: Response) => {
    producer.sendMessage(req.body);
    res.status(200).send({ response: "data sent to queue" });
  });
})();
