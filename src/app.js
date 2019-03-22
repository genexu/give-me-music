import express from 'express';
import * as line from '@line/bot-sdk';
import linebotController from './controllers/linebotController';
import messageController from './controllers/messageController';
import tagController from './controllers/tagController';
import linebotConfig from './configs/linebotConfig';

const app = express();
const apiRouter = express.Router();

apiRouter.post('/line-webhook', line.middleware(linebotConfig), linebotController.receiveWebhook);
apiRouter.get('/message', messageController.reciveMessage);
apiRouter.get('/tags', tagController.getTagList);
apiRouter.get('/tags/:target/playlist', tagController.getTagPlayList);

app.use('/api', apiRouter);

/* eslint-disable no-console */
app.listen(8080, console.log('start listenins 8080 port'));
/* eslint-enable no-console */
