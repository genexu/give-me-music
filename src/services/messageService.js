import youtubeService from './youtubeService';
import tagService from './tagService';
import { helpMessage } from '../constants/message';

class messageService {
  constructor({ youtubeSvc }) {
    this.youtubeSvc = youtubeSvc;
  }
  async handleMessage(text) {
    let splittedMessage = text.split(/\s+/);
    if (splittedMessage[0] !== 'GiveMeMusic') return null;
    
    let returnText = null; 

    if (splittedMessage.length === 1) return this.getRandVideoUrl();

    let command = splittedMessage[1];
    switch(command) {
      case '-h':
      case '--help':
        returnText = helpMessage;
        break;
      case '-l':
      case '--list':
        returnText = tagService.getTagListText();
        break;
      default:
        returnText = await this.getTaggedVideoUrl(command);
        break;
    }

    if (!returnText) return 'Command Not Supported';
    return returnText;
  } 
  getRandVideoUrl() {
    const playlistId = tagService.getRandPlaylistId();
    return this.getVideoUrlByPlaylistId(playlistId);
  }
  getTaggedVideoUrl(command) {
    const playlistId = tagService.getPlaylistIdByCommand(command);
    if (!playlistId) return null;
    return this.getVideoUrlByPlaylistId(playlistId);
  }
  async getVideoUrlByPlaylistId(playlistId) {
    const playlistItems = await this.youtubeSvc.getPlaylistItems(playlistId);
    const videoItem = youtubeService.getRandVideoItemFromPlaylistItems(playlistItems);
    return messageService.genVideoUrlByVideoId(videoItem.contentDetails.videoId);
  }
  static genVideoUrlByVideoId(videoId) {
    return `https://www.youtube.com/watch?v=${videoId}`;
  }
}

export default messageService;
