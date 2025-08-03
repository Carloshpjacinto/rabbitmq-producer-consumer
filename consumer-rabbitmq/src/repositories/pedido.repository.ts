import { Pedido } from "../models/pedido.model";

export default class PedidoRepository {
  public async findAll() {
    return await Pedido.find();
  }
  public async findOne(value: any) {
    return await Pedido.findOne(value);
  }
  public async create(payload: object) {
    return await Pedido.create(payload);
  }

  public async update(id: string, payload: object) {
    return await Pedido.findByIdAndUpdate({ _id: id }, payload, { new: true });
  }
}
