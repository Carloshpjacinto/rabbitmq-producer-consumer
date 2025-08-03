import PedidoRepository from "../repositories/pedido.repository";
import PedidoService from "../service/pedido.service";
import { SetupRabbitMq } from "../server/rabbitmq.setup";

export const rabbitmqFactory = () => {
  const repository = new PedidoRepository();
  const service = new PedidoService(repository);
  const rabbitmq = new SetupRabbitMq(service);
  rabbitmq.init();
};
