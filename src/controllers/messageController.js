import youtubeService from '../services/youtubeService';
import messageService from '../services/messageService';

class messageController {
  static async reciveMessage(req, res) {
    const youtubeSvc = new youtubeService({});
    const messageSvc = new messageService({ youtubeSvc });
    const message = await messageSvc.handleMessage(req.query.text);
    res.send(message);
  }
}

export default messageController;
