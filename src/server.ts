import './util/module-alias';

import * as http from 'http';
import { Server } from '@overnightjs/core';
import bodyParser from 'body-parser';
import { ToolController } from './controllers/tool';
import { Application } from 'express';
import * as database from '@src/database';

export class SetupServer extends Server {
  private server?: http.Server;
  constructor(private port = 3000) {
    super();
  }

  public async init(): Promise<void> {
    this.setupExpress();
    this.setupControllers();
    await this.databaseSetup();
  }

  private setupExpress(): void {
    this.app.use(bodyParser.json());
  }

  private setupControllers(): void {
    const toolController = new ToolController();
    this.addControllers([toolController]);
  }

  private async databaseSetup(): Promise<void> {
    await database.connect();
  }

  public async close(): Promise<void> {
    await database.close();
  }

  public start(): void {
    this.server = this.app.listen(this.port, () => {
      console.info('Server listening on port: ' + this.port);
    });
  }

  public getApp(): Application {
    return this.app;
  }
}
