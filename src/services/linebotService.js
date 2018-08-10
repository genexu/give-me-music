import * as line from '@line/bot-sdk';
import linebotConfig from '../configs/linebotConfig';

const client = new line.Client(linebotConfig);

class linebotService {
  static handleEvent(event) {
    if (event.type !== 'message' || event.message.type !== 'text') {
      return Promise.resolve(null);
    }
    return client.replyMessage(event.replyToken, {
      type: 'text',
      text: event.message.text
    });
  }
}

export default linebotService;
