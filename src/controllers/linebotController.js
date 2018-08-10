import linebotService from '../services/linebotService';

class linebotController {
  static receiveWebhook(req, res) {
    Promise
      .all(req.body.events.map(linebotService.handleEvent))
      .then((result) => res.json(result));
  }
}

export default linebotController;
