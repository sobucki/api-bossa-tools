import './util/module-alias';

import logger from './logger';
import expressPino from 'express-pino-logger';
import swaggerUi from 'swagger-ui-express';
import apiSchema from './api.schema.json';

import { middleware } from 'express-openapi-validator';
import { OpenAPIV3 } from 'express-openapi-validator/dist/framework/types';
import { apiErrorValidator } from '@src/midlewares/api-error-validator';
import * as http from 'http';
import { Server } from '@overnightjs/core';
import bodyParser from 'body-parser';
import { ToolController } from '@src/controllers/tool';
import { Application } from 'express';
import * as database from '@src/database';
import { UsersController } from '@src/controllers/users';

export class SetupServer extends Server {
  private server?: http.Server;
  constructor(private port = 3000) {
    super();
  }

  public async init(): Promise<void> {
    this.setupExpress();
    await this.setupDocs();
    this.setupControllers();
    await this.databaseSetup();
    this.setupErrorHandlers();
  }

  private setupExpress(): void {
    this.app.use(bodyParser.json());
    this.app.use(expressPino({ logger }));
  }

  private setupErrorHandlers(): void {
    this.app.use(apiErrorValidator);
  }

  private setupControllers(): void {
    const toolController = new ToolController();
    const userController = new UsersController();

    this.addControllers([toolController, userController]);
  }

  private async databaseSetup(): Promise<void> {
    await database.connect();
  }

  private async setupDocs(): Promise<void> {
    this.app.use('/docs', swaggerUi.serve, swaggerUi.setup(apiSchema));
    this.app.use(
      middleware({
        apiSpec: apiSchema as OpenAPIV3.Document,
        validateRequests: true,
        validateResponses: true,
      })
    );
  }

  public async close(): Promise<void> {
    await database.close();
  }

  public start(): void {
    this.server = this.app.listen(this.port, () => {
      logger.info('Server listening on port: ' + this.port);
    });
  }

  public getApp(): Application {
    return this.app;
  }
}
