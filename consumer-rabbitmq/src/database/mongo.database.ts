import { connect as mongooseConnect, connection } from "mongoose";
require("dotenv").config();

const MONGODB: string = process.env.MONGODB || "";

export const connect = async (): Promise<void> => {
  await mongooseConnect(MONGODB);
  console.log("Connected to MONGODB database");
};

export const close = (): Promise<void> => connection.close();
