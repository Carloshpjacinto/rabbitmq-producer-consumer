import * as amqplib from "amqplib";

export class RabbitMqSetup {
  constructor() {
    this.init();
  }
  private connection: any;
  private channel: any;
  private QUEUE: string = "pedidos";

  public async init(): Promise<void> {
    await this.getConnection();
    await this.createChannel();
    await this.channel.assertQueue(this.QUEUE);
  }

  public sendMessage(payload: any): void {
    const message = JSON.stringify(payload);
    this.channel.sendToQueue(this.QUEUE, Buffer.from(message));
  }
  private async getConnection() {
    this.connection = await amqplib.connect(
      `amqp://${process.env.RABBITMQ_USER}:${process.env.RABBITMQ_PASS}@${process.env.RABBITMQ_HOST}:${process.env.RABBITMQ_PORT}`
    );
  }
  private async createChannel() {
    this.channel = await this.connection.createChannel();
  }
}
