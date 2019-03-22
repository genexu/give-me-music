import express from 'express';
import * as line from '@line/bot-sdk';
import linebotController from './controllers/linebotController';
import messageController from './controllers/messageController';
import linebotConfig from './configs/linebotConfig';

const app = express();
const apiRouter = express.Router();

apiRouter.post('/line-webhook', line.middleware(linebotConfig), linebotController.receiveWebhook);
apiRouter.get('/message', messageController.reciveMessage);

app.use('/api', apiRouter);

/* eslint-disable no-console */
app.listen(8080, console.log('start listenins 8080 port'));
/* eslint-enable no-console */
