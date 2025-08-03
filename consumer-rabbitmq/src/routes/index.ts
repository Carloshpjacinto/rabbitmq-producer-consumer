import { Router } from "express";
import PedidoRoutes from "./pedidos.routes";

const routes = Router();

routes.use(new PedidoRoutes().router);

export { routes };
