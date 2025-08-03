import express, { Application } from "express";
import dotenv from "dotenv";
import { connect, close } from "../database/mongo.database";
import { routes } from "../routes";
export default class SetupServer {
  constructor(private readonly port = 3000, private app = express()) {}

  init(): void {
    this.app.use(express.json());
    dotenv.config();
    this.listen();
    this.setRoutes();
    this.databaseSetup();
  }
  listen(): void {
    this.app.listen(this.port, () => {
      console.info(`API running on port -> ${this.port}`);
    });
  }
  setRoutes(): void {
    this.app.use(routes);
  }
  async databaseSetup(): Promise<void> {
    await connect();
  }
  async close(): Promise<void> {
    await close();
  }
  getApp(): Application {
    return this.app;
  }
}
