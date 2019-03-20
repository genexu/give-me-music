import express from 'express';
import * as line from '@line/bot-sdk';
import linebotController from './controllers/linebotController';
import linebotConfig from './configs/linebotConfig';

const app = express();

app.post('/line-webhook', line.middleware(linebotConfig), linebotController.receiveWebhook);

/* eslint-disable no-console */
app.listen(8080, console.log('start listenins 8080 port'));
/* eslint-enable no-console */
