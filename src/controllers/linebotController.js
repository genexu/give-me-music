import * as line from '@line/bot-sdk';
import youtubeService from '../services/youtubeService';
import messageService from '../services/messageService';
import linebotService from '../services/linebotService';
import linebotConfig from '../configs/linebotConfig';

class linebotController {
  static receiveWebhook(req, res) {
    const client = new line.Client(linebotConfig);
    const youtubeSvc = new youtubeService({});
    const messageSvc = new messageService({ youtubeSvc });
    const linebotSvc = new linebotService({ client, messageSvc });
    Promise
      .all(req.body.events.map(linebotSvc.handleEvent))
      .then((result) => res.json(result));
  }
}

export default linebotController;
