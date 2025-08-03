import mongoose, { Document, Model } from "mongoose";

const PedidoSchema = new mongoose.Schema({
  numero: {
    type: String,
    required: true,
  },
  itens: [
    {
      nome: { type: String, max: 55 },
      qtd: { type: Number, max: 100 },
    },
  ],
  cnpj: {
    type: String,
    required: true,
  },
  status: {
    type: Boolean,
    default: true,
  },
});

export const Pedido = mongoose.model("Pedido", PedidoSchema);
