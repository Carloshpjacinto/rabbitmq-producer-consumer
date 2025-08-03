import { Request, Response } from "express";
import PedidoRepository from "../repositories/pedido.repository";
import PedidoController from "../controller/pedido.controller";
import PedidoService from "../service/pedido.service";

export const pedidoFactory = (req: Request, res: Response): any => {
  const repository = new PedidoRepository();
  const service = new PedidoService(repository);
  const controller = new PedidoController(service);
  return controller.handleRequest(req, res);
};
