import express from 'express';
import * as line from '@line/bot-sdk';
import linebotController from './controllers/linebotController';
import linebotConfig from './configs/linebotConfig';

const app = express();

app.post('/line-webhook', line.middleware(linebotConfig), linebotController.receiveWebhook);

app.listen(8080, console.log('start listenins 8080 port'));
