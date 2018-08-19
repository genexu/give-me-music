import * as line from '@line/bot-sdk';
import messageService from './messageService';
import linebotConfig from '../configs/linebotConfig';

const client = new line.Client(linebotConfig);

class linebotService {
  static async handleEvent(event) {
    if (event.type !== 'message' || event.message.type !== 'text') return Promise.resolve(null);
    const text = await messageService.handleMessage(event.message.text) 
    return linebotService.returnText(event, text);
  }
  static returnText(event, text) {
    return client.replyMessage(event.replyToken, {
      type: 'text',
      text: text
    });
  }
}

export default linebotService;
