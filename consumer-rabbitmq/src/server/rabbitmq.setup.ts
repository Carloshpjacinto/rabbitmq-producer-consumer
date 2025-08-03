import PedidoService from "../service/pedido.service";
import client, { Connection, Channel } from "amqplib";

export class SetupRabbitMq {
  constructor(private readonly service: PedidoService) {}

  private connection: any;
  private channel: Channel | undefined;
  private QUEUE: string = "pedidos";

  public async init(): Promise<void> {
    await this.getConnection();
    await this.createChannel();
    await this.channel?.assertQueue(this.QUEUE, {
      durable: true,
      arguments: {
        "x-queue-type": "quorum",
      },
    });
    this.setConsumer();
  }
  public sendMessage(payload: any): void {
    const message = JSON.stringify(payload);
    this.channel?.sendToQueue(this.QUEUE, Buffer.from(Buffer.from(message)));
  }
  private async getConnection() {
    this.connection = await client.connect(
      `amqp://${process.env.RABBITMQ_USER}:${process.env.RABBITMQ_PASS}@${process.env.RABBITMQ_HOST}:${process.env.RABBITMQ_PORT}`
    );
  }
  private async createChannel() {
    this.channel = await this.connection?.createChannel();
  }
  private setConsumer() {
    try {
      this.channel?.consume(
        this.QUEUE,
        (message) => {
          if (message) {
            const content = message.content.toString();
            console.log(`[x] Mensagem recebida: ${content}`);
            this.channel?.ack(message);
            this.service.handleMessage(JSON.parse(content.toString()));
          }
        },
        { noAck: false }
      );
    } catch (error) {
      console.error("Erro no consumidor:", error);
    }
  }
}
