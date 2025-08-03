import { rabbitmqFactory } from "./factories/rabbitmq.factory";
import SetupServer from "./server/server.setup";

(async (): Promise<void> => {
  const PORT = process.env.PORT || "3333";
  new SetupServer(parseInt(PORT)).init();
  rabbitmqFactory();
})();
