import PedidoRepository from "../repositories/pedido.repository";

export default class PedidoService {
  constructor(private readonly repo: PedidoRepository) {}
  public async findAll(): Promise<any> {
    const retorno = await this.repo.findAll();
    return retorno == null ? { message: "Pedidos não encontrado" } : retorno;
  }
  public async handleMessage(payload: any): Promise<any> {
    const { numero, cnpj } = payload;
    const found = await this.repo.findOne({ numero, cnpj });
    if (found) {
      return await this.update(found, payload);
    }
    await this.repo.create(payload);
  }
  public async update(found: any, payload: object): Promise<any> {
    return await this.repo.update(found.id, payload);
  }
}
