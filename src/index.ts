import config from 'config';
import { SetupServer } from './server';
import logger from './logger';

(async (): Promise<void> => {
  try {
    const server = new SetupServer(config.get('App.port'));
    await server.init();
    server.start();
  } catch (error) {
    logger.log(`App exited with error ${error}`);
  }
})();
